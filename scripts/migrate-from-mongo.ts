/**
 * Migration script: Move historical quiz results from MongoDB (wow-backend) to Railway PostgreSQL.
 *
 * What it migrates:
 * - Users (email, firstName) — deduped by email
 * - Quiz sessions (completed, with original timestamp)
 * - Quiz results (spoke scores normalized to 1-10)
 *
 * What it CANNOT migrate:
 * - Individual question answers (old system only stored final scores)
 *
 * Usage:
 *   npx tsx scripts/migrate-from-mongo.ts
 */

import { MongoClient } from "mongodb";
import { PrismaClient } from "@prisma/client";

const MONGO_URI =
  "mongodb+srv://john:password11@cluster0.lwavp.mongodb.net/wow";

const prisma = new PrismaClient();

// Map old category names to new spoke names
const CATEGORY_MAP: Record<string, string> = {
  // Try common variations — will log any unmapped categories
  health: "physical",
  physical: "physical",
  "physical health": "physical",
  intellectual: "intellectual",
  mental: "intellectual",
  emotional: "emotional",
  relationships: "relational",
  relational: "relational",
  relationship: "relational",
  financial: "financial",
  "financial/career": "financial",
  career: "financial",
  spiritual: "spiritual",
  environmental: "environmental",
  recreation: "recreation",
  "recreation/leisure": "recreation",
  leisure: "recreation",
};

function mapCategory(raw: string): string | null {
  const normalized = raw.toLowerCase().trim();
  return CATEGORY_MAP[normalized] || null;
}

interface MongoTest {
  _id: unknown;
  name?: string;
  email?: string;
  subscribed?: boolean;
  referer?: string;
  results?: Array<{ category: string; score: number }>;
  createdAt?: Date;
}

async function main() {
  console.log("Connecting to MongoDB...");
  const mongo = new MongoClient(MONGO_URI);
  await mongo.connect();
  const db = mongo.db("wow");
  const testsCollection = db.collection<MongoTest>("tests");

  // Count total
  const total = await testsCollection.countDocuments();
  console.log(`Found ${total} test submissions in MongoDB.`);

  // First pass: discover all category names
  const allCategories = new Set<string>();
  const cursor = testsCollection.find({});
  const allTests: MongoTest[] = [];

  for await (const doc of cursor) {
    allTests.push(doc);
    if (doc.results) {
      for (const r of doc.results) {
        allCategories.add(r.category);
      }
    }
  }

  console.log("\nCategories found in MongoDB:");
  for (const cat of allCategories) {
    const mapped = mapCategory(cat);
    console.log(`  "${cat}" → ${mapped || "UNMAPPED"}`);
  }

  const unmapped = [...allCategories].filter((c) => !mapCategory(c));
  if (unmapped.length > 0) {
    console.log(
      `\nWARNING: ${unmapped.length} unmapped categories. Update CATEGORY_MAP and re-run.`
    );
    console.log("Unmapped:", unmapped);
    // Continue anyway — unmapped categories will be skipped
  }

  // Migrate
  let migrated = 0;
  let skipped = 0;
  const emailsSeen = new Map<string, string>(); // email → userId

  for (const doc of allTests) {
    const email = doc.email?.trim().toLowerCase();
    if (!email || !doc.results || doc.results.length === 0) {
      skipped++;
      continue;
    }

    try {
      // Create or find user
      let userId = emailsSeen.get(email);
      if (!userId) {
        const user = await prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            firstName: doc.name || null,
          },
        });
        userId = user.id;
        emailsSeen.set(email, userId);
      }

      // Build spoke scores
      const spokeScores: Record<string, number> = {};
      for (const r of doc.results) {
        const spoke = mapCategory(r.category);
        if (spoke) {
          // Old scores might be on different scales — normalize if needed
          // Assuming old scores are already 1-10 range
          spokeScores[spoke] = Math.round(
            Math.min(10, Math.max(1, r.score))
          );
        }
      }

      if (Object.keys(spokeScores).length === 0) {
        skipped++;
        continue;
      }

      // Create quiz session
      const session = await prisma.quizSession.create({
        data: {
          userId,
          status: "completed",
          createdAt: doc.createdAt || new Date(),
          completedAt: doc.createdAt || new Date(),
        },
      });

      // Create quiz result
      await prisma.quizResult.create({
        data: {
          sessionId: session.id,
          spokeScores,
          overallScore: 0,
        },
      });

      migrated++;
      if (migrated % 100 === 0) {
        console.log(`  Migrated ${migrated}/${total}...`);
      }
    } catch (err) {
      console.error(`Error migrating doc for ${email}:`, err);
      skipped++;
    }
  }

  console.log(`\nMigration complete!`);
  console.log(`  Migrated: ${migrated}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Unique users: ${emailsSeen.size}`);

  await mongo.close();
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});

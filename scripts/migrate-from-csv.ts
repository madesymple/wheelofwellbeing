/**
 * Migration script: Import historical quiz results from CSV into Railway PostgreSQL.
 * Uses batch inserts via raw SQL for speed (~49K records).
 *
 * Usage:
 *   npx tsx scripts/migrate-from-csv.ts [path-to-csv]
 */

import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const CSV_PATH =
  process.argv[2] || "/Users/kevansadigh/Desktop/Subscribed_Wheel 2.0.csv";

const SPOKE_COLUMNS: Record<string, string> = {
  Physical: "physical",
  Mental: "mental",
  Emotional: "emotional",
  Relational: "relational",
  Recreational: "recreational",
  Environmental: "environmental",
  Spiritual: "spiritual",
  Financial: "financial",
};

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

async function main() {
  console.log(`Reading CSV from: ${CSV_PATH}`);
  const raw = readFileSync(CSV_PATH, "utf-8");
  const lines = raw.split("\n").filter((l) => l.trim());
  const headers = parseCSVLine(lines[0]);

  console.log(`Total rows: ${lines.length - 1}`);

  // Parse all rows first
  interface Row {
    email: string;
    firstName: string | null;
    spokeScores: Record<string, number>;
    createdAt: Date;
  }

  const rows: Row[] = [];
  let skipped = 0;

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    const row: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = fields[j] || "";
    }

    const email = row["Email Address"]?.toLowerCase().trim();
    if (!email) {
      skipped++;
      continue;
    }

    const spokeScores: Record<string, number> = {};
    let hasScores = false;
    for (const [csvCol, spokeKey] of Object.entries(SPOKE_COLUMNS)) {
      const val = parseInt(row[csvCol], 10);
      if (!isNaN(val) && val >= 1 && val <= 10) {
        spokeScores[spokeKey] = val;
        hasScores = true;
      }
    }

    if (!hasScores) {
      skipped++;
      continue;
    }

    const confirmTime = row["CONFIRM_TIME"]?.trim();
    rows.push({
      email,
      firstName: row["First Name"]?.trim() || null,
      spokeScores,
      createdAt: confirmTime ? new Date(confirmTime) : new Date(),
    });
  }

  console.log(`Parsed ${rows.length} valid rows, skipped ${skipped}`);

  // Dedupe users by email
  const uniqueEmails = new Map<
    string,
    { email: string; firstName: string | null }
  >();
  for (const r of rows) {
    if (!uniqueEmails.has(r.email)) {
      uniqueEmails.set(r.email, { email: r.email, firstName: r.firstName });
    }
  }

  console.log(`Unique users: ${uniqueEmails.size}`);

  // Batch insert users (chunks of 500)
  console.log("Inserting users...");
  const usersList = [...uniqueEmails.values()];
  const CHUNK = 500;

  for (let i = 0; i < usersList.length; i += CHUNK) {
    const chunk = usersList.slice(i, i + CHUNK);
    const values = chunk
      .map(
        (u) =>
          `('${randomUUID()}', '${u.email.replace(/'/g, "''")}', ${u.firstName ? `'${u.firstName.replace(/'/g, "''")}'` : "NULL"}, false, NOW(), NOW())`
      )
      .join(",\n");

    await prisma.$executeRawUnsafe(`
      INSERT INTO users (id, email, "firstName", "marketingOptIn", "createdAt", "updatedAt")
      VALUES ${values}
      ON CONFLICT (email) DO NOTHING
    `);

    if ((i / CHUNK) % 10 === 0) {
      console.log(`  Users: ${Math.min(i + CHUNK, usersList.length)}/${usersList.length}`);
    }
  }

  // Fetch all user IDs by email
  console.log("Fetching user IDs...");
  const allUsers = await prisma.user.findMany({
    select: { id: true, email: true },
  });
  const emailToId = new Map(allUsers.map((u) => [u.email, u.id]));

  // Batch insert sessions and results
  console.log("Inserting sessions and results...");
  let inserted = 0;

  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);

    // Prepare session data
    const sessionData = chunk.map((r) => {
      const userId = emailToId.get(r.email);
      const sessionId = randomUUID();
      return { sessionId, userId: userId!, row: r };
    });

    // Insert sessions
    const sessionValues = sessionData
      .filter((s) => s.userId)
      .map(
        (s) =>
          `('${s.sessionId}', '${s.userId}', 'completed', '${s.row.createdAt.toISOString()}', '${s.row.createdAt.toISOString()}')`
      )
      .join(",\n");

    if (sessionValues) {
      await prisma.$executeRawUnsafe(`
        INSERT INTO quiz_sessions (id, "userId", status, "createdAt", "completedAt")
        VALUES ${sessionValues}
      `);
    }

    // Insert results
    const resultValues = sessionData
      .filter((s) => s.userId)
      .map(
        (s) =>
          `('${randomUUID()}', '${s.sessionId}', '${JSON.stringify(s.row.spokeScores).replace(/'/g, "''")}', 0, NOW())`
      )
      .join(",\n");

    if (resultValues) {
      await prisma.$executeRawUnsafe(`
        INSERT INTO quiz_results (id, "sessionId", "spokeScores", "overallScore", "createdAt")
        VALUES ${resultValues}
      `);
    }

    inserted += chunk.length;
    if (inserted % 5000 === 0 || inserted === rows.length) {
      console.log(`  Progress: ${inserted}/${rows.length}`);
    }
  }

  console.log(`\nMigration complete!`);
  console.log(`  Users created: ${uniqueEmails.size}`);
  console.log(`  Sessions/results created: ${inserted}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});

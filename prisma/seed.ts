import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const questions = [
  // --- Health / Physical ---
  {
    spoke: "physical",
    questionIndex: 0,
    text: "Exercise and attending to physical fitness are big parts of my everyday life.",
    variantGroup: "physical_q0",
  },
  {
    spoke: "physical",
    questionIndex: 1,
    text: "I am careful with what I eat, and keeping a healthy lifestyle is important to me.",
    variantGroup: "physical_q1",
  },
  {
    spoke: "physical",
    questionIndex: 2,
    text: "I sleep well at nights and wake up feeling refreshed and energized.",
    variantGroup: "physical_q2",
  },
  {
    spoke: "physical",
    questionIndex: 3,
    text: "I have an active, healthy and responsible sex life.",
    variantGroup: "physical_q3",
  },

  // --- Intellectual / Mental ---
  {
    spoke: "mental",
    questionIndex: 0,
    text: "I plan ahead and create a blueprint for achieving success in every task.",
    variantGroup: "mental_q0",
  },
  {
    spoke: "mental",
    questionIndex: 1,
    text: "I am able to focus and make decisions with clarity.",
    variantGroup: "mental_q1",
  },
  {
    spoke: "mental",
    questionIndex: 2,
    text: "I have a clear vision of my goals, and I know what my next step is.",
    variantGroup: "mental_q2",
  },
  {
    spoke: "mental",
    questionIndex: 3,
    text: "I like to keep my mind sharp and engaged by educating myself and learning new things.",
    variantGroup: "mental_q3",
  },

  // --- Emotional ---
  {
    spoke: "emotional",
    questionIndex: 0,
    text: "If I don't get the results that I intended, I don't see them as a failure. I learn from them, readjust my strategy and take action.",
    variantGroup: "emotional_q0",
  },
  {
    spoke: "emotional",
    questionIndex: 1,
    text: "My past doesn't define me. I don't let limiting beliefs and self-sabotaging thoughts stop me from reaching my goals.",
    variantGroup: "emotional_q1",
  },
  {
    spoke: "emotional",
    questionIndex: 2,
    text: "I take charge of life and know how to deal with stresses; I respond to situations calmly and assertively.",
    variantGroup: "emotional_q2",
  },
  {
    spoke: "emotional",
    questionIndex: 3,
    text: "I am aware of my emotions and can identify my feelings easily.",
    variantGroup: "emotional_q3",
  },

  // --- Relationships / Relational ---
  {
    spoke: "relational",
    questionIndex: 0,
    text: "I enjoy spending quality time with my family and friends.",
    variantGroup: "relational_q0",
  },
  {
    spoke: "relational",
    questionIndex: 1,
    text: "I have a fulfilled and intimate relationship that supports my emotional and physical wellbeing.",
    variantGroup: "relational_q1",
  },
  {
    spoke: "relational",
    questionIndex: 2,
    text: "I know how to set healthy boundaries and can express my feelings comfortably and clearly.",
    variantGroup: "relational_q2",
  },
  {
    spoke: "relational",
    questionIndex: 3,
    text: "I surround myself with people that energize me and are supportive of my goals and accomplishments.",
    variantGroup: "relational_q3",
  },

  // --- Financial / Career ---
  {
    spoke: "financial",
    questionIndex: 0,
    text: "I consistently enjoy what I do and do what I enjoy.",
    variantGroup: "financial_q0",
  },
  {
    spoke: "financial",
    questionIndex: 1,
    text: "I am satisfied with my financial accomplishments and their future prospects.",
    variantGroup: "financial_q1",
  },
  {
    spoke: "financial",
    questionIndex: 2,
    text: "I manage my finances well and have a disciplined approach to my spending and savings.",
    variantGroup: "financial_q2",
  },
  {
    spoke: "financial",
    questionIndex: 3,
    text: "I value everything that I do, and I am great at managing my time efficiently.",
    variantGroup: "financial_q3",
  },

  // --- Spiritual ---
  {
    spoke: "spiritual",
    questionIndex: 0,
    text: "My spiritual beliefs make me feel compassionate towards mankind. I feel one with everyone and everything.",
    variantGroup: "spiritual_q0",
  },
  {
    spoke: "spiritual",
    questionIndex: 1,
    text: "Gratitude is at the core of my beliefs and I feel truly happy regardless of the circumstances of my life.",
    variantGroup: "spiritual_q1",
  },
  {
    spoke: "spiritual",
    questionIndex: 2,
    text: "I practice mindful meditation and keep myself aligned with all the blessings that life offers.",
    variantGroup: "spiritual_q2",
  },
  {
    spoke: "spiritual",
    questionIndex: 3,
    text: "I am often in search of my true self and my life's purpose to lead a meaningful and fulfilling life.",
    variantGroup: "spiritual_q3",
  },

  // --- Environmental ---
  {
    spoke: "environmental",
    questionIndex: 0,
    text: "I believe reusing resources, conserving energy, and reducing environmental pollutants are my personal responsibilities.",
    variantGroup: "environmental_q0",
  },
  {
    spoke: "environmental",
    questionIndex: 1,
    text: "I enjoy living in an organized and orderly home. It allows me to be more productive.",
    variantGroup: "environmental_q1",
  },
  {
    spoke: "environmental",
    questionIndex: 2,
    text: "I live and support an eco-friendly lifestyle.",
    variantGroup: "environmental_q2",
  },
  {
    spoke: "environmental",
    questionIndex: 3,
    text: "I create safety and comfort in my living and work environment.",
    variantGroup: "environmental_q3",
  },

  // --- Recreation / Leisure ---
  {
    spoke: "recreational",
    questionIndex: 0,
    text: "I regularly spend time in nature and enjoy outdoor activities alone or in groups.",
    variantGroup: "recreational_q0",
  },
  {
    spoke: "recreational",
    questionIndex: 1,
    text: "I frequently take part in recreation, leisure, and sports activities.",
    variantGroup: "recreational_q1",
  },
  {
    spoke: "recreational",
    questionIndex: 2,
    text: "Having hobbies and learning new subjects of interest plays an important role in my life.",
    variantGroup: "recreational_q2",
  },
  {
    spoke: "recreational",
    questionIndex: 3,
    text: "I routinely attend arts and cultural activities.",
    variantGroup: "recreational_q3",
  },
];

async function main() {
  console.log("Seeding quiz questions...");

  const existing = await prisma.quizQuestion.count();
  if (existing === 0) {
    await prisma.quizQuestion.createMany({
      data: questions.map((q) => ({
        spoke: q.spoke,
        questionIndex: q.questionIndex,
        text: q.text,
        variantGroup: q.variantGroup,
        weight: 1.0,
        active: true,
      })),
    });
    console.log(`Seeded ${questions.length} questions.`);
  } else {
    console.log(
      `Database already has ${existing} questions. Skipping seed. To re-seed, clear the quiz_questions table first.`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

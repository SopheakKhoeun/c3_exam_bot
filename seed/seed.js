require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const {
  backendQuestions,
  frontendQuestions,
  sqlQuestions,
  mongodbQuestions,
  prismaQuestions,
  reactQuestions,
  expressQuestions,
  tailwindQuestions,
} = require('./data/c3Questions');

const prisma = new PrismaClient();

const CATEGORIES = [
  'Backend',
  'Frontend',
  'Prisma',
  'SQL',
  'MongoDB',
  'React',
  'Express',
  'Tailwind',
];

const QUESTIONS_BY_CATEGORY = {
  Backend: backendQuestions,
  Frontend: frontendQuestions,
  SQL: sqlQuestions,
  MongoDB: mongodbQuestions,
  Prisma: prismaQuestions,
  React: reactQuestions,
  Express: expressQuestions,
  Tailwind: tailwindQuestions,
};

async function seed() {
  console.log('Seeding C3 WMAD exam questions...');

  // Replace previous practice set with C3 source questions
  await prisma.progress.deleteMany();
  await prisma.question.deleteMany();

  for (const name of CATEGORIES) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  let created = 0;

  for (const [categoryName, questions] of Object.entries(QUESTIONS_BY_CATEGORY)) {
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      throw new Error(`Category missing: ${categoryName}`);
    }

    for (const question of questions) {
      await prisma.question.create({
        data: {
          categoryId: category.id,
          title: question.title,
          answer: question.answer,
          explanation: question.explanation,
          difficulty: question.difficulty || 'medium',
        },
      });
      created += 1;
    }

    console.log(`✓ ${categoryName}: ${questions.length} questions`);
  }

  const total = await prisma.question.count();
  console.log(`Seed complete. Created ${created} C3 questions. Total in DB: ${total}`);
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

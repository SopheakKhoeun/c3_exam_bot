const { prisma } = require('../prisma');

class QuestionRepository {
  async create({ categoryId, title, answer, explanation, difficulty = 'medium' }) {
    return prisma.question.create({
      data: {
        categoryId,
        title,
        answer,
        explanation,
        difficulty,
      },
      include: { category: true },
    });
  }

  async findById(id) {
    return prisma.question.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async findRandom(categoryName = null) {
    const where = categoryName
      ? { category: { name: categoryName } }
      : {};

    const count = await prisma.question.count({ where });
    if (count === 0) {
      return null;
    }

    const skip = Math.floor(Math.random() * count);
    const questions = await prisma.question.findMany({
      where,
      include: { category: true },
      skip,
      take: 1,
    });

    return questions[0] || null;
  }

  async countByCategory(categoryName) {
    return prisma.question.count({
      where: { category: { name: categoryName } },
    });
  }
}

module.exports = { QuestionRepository };

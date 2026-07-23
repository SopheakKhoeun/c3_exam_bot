const { prisma } = require('../prisma');

class ProgressRepository {
  async create({ userId, questionId, correct }) {
    return prisma.progress.create({
      data: {
        userId,
        questionId,
        correct,
      },
    });
  }

  async getStatsByUserId(userId) {
    const [answered, correct] = await Promise.all([
      prisma.progress.count({ where: { userId } }),
      prisma.progress.count({ where: { userId, correct: true } }),
    ]);

    const wrong = answered - correct;
    const accuracy = answered === 0 ? 0 : Math.round((correct / answered) * 100);

    return {
      answered,
      correct,
      wrong,
      accuracy,
    };
  }
}

module.exports = { ProgressRepository };

const { progressRepository } = require('../database');

class ProgressService {
  async record({ userId, questionId, correct }) {
    return progressRepository.create({
      userId,
      questionId,
      correct: Boolean(correct),
    });
  }

  async getStats(userId) {
    return progressRepository.getStatsByUserId(userId);
  }
}

module.exports = { ProgressService };

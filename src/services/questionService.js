const { questionRepository, categoryRepository } = require('../database');

class QuestionService {
  async getRandom(categoryName = null) {
    return questionRepository.findRandom(categoryName);
  }

  async getById(id) {
    return questionRepository.findById(id);
  }

  async createQuestion({ categoryId, title, answer, explanation, difficulty }) {
    const category = await categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    return questionRepository.create({
      categoryId,
      title: title.trim(),
      answer: answer.trim(),
      explanation: explanation.trim(),
      difficulty: difficulty || 'medium',
    });
  }
}

module.exports = { QuestionService };

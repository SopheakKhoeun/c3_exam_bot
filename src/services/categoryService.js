const { categoryRepository } = require('../database');

class CategoryService {
  async list() {
    return categoryRepository.findAll();
  }

  async getById(id) {
    return categoryRepository.findById(id);
  }

  async getByName(name) {
    return categoryRepository.findByName(name);
  }

  async ensureDefaults(names) {
    const results = [];
    for (const name of names) {
      results.push(await categoryRepository.upsertByName(name));
    }
    return results;
  }
}

module.exports = { CategoryService };

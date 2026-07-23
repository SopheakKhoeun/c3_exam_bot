const { userRepository } = require('../database');

class UserService {
  async ensureUser(from) {
    return userRepository.upsertFromTelegram(from);
  }

  async getByTelegramId(telegramId) {
    return userRepository.findByTelegramId(telegramId);
  }

  async listAll() {
    return userRepository.findAll();
  }
}

module.exports = { UserService };

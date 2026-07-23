const { prisma } = require('../prisma');

class UserRepository {
  async findByTelegramId(telegramId) {
    return prisma.user.findUnique({
      where: { telegramId: String(telegramId) },
    });
  }

  async create({ telegramId, firstName, username }) {
    return prisma.user.create({
      data: {
        telegramId: String(telegramId),
        firstName: firstName || null,
        username: username || null,
      },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async upsertFromTelegram(from) {
    return prisma.user.upsert({
      where: { telegramId: String(from.id) },
      update: {
        firstName: from.first_name || null,
        username: from.username || null,
      },
      create: {
        telegramId: String(from.id),
        firstName: from.first_name || null,
        username: from.username || null,
      },
    });
  }
}

module.exports = { UserRepository };

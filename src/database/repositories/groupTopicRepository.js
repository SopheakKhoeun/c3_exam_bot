const { prisma } = require('../prisma');

class GroupTopicRepository {
  async upsert({ chatId, name, threadId }) {
    return prisma.groupTopic.upsert({
      where: {
        chatId_name: {
          chatId: String(chatId),
          name,
        },
      },
      update: { threadId: Number(threadId) },
      create: {
        chatId: String(chatId),
        name,
        threadId: Number(threadId),
      },
    });
  }

  async findByName(chatId, name) {
    return prisma.groupTopic.findUnique({
      where: {
        chatId_name: {
          chatId: String(chatId),
          name,
        },
      },
    });
  }

  async findAll(chatId = null) {
    return prisma.groupTopic.findMany({
      where: chatId ? { chatId: String(chatId) } : undefined,
      orderBy: { name: 'asc' },
    });
  }

  async findHourly() {
    return prisma.groupTopic.findFirst({
      where: { name: 'Hourly' },
      orderBy: { id: 'desc' },
    });
  }
}

module.exports = { GroupTopicRepository };

const { groupTopicRepository } = require('../database');
const { CategoryService } = require('./categoryService');

const categoryService = new CategoryService();
const HOURLY_TOPIC_NAME = 'Hourly';

const TOPIC_ICON_COLORS = [
  0x6fb9f0,
  0xffd67e,
  0xcb86db,
  0x8eee98,
  0xff93b2,
  0xfb6f5f,
];

class GroupTopicService {
  async list(chatId = null) {
    return groupTopicRepository.findAll(chatId);
  }

  async getHourlyTarget() {
    return groupTopicRepository.findHourly();
  }

  async getByName(chatId, name) {
    return groupTopicRepository.findByName(chatId, name);
  }

  async bind({ chatId, name, threadId }) {
    return groupTopicRepository.upsert({ chatId, name, threadId });
  }

  async createDefaultTopics(telegram, chatId) {
    const categories = await categoryService.list();
    const names = [HOURLY_TOPIC_NAME, ...categories.map((c) => c.name)];
    const created = [];
    const skipped = [];

    for (let i = 0; i < names.length; i += 1) {
      const name = names[i];
      const existing = await groupTopicRepository.findByName(chatId, name);
      if (existing) {
        skipped.push(name);
        continue;
      }

      try {
        const topic = await telegram.createForumTopic(chatId, name, {
          icon_color: TOPIC_ICON_COLORS[i % TOPIC_ICON_COLORS.length],
        });

        await groupTopicRepository.upsert({
          chatId,
          name,
          threadId: topic.message_thread_id,
        });
        created.push({ name, threadId: topic.message_thread_id });
      } catch (error) {
        skipped.push(`${name} (${error.description || error.message})`);
      }
    }

    return { created, skipped };
  }
}

module.exports = { GroupTopicService, HOURLY_TOPIC_NAME };

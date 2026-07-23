const { prisma } = require('../prisma');

class CategoryRepository {
  async findAll() {
    return prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  async findByName(name) {
    return prisma.category.findUnique({
      where: { name },
    });
  }

  async findById(id) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async create(name) {
    return prisma.category.create({
      data: { name },
    });
  }

  async upsertByName(name) {
    return prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

module.exports = { CategoryRepository };

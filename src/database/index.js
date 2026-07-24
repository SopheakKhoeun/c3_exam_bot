const { UserRepository } = require('./repositories/userRepository');
const { CategoryRepository } = require('./repositories/categoryRepository');
const { QuestionRepository } = require('./repositories/questionRepository');
const { ProgressRepository } = require('./repositories/progressRepository');
const { GroupTopicRepository } = require('./repositories/groupTopicRepository');

const userRepository = new UserRepository();
const categoryRepository = new CategoryRepository();
const questionRepository = new QuestionRepository();
const progressRepository = new ProgressRepository();
const groupTopicRepository = new GroupTopicRepository();

module.exports = {
  userRepository,
  categoryRepository,
  questionRepository,
  progressRepository,
  groupTopicRepository,
};

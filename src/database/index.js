const { UserRepository } = require('./repositories/userRepository');
const { CategoryRepository } = require('./repositories/categoryRepository');
const { QuestionRepository } = require('./repositories/questionRepository');
const { ProgressRepository } = require('./repositories/progressRepository');

const userRepository = new UserRepository();
const categoryRepository = new CategoryRepository();
const questionRepository = new QuestionRepository();
const progressRepository = new ProgressRepository();

module.exports = {
  userRepository,
  categoryRepository,
  questionRepository,
  progressRepository,
};

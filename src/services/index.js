const { UserService } = require('./userService');
const { CategoryService } = require('./categoryService');
const { QuestionService } = require('./questionService');
const { ProgressService } = require('./progressService');

const userService = new UserService();
const categoryService = new CategoryService();
const questionService = new QuestionService();
const progressService = new ProgressService();

module.exports = {
  userService,
  categoryService,
  questionService,
  progressService,
};

const { isAdmin } = require('../utils/admin');
const { categoryService, questionService } = require('../services');
const {
  setAddFlow,
  getAddFlow,
  clearAddFlow,
} = require('../utils/session');
const {
  categorySelectKeyboard,
  cancelKeyboard,
} = require('../utils/keyboards');

async function addCommand(ctx) {
  try {
    if (!isAdmin(ctx.from.id)) {
      await ctx.reply('⛔ This command is restricted to admins.');
      return;
    }

    const categories = await categoryService.list();
    if (categories.length === 0) {
      await ctx.reply('No categories found. Seed the database first.');
      return;
    }

    setAddFlow(ctx.from.id, { step: 'category' });
    await ctx.reply('Select a category for the new question:', {
      ...categorySelectKeyboard(categories),
    });
  } catch (error) {
    console.error('addCommand error:', error);
    await ctx.reply('Failed to start /add flow. Please try again.');
  }
}

async function handleAddCategorySelect(ctx) {
  try {
    if (!isAdmin(ctx.from.id)) {
      await ctx.answerCbQuery('Admin only');
      return;
    }

    const categoryId = Number(ctx.match[1]);
    const category = await categoryService.getById(categoryId);
    if (!category) {
      await ctx.answerCbQuery('Category not found');
      return;
    }

    setAddFlow(ctx.from.id, {
      step: 'title',
      categoryId: category.id,
      categoryName: category.name,
    });

    await ctx.answerCbQuery();
    await ctx.editMessageText(
      `Category: <b>${category.name}</b>\n\nSend the <b>Question</b> text:`,
      { parse_mode: 'HTML', ...cancelKeyboard() }
    );
  } catch (error) {
    console.error('handleAddCategorySelect error:', error);
    await ctx.reply('Failed to select category.');
  }
}

async function handleAddCancel(ctx) {
  clearAddFlow(ctx.from.id);
  await ctx.answerCbQuery('Cancelled');
  await ctx.editMessageText('Add question cancelled.');
}

async function handleAddText(ctx, next) {
  try {
    if (!isAdmin(ctx.from.id)) {
      return next();
    }

    const flow = getAddFlow(ctx.from.id);
    if (!flow || !flow.step) {
      return next();
    }

    const text = (ctx.message.text || '').trim();
    if (!text) {
      await ctx.reply('Please send non-empty text.');
      return;
    }

    if (flow.step === 'title') {
      setAddFlow(ctx.from.id, { step: 'answer', title: text });
      await ctx.reply('Send the <b>Answer</b>:', {
        parse_mode: 'HTML',
        ...cancelKeyboard(),
      });
      return;
    }

    if (flow.step === 'answer') {
      setAddFlow(ctx.from.id, { step: 'explanation', answer: text });
      await ctx.reply('Send the <b>Explanation</b>:', {
        parse_mode: 'HTML',
        ...cancelKeyboard(),
      });
      return;
    }

    if (flow.step === 'explanation') {
      const question = await questionService.createQuestion({
        categoryId: flow.categoryId,
        title: flow.title,
        answer: flow.answer,
        explanation: text,
      });

      clearAddFlow(ctx.from.id);

      await ctx.reply(
        `✅ Question saved!\n\n` +
          `Category: ${question.category.name}\n` +
          `ID: ${question.id}\n\n` +
          `Question\n${question.title}\n\n` +
          `Use /add to create another question.`
      );
      return;
    }

    return next();
  } catch (error) {
    console.error('handleAddText error:', error);
    clearAddFlow(ctx.from.id);
    await ctx.reply('Failed to save question. Flow reset. Try /add again.');
  }
}

module.exports = {
  addCommand,
  handleAddCategorySelect,
  handleAddCancel,
  handleAddText,
};

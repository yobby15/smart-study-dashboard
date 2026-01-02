const InvariantError = require('../../../exceptions/InvariantError');
const { TaskPayloadSchema, TasksArraySchema } = require('./schema');

const TasksValidator = {
  validateTaskPayload: (payload) => {
    const validationResult = TaskPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateTasksArrayPayload: (payload) => {
    const validationResult = TasksArraySchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = TasksValidator;
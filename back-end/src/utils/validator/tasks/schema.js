const Joi = require('joi');

const TaskPayloadSchema = Joi.object({
  title: Joi.string().required(),
  status: Joi.string().required(),
  score: Joi.number().integer(),
});

const TasksArraySchema = Joi.array().items(TaskPayloadSchema);

module.exports = { TaskPayloadSchema, TasksArraySchema };
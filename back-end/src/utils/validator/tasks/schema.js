const Joi = require('joi');

const TaskPayloadSchema = Joi.object({
  title: Joi.string().required(),
  status: Joi.string().required(),
  score: Joi.number().integer(),
});

module.exports = { TaskPayloadSchema };
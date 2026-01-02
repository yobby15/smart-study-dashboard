const Joi = require('joi');

const ClassPayloadSchema = Joi.object({
  title: Joi.string().required(),
  percentage: Joi.number().integer().min(0).max(100).required(),
});

const ClassesArraySchema = Joi.array().items(ClassPayloadSchema);

module.exports = { ClassPayloadSchema, ClassesArraySchema };
const Joi = require('joi');

const ModulePayloadSchema = Joi.object({
  title: Joi.string().max(255).required(),
  status: Joi.string().valid('uncompleted', 'completed'),
  class_id: Joi.string().max(50).required(),
});

const ModulesArraySchema = Joi.array().items(ModulePayloadSchema);

module.exports = { ModulePayloadSchema, ModulesArraySchema };
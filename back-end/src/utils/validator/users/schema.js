const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  id_program: Joi.string(),
  program: Joi.string(),
  university: Joi.string(),
  semester: Joi.number().integer(), 
  mentor: Joi.string(),
  lecturer: Joi.string(),
});

module.exports = { UserPayloadSchema };
const Joi = require('joi');

const SchedulePayloadSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().iso().required(),
  start_time: Joi.string()
    .pattern(/^([0-9]{2}):([0-9]{2})$/)
    .required()
    .messages({ 'string.pattern.base': '"start_time" must be in HH:mm format' }),
  end_time: Joi.string()
    .pattern(/^([0-9]{2}):([0-9]{2})$/)
    .required()
    .messages({ 'string.pattern.base': '"end_time" must be in HH:mm format' }),
});

module.exports = { SchedulePayloadSchema };
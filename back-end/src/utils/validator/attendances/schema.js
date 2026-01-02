const Joi = require('joi');

const AttendancePayloadSchema = Joi.object({
  date: Joi.date().iso().required(), 
  emoji: Joi.string().max(10).allow('', null),
  note: Joi.string().allow('', null),
  timestamp: Joi.string().max(10).required(),
});

const AttendancesArraySchema = Joi.array().items(AttendancePayloadSchema);

module.exports = { AttendancePayloadSchema, AttendancesArraySchema };
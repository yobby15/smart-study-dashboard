const InvariantError = require('../../../exceptions/InvariantError');
const { SchedulePayloadSchema } = require('./schema');

const SchedulesValidator = {
  validateSchedulePayload: (payload) => {
    const validationResult = SchedulePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SchedulesValidator;
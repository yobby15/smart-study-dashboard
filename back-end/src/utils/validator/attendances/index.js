const InvariantError = require('../../../exceptions/InvariantError');
const { AttendancePayloadSchema } = require('./schema');

const AttendancesValidator = {
  validateAttendancePayload: (payload) => {
    const validationResult = AttendancePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AttendancesValidator;
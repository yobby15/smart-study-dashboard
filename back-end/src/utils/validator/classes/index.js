const InvariantError = require('../../../exceptions/InvariantError');
const { ClassPayloadSchema } = require('./schema');

const ClassesValidator = {
  validateClassPayload: (payload) => {
    const validationResult = ClassPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ClassesValidator;
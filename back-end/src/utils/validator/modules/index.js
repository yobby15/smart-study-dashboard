const InvariantError = require('../../../exceptions/InvariantError');
const { ModulePayloadSchema, ModulesArraySchema } = require('./schema');

const ModulesValidator = {
  validateModulePayload: (payload) => {
    const validationResult = ModulePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateModulesArrayPayload: (payload) => {
    const validationResult = ModulesArraySchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ModulesValidator;
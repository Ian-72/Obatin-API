const InvariantError = require('../../exceptions/InvariantError');
const predictPayloadSchema = require('./schema');

const MlValidator = {
  validatePredictPayload: (payload) => {
    const validationResult = predictPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = MlValidator;

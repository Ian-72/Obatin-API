const Joi = require('joi');

const predictPayloadSchema = Joi.object({
  channel: Joi.string(),
  reply: Joi.string(),
});

module.exports = predictPayloadSchema;

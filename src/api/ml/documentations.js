const Joi = require('joi');

const doc = {
  postPredictDoc: {
    description: 'Talk to BOT',
    notes: 'This is endpoint where you can talk with Obatin BOT. Payload only contains channel and reply field, channel automaticaly create by server, after you fill channel and reply field and send request to server, if success, server will response 200 and data contains response from BOT, else server will response 400 if you send bad payload or server will response 401 that mean you need to login first',
    tags: ['api', 'bot'],
    validate: {
      payload: Joi.object({
        channel: Joi.string(),
        reply: Joi.string(),
      }),
    },
    response: {
      status: {
        200: Joi.object({
          status: Joi.string(),
          data: Joi.object({
            channel: Joi.string(),
            message: Joi.string(),
          }),
        }),
        400: undefined,
        401: undefined,
      },
    },
  },
};

module.exports = doc;

const fetch = (...args) => import('node-fetch').then(({ default: fetchx }) => fetchx(...args));
const { nanoid } = require('nanoid');

class MlHandler {
  constructor(validator, url, cacheService) {
    this.url = url;
    this._validator = validator;
    this._cacheService = cacheService;

    this.postPredictHandler = this.postPredictHandler.bind(this);
  }

  async postPredictHandler({ payload }) {
    // validasi payload
    this._validator.validatePredictPayload(payload);
    // jika channel tidak ada buat id channel
    const channel = payload.channel || nanoid(16);

    // mendapatkan data dari cache
    const inCache = await this._cacheService.get(channel);
    // jika data ada di cache
    if (inCache) {
      let answer = await fetch(`${this.url}/database?label=${inCache}&namaobat=${payload.reply}`);
      answer = await answer.json();
      const { jawab } = answer;
      // delete cache
      await this._cacheService.del(channel);
      return {
        status: 'success',
        data: {
          channel,
          message: jawab,
        },
      };
    }
    // channel tidak ada di cache
    // buat variabel response
    let response = {};
    response = await fetch(`${this.url}/bot?text=${payload.reply}`);
    response = await response.json();

    if (response.status === '1') {
      let answer = await fetch(`${this.url}/database?label=${response.label}&namaobat=${response.namaobat}`);
      answer = await answer.json();
      const { jawab } = answer;
      return {
        status: 'success',
        data: {
          channel,
          message: jawab,
        },
      };
    }

    if (response.status === '0') {
      if (response.label === 'tidakpaham') {
        let answer = await fetch(`${this.url}/respon?label=${response.label}`);
        answer = await answer.json();
        const { jawab } = answer;
        return {
          status: 'success',
          data: {
            channel,
            message: jawab,
          },
        };
      }
      let answer = await fetch(`${this.url}/respon?label=${response.label}`);
      answer = await answer.json();
      const { jawab } = answer;
      const context = response.label;
      await this._cacheService.set(channel, context);
      return {
        status: 'success',
        data: {
          channel,
          message: jawab,
        },
      };
    }
    return {
      status: 'success',
      data: {
        channel,
        message: 'Halo! selamat datang di Obatin, ada yang bisa aku bantu?',
      },
    };
  }
}

module.exports = MlHandler;

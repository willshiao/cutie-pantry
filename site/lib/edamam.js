'use strict';

const config = require('config');
const request = require('request-promise');
const logger = require('./logger');

class Edamam {
  static search(query, options = {}) {
    const qs = {
      app_id: config.get('appId'),
      app_key: config.get('apiKey'),
      q: query,
    };
    for(const key in options) {
      qs[key] = options[key];
    }
    logger.debug('Making API call with: ', qs);
    return request({
      method: 'GET',
      proxy: 'http://localhost:8888',
      uri: 'http://api.edamam.com/search',
      qs: qs,
      json: true,
    });
  }
}

module.exports = Edamam;


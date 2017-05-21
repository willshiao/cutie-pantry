'use strict';

const config = require('config');
const request = require('request-promise');

class Edamam {
    static search(query, options) {
        const form = {
            app_id: config.get('appId'),
            app_key: config.get('apiKey'),
            q: encodeURIComponent(query),
        };
        for(const key in options) {
            form[key] = options[key];
        }
        return request({
            uri: 'https://api.edamam.com/search',
            form: form,
        });
    }
}

module.exports = Edamam;


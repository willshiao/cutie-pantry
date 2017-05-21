'use strict';

const Edamam = require('../lib/edamam');

console.time('api');
Edamam.search('carrots,peas,pineapple')
  .then(data => {
    console.timeEnd('api');
    console.log('Got:', data);
    console.log('Size: ', data.hits.length);
  });

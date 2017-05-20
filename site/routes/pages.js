'use strict';

const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/:pageName', (req, res) => {
  console.log('Loading page: ', path.join('pages/', (req.params.pageName || 'index') + '.html'));
  const rs = fs.createReadStream(path.join('pages/', (req.params.pageName || 'index') + '.html'));

  rs.on('error', err => {
    return res.json({error: err});
  });
  rs.pipe(res);
});

module.exports = router;

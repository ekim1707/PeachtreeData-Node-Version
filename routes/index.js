var express = require('express');
var router = express.Router();
const { sanitizeBody } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('-------');
  res.render('index', { title: 'Name Pending' });
});

module.exports = router;

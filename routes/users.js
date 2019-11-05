var express = require('express');
var router = express.Router();
const { sanitizeBody } = require('express-validator');
const User = require('../models/User');
const expressSession = require('express-session');

const sessionOptions = {
  // your 'secret' string should be on 'gitignore' (for example your .env file) so other people cannot see it on github
  secret: 'sda;lkjsd',
  resave: false,
  saveUninitialized: false,
  // cookie: { maxAge: 60000 }
};

router.use(expressSession(sessionOptions));

router.all('*', (req, res, next) => {
  if ((req.session.loggedin === true) || (req.url === '/login?') || (req.url === '/loginProcess') || (req.url === '/register')) {
    next();
  } else {
    res.redirect('/');
  }
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res) {
  res.render('login');
})

router.post('/loginProcess', [
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
], async function (req, res) {
  const loginInfo = await User.checkPassword(req.body);
  if (loginInfo.id) {
    req.session.loggedin = true;
    req.session.user_id = loginInfo.id;
    req.session.user_email = loginInfo.email;
    req.session.user_first_name = loginInfo.first_name;
    req.session.user_last_name = loginInfo.last_name;
    res.redirect('/users/home');
  } else {
    res.redirect('/');
    console.log('hey');
  }
});

router.post('/register', [
  sanitizeBody('first_name').escape(),
  sanitizeBody('last_name').escape(),
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
], async function (req, res) {
  const newRegisterInfo = await User.checkUser(req.body);
  if (newRegisterInfo.id) {
    req.session.loggedin = true;
    req.session.user_id = newRegisterInfo.id;
    req.session.user_email = newRegisterInfo.email;
    req.session.user_first_name = newRegisterInfo.first_name;
    req.session.user_last_name = newRegisterInfo.last_name;
    res.redirect('/users/home');
  } else {
    res.redirect('/');
    console.log('hi');
  }
});

router.get('/home', (req, res) => {
  res.render('homepage', {
    user_id: req.session.user_id,
    user_email: req.session.user_email,
    user_first_name: req.session.user_first_name,
    user_last_name: req.session.user_last_name
  });
});

router.get('/quotes', (req, res) => {
  res.render('quotes', {
    user_id: req.session.user_id,
    user_email: req.session.user_email,
    user_first_name: req.session.user_first_name,
    user_last_name: req.session.user_last_name
  });
});

module.exports = router;

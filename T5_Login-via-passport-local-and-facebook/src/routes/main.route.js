const { Router } = require('express');
const passport = require('passport');
const { isLoggedInForWelcome, isLoggedInForSign } = require('../middleware/auth');
const { openWelcomePage, openSigninPage, openSignupPage, signup, logout } = require('../controllers/main.controller');

const router = Router();

router.get('/', isLoggedInForWelcome, openWelcomePage);
router.get('/logout', logout);

router.get('/signin', isLoggedInForSign, openSigninPage);
router.get('/signup', isLoggedInForSign, openSignupPage);

router.post('/signin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/signin' }));

router.post('/signup', signup, passport.authenticate('local', { successRedirect: '/', failureRedirect: '/signin' }));

module.exports = router;

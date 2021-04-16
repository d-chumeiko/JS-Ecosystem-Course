const { Router } = require('express');
const passport = require('passport');
const sendFacebookError = require('../controllers/facebook.controller');

const router = Router();

router.get('/auth/error', sendFacebookError);

router.get('/auth', passport.authenticate('facebook', { scope: [ 'email' ] }));
router.get(
	'/auth/callback',
	passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/auth/error' })
);

module.exports = router;

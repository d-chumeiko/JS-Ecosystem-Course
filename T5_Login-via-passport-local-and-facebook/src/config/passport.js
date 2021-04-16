const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const { isPasswordsSame } = require('../utils/crypto');


passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			callbackURL: process.env.FACEBOOK_CALLBACK_URL,
			profileFields: [ 'id', 'displayName', 'email' ]
		},
		function(accessToken, refreshToken, profile, done) {
			done(null, profile);
		}
	)
);

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(username, done) {
  done(null, {email});
});

passport.use(
	new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
		(email, password, done) => {
			User.findOne({ email }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				if (isPasswordsSame(user.password, password)) {
					return done(null, false);
				}
				return done(null, user);
			});
		}
	)
);
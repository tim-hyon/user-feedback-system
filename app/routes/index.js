const routes = require('express').Router();
const passport = require('passport');
const users = require('./users');
const feedbackPosts = require('./feedbackPosts');
const auth = require('./auth');

routes.use('/users', passport.authenticate('jwt', { session: false }), users);
routes.use('/feedback-posts', passport.authenticate('jwt', { session: false }), feedbackPosts);
routes.use('/auth', auth);

module.exports = routes;

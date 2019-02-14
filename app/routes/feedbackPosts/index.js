const feedbackPostRoutes = require('express').Router({ mergeParams: true });
const instance = require('./instance');
const collection = require('./collection');

feedbackPostRoutes.use('/:post_id', instance);
feedbackPostRoutes.use('/', collection);

module.exports = feedbackPostRoutes;

const userRoutes = require('express').Router({ mergeParams: true });
const instance = require('./instance');
const collection = require('./collection');
const User = require('../../models/user');

userRoutes.get('/current', async (req, res) => {
  try {
    const userId = req && req.user && req.user._id;

    if (!userId) {
      return res.status(401).json({ message: 'authentication failed.' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    res.send(err);
  }
});
userRoutes.use('/:user_id', instance);
userRoutes.use('/', collection);

module.exports = userRoutes;

const userCollectionRoutes = require('express').Router({ mergeParams: true });
const User = require('../../models/user');

userCollectionRoutes.get('/', async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).json(users);
  } catch (err) {
    res.send(err);
  }
});

module.exports = userCollectionRoutes;

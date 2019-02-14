const userInstanceRoutes = require('express').Router({ mergeParams: true });
const User = require('../../models/user');

userInstanceRoutes.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user || !user._id) {
      return res.status(404).json({ message: 'user not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    res.send(err);
  }
});

userInstanceRoutes.put('/username', async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findById(req.params.user_id);

    if (!user || !user._id) {
      return res.status(404).json({ message: 'user not found' });
    }

    user.username = username;

    const savedUser = await user.save();

    return res.status(200).json(savedUser);
  } catch (err) {
    res.send(err);
  }
});

userInstanceRoutes.put('/password', async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword || password !== confirmPassword) {
      return res.status(406).json({ message: 'password do not match.' });
    }

    const user = await User.findById(req.params.user_id);

    if (!user || !user._id) {
      return res.status(404).json({ message: 'user not found' });
    }

    await user.setPassword(password);
    user.lastPasswordChange = new Date();
    const savedUser = await user.save();

    return res.status(200).json(savedUser);
  } catch (err) {
    res.send(err);
  }
});

userInstanceRoutes.delete('/', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.user_id);

    return res.status(200).json({ message: 'user successfully deleted.' });
  } catch (err) {
    res.send(err);
  }
});

module.exports = userInstanceRoutes;

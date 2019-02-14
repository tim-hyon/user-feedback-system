const authRoutes = require('express').Router({ mergeParams: true });
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/user');

authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return res.status(400).json({
        message: 'There was an issue authenticating the user.',
      });
    }

    if (!user) {
      return res.status(400).json({
        message: 'Could not find a matching user.',
      });
    }

    req.logIn(user, { session: false }, (loginErr) => {
      if (loginErr) {
        res.send(loginErr);
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return res.json({
        username: user.username,
        userId: user._id,
        token,
      });
    });
  })(req, res, next);
});

authRoutes.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new User({
      username,
      lastPasswordChange: new Date(),
    });

    await user.setPassword(password);
    const savedUser = await user.save();

    return res.status(200).json(savedUser);
  } catch (err) {
    res.send(err);
  }
});

module.exports = authRoutes;

const feedbackPostCollectionRoutes = require('express').Router({ mergeParams: true });
const FeedbackPost = require('../../models/feedbackPost');
const User = require('../../models/user');
const sendFeedbackToSlack = require('../../utils/slack');

feedbackPostCollectionRoutes.get('/', async (req, res) => {
  try {
    const userId = req && req.user && req.user._id;

    const feedbackPosts = await FeedbackPost.find({ createdBy: userId });

    return res.status(200).json(feedbackPosts);
  } catch (err) {
    res.send(err);
  }
});

feedbackPostCollectionRoutes.post('/', async (req, res) => {
  try {
    const userId = req && req.user && req.user._id;
    const user = await User.findById(userId);

    const { subject, description } = req.body;

    const feedbackPost = new FeedbackPost({
      subject,
      description,
      createdBy: userId,
    });

    const savedFeedbackPost = await feedbackPost.save();

    sendFeedbackToSlack('post', res, subject, description, user.username);

    return res.status(200).json(savedFeedbackPost);
  } catch (err) {
    res.send(err);
  }
});

module.exports = feedbackPostCollectionRoutes;

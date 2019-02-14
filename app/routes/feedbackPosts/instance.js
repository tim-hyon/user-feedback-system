const feedbackPostInstanceRoutes = require('express').Router({ mergeParams: true });
const FeedbackPost = require('../../models/feedbackPost');
const User = require('../../models/user');
const sendFeedbackToSlack = require('../../utils/slack');

feedbackPostInstanceRoutes.get('/', async (req, res) => {
  try {
    const userId = req && req.user && req.user._id;
    const feedbackPost = await FeedbackPost.findOne({ _id: req.params.post_id, createdBy: userId });

    if (!feedbackPost || !feedbackPost._id) {
      return res.status(404).json({ message: 'Feedback post not found' });
    }

    return res.status(200).json(feedbackPost);
  } catch (err) {
    res.send(err);
  }
});

feedbackPostInstanceRoutes.put('/', async (req, res) => {
  try {
    const { subject, description } = req.body;

    const userId = req && req.user && req.user._id;
    const user = await User.findById(userId);
    const feedbackPost = await FeedbackPost.findOne({ _id: req.params.post_id, createdBy: userId });

    if (!feedbackPost || !feedbackPost._id) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    feedbackPost.subject = subject;
    feedbackPost.description = description;

    const savedFeedbackPost = await feedbackPost.save();

    sendFeedbackToSlack('put', res, subject, description, user.username);

    return res.status(200).json(savedFeedbackPost);
  } catch (err) {
    res.send(err);
  }
});

feedbackPostInstanceRoutes.delete('/', async (req, res) => {
  try {
    const userId = req && req.user && req.user._id;
    await FeedbackPost.findOneAndDelete({ _id: req.params.post_id, createdBy: userId });

    return res.status(200).json({ message: 'Feedback was successfully deleted.' });
  } catch (err) {
    res.send(err);
  }
});

module.exports = feedbackPostInstanceRoutes;

const mongoose = require('mongoose');

const { Schema } = mongoose;

const FeedbackPostSchema = new Schema({
  subject: String,
  description: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('FeedbackPost', FeedbackPostSchema);

const request = require('request');

const generateSlackOptions = (type, subject, description, username) => {
  const slackMessageTitle = type === 'post' ? '-New feedback was posted-' : '-An update was made to a feedback post-';

  return {
    uri: process.env.SLACK_WEBHOOK_URL,
    method: 'POST',
    body: {
      text: `${slackMessageTitle}\nUser: ${username}\nSubject: ${subject}\nDescription: ${description}\n\n`,
    },
    json: true,
    headers: {
      'content-type': 'application/json',
    },
  };
};

const sendFeedbackToSlack = (type, res, subject, description, username) => {
  const slackOptions = generateSlackOptions(type, subject, description, username);

  request(slackOptions, (error, response, body) => {
    if (error) {
      res.send(error);
    }
  });
};

module.exports = sendFeedbackToSlack;

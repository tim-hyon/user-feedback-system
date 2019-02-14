require('dotenv').config();

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const auth = require('./app/utils/auth');

const mongoUrl = process.env.MONGODB_URI || process.env.MONGO_URL;

mongoose.connect(mongoUrl, { useNewUrlParser: true });

const app = express();
const port = process.env.PORT;
const routes = require('./app/routes');

app.use(compression());
app.use(helmet());
app.use(cors({
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

auth(passport);

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port);

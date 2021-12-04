const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv/config');

const app = express();

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('DB connected!'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')))

app.use(require('./routes'));

app.use((err, req, res, next) => {
  res.json({ status: 'fail', error: err.message })
});

app.listen(5000, () => console.log('server is running...'));
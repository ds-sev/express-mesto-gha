// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb', {});

const { PORT = 3000 } = process.env;
const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

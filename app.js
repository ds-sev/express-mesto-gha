const mongoose = require('mongoose');

const express = require('express');

const bodyParser = require('body-parser');
// const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('connected'))
  .catch((err) => console.log(`connection error ${err}`));

app.use((req, res, next) => {
  req.user = { _id: '643efb70ce70b290ff45b7c1' };
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

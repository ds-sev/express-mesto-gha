const mongoose = require('mongoose');
const express = require('express');
const { notFound } = require('./utils/errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = { _id: '643efb70ce70b290ff45b7c1' };
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/signin', require('./routes/signin'));
app.use('/signup', require('./routes/signup'));

app.use('*', (req, res) => {
  res.status(notFound).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

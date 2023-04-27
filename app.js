const mongoose = require('mongoose');
const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { notFound } = require('./utils/errors');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// app.use((req, res, next) => {
//   req.user = { _id: '643efb70ce70b290ff45b7c1' };
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login)

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/http(s)?:\/\/(w{3}.)?[a-z0-9.-]+\/[a-z0-9.\-_~:/?#[\]@!$&'()*+,;=]?#?/i),
  }),
}), createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(notFound).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});

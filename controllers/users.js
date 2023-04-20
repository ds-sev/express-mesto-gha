const mongoose = require('mongoose');
const { badRequest, notFound, internalServerError } = require('../utils/errors');
const User = require('../models/user');
// GET USER INFO BY ID
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(notFound).send({ message: 'Запрашиваемый пользователь не найден.' });
      } else if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Некорректный формат id пользователя.' });
      } else {
        res.status(internalServerError).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};
// GET ALL USERS
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(internalServerError).send({ message: 'На сервере произошла ошибка.' }));
};
// CREATE NEW USER
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(badRequest).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(internalServerError).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};
// UPDATE USER INFORMATION
module.exports.updateUserInfo = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(notFound).send({ message: 'Пользователь с указанным id не найден. ' });
      } else if (err instanceof mongoose.Error.ValidationError) {
        res.status(badRequest).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(internalServerError).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};
// UPDATE USER AVATAR
module.exports.updateUserAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(notFound).send({ message: 'Пользователь с указанным id не найден. ' });
      } else if (err instanceof mongoose.Error.ValidationError) {
        res.status(badRequest).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(internalServerError).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};

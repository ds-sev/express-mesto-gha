const mongoose = require('mongoose')
const ERROR_CODE = require('../utils/errors')

module.exports = ((err, res, message = undefined) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res
      .status(ERROR_CODE.badRequest)
      .send({ message: `Переданы некорректные данные ${message}.` })
  }
  if (err.code === 11000) {
    return res
      .status(ERROR_CODE.conflict)
      .send({ message: 'Пользователь с таким адресом уже зарегистрирован.' })
  }
  if (err.name === 'DocumentNotFoundError') {
    res
      .status(ERROR_CODE.notFound)
      .send({ message: 'Запрашиваемый пользователь не найден.' });
  }
  if (err.name === 'CastError') {
    res
      .status(ERROR_CODE.badRequest)
      .send({ message: 'Некорректный формат id пользователя.' });
  }
  return res
    .status(ERROR_CODE.internalServerError)
    .send({ message: 'На сервере произошла ошибка.' })
})

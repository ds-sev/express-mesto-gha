const mongoose = require('mongoose')
const STATUS_CODE = require('../utils/requestStatusCodes')

const Unauthorized = require('../utils/customErrors/unauthorized')
const NotFound = require('../utils/customErrors/notFound')
const Forbidden = require('../utils/customErrors/forbidden')

module.exports = ((err, req, res, next) => {
  if (err instanceof Unauthorized) {
    return res.status(err.code).send({ message: err.message })
  }
  if (err instanceof NotFound) {
    return res.status(err.code).send({ message: err.message })
  }
  if (err instanceof Forbidden) {
    return res.status(err.code).send({ message: err.message })
  }
  if (err.code === 11000) {
    return res
      .status(STATUS_CODE.conflict)
      .send({ message: 'Пользователь с таким адресом уже зарегистрирован.' })
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res
      .status(STATUS_CODE.badRequest)
      .send({ message: 'Переданы некорректные данные.' })
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res
      .status(STATUS_CODE.notFound)
      .send({ message: 'Данные с запрошенным id не найдены.' })
  }
  if (err instanceof mongoose.Error.CastError) {
    return res
      .status(STATUS_CODE.badRequest)
      .send({ message: 'Некорректный формат id в запросе.' })
  }
  res
    .status(STATUS_CODE.internalServerError)
    .send({ message: 'Непредвиденная ошибка.' })
  return next()
})

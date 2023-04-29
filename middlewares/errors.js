const mongoose = require('mongoose')
const STATUS_CODE = require('../utils/requestStatusCodes')

module.exports = ((err, res, message = undefined) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res
      .status(STATUS_CODE.badRequest)
      .send({ message: `Переданы некорректные данные ${message}.` })
  }
  if (err.code === 11000) {
    return res
      .status(STATUS_CODE.conflict)
      .send({ message: 'Пользователь с таким адресом уже зарегистрирован.' })
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
  return res
    .status(STATUS_CODE.internalServerError)
    .send({ message: 'На сервере произошла ошибка.' })
})

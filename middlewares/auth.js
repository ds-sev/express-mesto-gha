const jwt = require('jsonwebtoken')
const { unauthorized } = require('../utils/requestStatusCodes')

module.exports = (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    return res
      .status(unauthorized)
      .send({ message: 'Необходима авторизация' })
  }
  let payload
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'secret-key')
  } catch (err) {
    return res
      .status(unauthorized)
      .send({ message: 'Необходима авторизация' })
  }
  req.user = payload
  return next()
}

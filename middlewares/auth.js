const jwt = require('jsonwebtoken');
const { unauthorized } = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(unauthorized)
      .send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return res
      .status(unauthorized)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};

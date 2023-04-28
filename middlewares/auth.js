const jwt = require('jsonwebtoken');
const { unauthorized } = require('../utils/errors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(unauthorized)
      .send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(unauthorized)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};

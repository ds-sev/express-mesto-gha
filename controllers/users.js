const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const { created } = require('../utils/requestStatusCodes')
const errors = require('../middlewares/centralErrorHandler')

// GET USER INFO BY ID
module.exports.getUser = (req, res, next) => {
  const id = req.params.userId || req.user._id
  User.findById(id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => errors(err, req, res, next))
}
// GET ALL USERS
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => errors(err, req, res, next))
}
// CREATE NEW USER
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => {
      const userDataObject = user.toObject()
      delete userDataObject.password
      res.status(created).send({ data: userDataObject })
    })
    .catch(next)
}
// UPDATE USER INFORMATION
module.exports.updateUserInfo = (req, res, next) => {
  const id = req.user._id
  const { name, about } = req.body
  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next)
}
// UPDATE USER AVATAR
module.exports.updateUserAvatar = (req, res, next) => {
  const id = req.user._id
  const { avatar } = req.body
  User.findByIdAndUpdate(
    id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next)
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'secret-key',
        { expiresIn: '7d' },
      )
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000 * 24 * 7,
      })
      res.send({ token })
    })
    .catch(next)
}

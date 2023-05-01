const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { created } = require('../utils/requestStatusCodes')

// GET USER INFO
function getUser(res, id, next) {
  User.findById(id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next)
}
// find authorized user
module.exports.getCurrentUser = (req, res, next) => {
  const currentUserId = req.user._id
  getUser(res, currentUserId, next)
}
// find user in BD by ID
module.exports.getTargetUser = (req, res, next) => {
  const targetUserId = req.params.userId
  getUser(res, targetUserId, next)
}

// GET ALL USERS
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next)
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

// UPDATE INFO MAIN FUNCTION
function updateInfo(req, res, dataToUpdate, next) {
  const id = req.user._id
  User.findByIdAndUpdate(
    id,
    dataToUpdate,
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next)
}

// user info update ctrl
module.exports.updateUserInfo = (req, res, next) => {
  const userData = req.body
  updateInfo(req, res, userData, next)
}
// avatar update ctrl
module.exports.updateUserAvatar = (req, res, next) => {
  const newAvatarLink = req.body
  updateInfo(req, res, newAvatarLink, next)
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
        maxAge: 3600000 * 24 * 7,
      })
      res.send({ message: 'Вы успешно вошли.' })
    })
    .catch(next)
}

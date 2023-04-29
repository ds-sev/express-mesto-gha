const router = require('express').Router()
const { userSignInValidate, userSignUpValidate } = require('../middlewares/validate')
const { login, createUser } = require('../controllers/users')
const auth = require('../middlewares/auth')
const { notFound } = require('../utils/requestStatusCodes')

router.post('/signin', userSignInValidate, login)
router.post('/signup', userSignUpValidate, createUser)
router.use('/users', auth, require('./users'))
router.use('/cards', auth, require('./cards'))

router.use('*', (req, res) => {
  res.status(notFound).send({ message: 'Страница не найдена' })
})

module.exports = router

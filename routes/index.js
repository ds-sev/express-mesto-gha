const router = require('express').Router()
const { userSignInValidate, userSignUpValidate } = require('../middlewares/validate')
const { login, createUser } = require('../controllers/users')
const auth = require('../middlewares/auth')
const NotFound = require('../utils/customErrors/notFound')

router.post('/signin', userSignInValidate, login)
router.post('/signup', userSignUpValidate, createUser)
router.use('/users', auth, require('./users'))
router.use('/cards', auth, require('./cards'))

router.use('*', (req, res, next) => next(new NotFound('Страница не найдена')))

module.exports = router

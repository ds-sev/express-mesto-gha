const router = require('express').Router()
const {
  getUsers, updateUserInfo, updateUserAvatar, getCurrentUser, getTargetUser,
} = require('../controllers/users')
const { userDataValidate, userIdValidate, urlValidate } = require('../middlewares/validate')

router.get('/', getUsers)
router.get('/me', getCurrentUser)
router.get('/:userId', userIdValidate, getTargetUser)
router.patch('/me', userDataValidate, updateUserInfo)
router.patch('/me/avatar', urlValidate, updateUserAvatar)

module.exports = router

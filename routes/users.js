const router = require('express').Router();
const {
  getUsers, getUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');
const { userDataValidate, userIdValidate, urlValidate } = require('../middlewares/validate')

router.get('/', getUsers);
router.get('/:userId', userIdValidate, getUser);
router.get('/me', getUser);
router.patch('/me', userDataValidate, updateUserInfo);
router.patch('/me/avatar', urlValidate, updateUserAvatar);

module.exports = router;

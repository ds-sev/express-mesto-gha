const router = require('express').Router();
const { celebrate, Joi } = require('celebrate')
const {
  getUsers, getUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/http(s)?:\/\/(w{3}.)?[a-z0-9.-]+\/[a-z0-9.\-_~:/?#[\]@!$&'()*+,;=]?#?/i),
  }),
}), updateUserAvatar);

module.exports = router;

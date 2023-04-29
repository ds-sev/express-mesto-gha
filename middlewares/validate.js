const { Joi, celebrate } = require('celebrate')
const CUSTOM_PATTERNS = require('../utils/constants')

module.exports.cardDataValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(CUSTOM_PATTERNS.URL),
  }),
})

module.exports.cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
})

module.exports.userDataValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
})

module.exports.userIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
})

module.exports.urlValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(CUSTOM_PATTERNS.URL),
  }),
})

module.exports.userSignInValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
})

module.exports.userSignUpValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(CUSTOM_PATTERNS.URL),
  }),
})

const { Joi, celebrate } = require('celebrate')
const CUSTOM_PATTERNS = require('../utils/constants')

module.exports.cardDataValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(CUSTOM_PATTERNS.URL),
  }),
})

module.exports.cardIdValidate = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
})

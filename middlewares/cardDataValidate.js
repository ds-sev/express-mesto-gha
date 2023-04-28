const { Joi, celebrate } = require('celebrate')
const { URL_TEMPLATE } = require('../utils/constants')

module.exports.cardDataValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_TEMPLATE),
  }),
})

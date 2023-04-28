const { Joi, celebrate } = require('celebrate')

module.exports.userDataValidate = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
})

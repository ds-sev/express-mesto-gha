const { badRequest } = require('../requestStatusCodes')

class BadRequest extends Error {
  constructor(message) {
    super(message)
    this.code = badRequest
  }
}

module.exports = BadRequest

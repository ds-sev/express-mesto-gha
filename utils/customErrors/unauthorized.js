const { unauthorized } = require('../requestStatusCodes')

class Unauthorized extends Error {
  constructor(message) {
    super(message)
    this.code = unauthorized
  }
}

module.exports = Unauthorized

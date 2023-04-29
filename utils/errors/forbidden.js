const { forbidden } = require('../requestStatusCodes')

class Forbidden extends Error {
  constructor(message) {
    super(message)
    this.code = forbidden
  }
}

module.exports = Forbidden

const { notFound } = require('../requestStatusCodes')

class NotFound extends Error {
  constructor(message) {
    super(message)
    this.code = notFound
  }
}

module.exports = NotFound

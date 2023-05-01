const { conflict } = require('../requestStatusCodes')

class Conflict extends Error {
  constructor(message) {
    super(message)
    this.code = conflict
  }
}

module.exports = Conflict

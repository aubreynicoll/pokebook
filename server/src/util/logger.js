/* eslint-disable no-console */
const { NODE_ENV } = require('./config')

const log = (message) => {
  if (NODE_ENV !== 'production') {
    console.log(message)
  }
}

const error = (message) => {
  if (NODE_ENV !== 'production') {
    console.error(message)
  }
}

module.exports = {
  log,
  error,
}

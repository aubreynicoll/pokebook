require('dotenv').config()

let MONGO_DB_URI
switch (process.env.NODE_ENV) {
case 'test':
  MONGO_DB_URI = process.env.MONGO_DB_URI_TEST
  break
case 'development':
  MONGO_DB_URI = process.env.MONGO_DB_URI_DEV
  break
default:
  MONGO_DB_URI = process.env.MONGO_DB_URI
  break
}

module.exports = {
  MONGO_DB_URI,
}

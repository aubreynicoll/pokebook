const { DataSource } = require('apollo-datasource')
const mongoose = require('mongoose')
const { MONGO_DB_URI } = require('../util/config')
const logger = require('../util/logger')

class DatabaseAPI extends DataSource {
  constructor() {
    super()
    logger.log(`Connecting to ${MONGO_DB_URI}...`)
    mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }).then(() => {
      logger.log('Connection successful!')
    }).catch((error) => {
      logger.error(`Connection failed: ${error.message}`)
    })
  }
}

module.exports = DatabaseAPI

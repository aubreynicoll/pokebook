const { DataSource } = require('apollo-datasource')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { MONGO_DB_URI } = require('../util/config')
const logger = require('../util/logger')
const User = require('../models/User')

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

  // wishlist:
  async createUser({ username, password }) {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      passwordHash,
      dateCreated: new Date(),
    })
    return user.save()
  }

  // async authenticateUser() {
  //   return null
  // }

  async getAllUsers() {
    const users = await User.find({})
    return users
  }

  async getUserById(id) {
    const user = await User.findById(id)
    return user
  }
}

module.exports = DatabaseAPI

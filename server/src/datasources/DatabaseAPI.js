/* eslint-disable class-methods-use-this */
const { DataSource } = require('apollo-datasource')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { MONGO_DB_URI } = require('../util/config')
const logger = require('../util/logger')
const { JWT_SECRET } = require('../util/config')
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

  async createUser({ username, password }) {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      passwordHash,
      dateCreated: new Date(),
    })
    return user.save()
  }

  async authenticateUser({ username, password }) {
    const user = await User.findOne({ username })
    const passwordCorrect = await bcrypt.compare(password, this.user.passwordHash)
    if (!user || !passwordCorrect) {
      throw new UserInputError('Invalid username or password')
    }
    const unsignedTokenValue = {
      ...user,
    }
    const tokenValue = jwt.sign(unsignedTokenValue, JWT_SECRET)
    return {
      value: `bearer ${tokenValue}`,
    }
  }

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

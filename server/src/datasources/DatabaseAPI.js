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

  // wishlist:
  async createUser({ username, password }) {
    this.passwordHash = await bcrypt.hash(password, 10)
    this.user = new User({
      username,
      passwordHash: this.passwordHash,
      dateCreated: new Date(),
    })
    return this.user.save()
  }

  async authenticateUser({ username, password }) {
    this.user = await User.findOne({ username })
    this.passwordCorrect = await bcrypt.compare(password, this.user.passwordHash)
    if (!this.user || !this.passwordCorrect) {
      throw new UserInputError('Invalid username or password')
    }
    this.unsignedTokenValue = {
      ...this.user,
    }
    this.tokenValue = jwt.sign(this.unsignedTokenValue, JWT_SECRET)
    return {
      value: `bearer ${this.tokenValue}`,
    }
  }

  async getAllUsers() {
    this.users = await User.find({})
    return this.users
  }

  async getUserById(id) {
    this.user = await User.findById(id)
    return this.user
  }
}

module.exports = DatabaseAPI

const config = require('config')
const { User } = require('../../../models/users')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

describe('user.generateAuthToken', () => {
  it('should return a valid JWT token', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    }
    const user = new User(payload)
    const token = user.generateAuthToken()

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    expect(decoded).toMatchObject(payload)
  })
})

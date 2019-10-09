const authenticator = require('../auth/authenticator')
const signinController = {
  signIn(req, res, next) {
    authenticator.authenticate(req, res, next)
  }
}

module.exports = signinController

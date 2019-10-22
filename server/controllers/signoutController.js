const logoutController = {
  signOut(req, res) {
    req.logout()
    res.sendStatus(200)
  }
}

module.exports = logoutController

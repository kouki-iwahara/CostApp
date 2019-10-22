const indexController = {
  authenticate(req, res) {
    const user = req.user
    res.json({ result: user })
  }
}

module.exports = indexController

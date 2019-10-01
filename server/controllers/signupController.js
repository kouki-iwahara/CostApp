const models = require('../models')

const signupController = {
  // emailとpasswordでsignup
  async signUp(req, res) {
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    // emailに重複禁止設定をした為フィルターをかける
    const user = await models.user
      .findOne({ where: { email } })
      .catch((error) => {
        res.status(404).send({ error: error.message })
      })
    // emailが登録済みならフロントに返す
    if (user) {
      return res.send({ message: 'そのEmailは既に使われています' })
    }
    // emailが使われていなければuser作成
    const createdUser = await models.user
      .create({
        email,
        password
      })
      .catch((error) => {
        res.status(404).send({ error: error.message })
      })
    console.log(createdUser)
    res.status(200).send({ message: '登録完了です' })
  }
}
module.exports = signupController

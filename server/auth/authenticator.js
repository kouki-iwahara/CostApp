const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const models = require('../models')

const authenticator = {
  // 初期化とシリアライズ・デシリアライズ処理
  initialize(app) {
    // passport初期化
    app.use(passport.initialize())
    // セッション管理をするための設定
    app.use(passport.session())
    // シリアライズ処理でidを渡す
    passport.serializeUser((userId, done) => {
      console.log('serializeUser')
      done(null, userId)
    })
    passport.deserializeUser((userId, done) => {
      console.log('deserializeUser')
      // user情報を渡す
      models.user
        .findOne({ where: { userId } })
        .then((user) => {
          done(null, user)
          console.log(user)
        })
        .catch((error) => {
          done(error.message, null)
        })
    })
  },
  // LocalStrategyの処理内容をセット
  setStrategy() {
    passport.use(
      'local-signin',
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true
        },
        (req, email, password, done) => {
          console.log(req.body)
          bcrypt.hash(password, 10, () => {
            // 入力されたemailからuser情報を取得
            models.user
              .findOne({ where: { email } })
              .then((user) => {
                console.log(user)
                // userが取得できない場合認証失敗
                if (!user) {
                  return done(null, false)
                }
                // hash化で登録されたpwdと入力されたpwdの比較(trueで認証成功,userIdを渡す)
                if (bcrypt.compareSync(password, user.password)) {
                  return done(null, user.userId)
                } else {
                  return done(null, false)
                }
              })
              .catch((error) => {
                console.log(error.message)
              })
          })
        }
      )
    )
  },
  // emailとpasswordで認証処理
  authenticate(req, res, next) {
    passport.authenticate(
      'local-signin',
      { session: true },
      (error, userId) => {
        if (error) {
          return next(error)
        }
        if (!userId) {
          return res.send({ message: 'ユーザーIDかパスワードが間違っています' })
        }
        req.logIn(userId, (error) => {
          if (error) {
            return next(error)
          }
          return res.status(200).send({ userId, message: 'ようこそ！' })
        })
      }
    )(req, res, next)
  },
  // sessionが切れているかの確認
  isAuthenticated(req, res, next) {
    console.log('入った')
    if (req.isAuthenticated()) {
      console.log('認証')
      return next()
    } else {
      res.send({
        error: 'ユーザー認証が切れたのでサインインページに戻ります'
      })
    }
  }
}

module.exports = authenticator

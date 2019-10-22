const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const config = require('../nuxt.config.js')
const authenticator = require('./auth/authenticator')
const indexRouter = require('./routes/index')
const homeRouter = require('./routes/home')
const signinRouter = require('./routes/signin')
const signupRouter = require('./routes/signup')
const signoutRouter = require('./routes/signout')
const foodRouter = require('./routes/food')
const recipeRouter = require('./routes/recipe')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// sessionの設定
app.use(
  session({
    secret: 'cost management',
    resave: false,
    saveUninitialized: true
  })
)
authenticator.initialize(app)
authenticator.setStrategy()
// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use('/', indexRouter)
  app.use('/home', homeRouter)
  app.use('/signin', signinRouter)
  app.use('/signup', signupRouter)
  app.use('/signout', signoutRouter)
  app.use('/food', foodRouter)
  app.use('/recipe', recipeRouter)
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

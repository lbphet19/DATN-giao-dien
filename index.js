require('dotenv').config()
let express = require('express')
let nunjucks = require('nunjucks')
const init = require('./utils/nunjucks')
let indexRouter = require('./routes/index')
let path = require('path')
let logger = require('./utils/logger')
let app = express()
let env = nunjucks.configure('views',{
    autoescape: true,
    express: app
})

app.set('view engine', 'njk');
init(env)

app.use(express.json())
app.use(express.urlencoded({ extended:  false }))
// app.use(cookieParser())

/* static */
app.use(express.static(path.join(__dirname, 'public')))

/* router */
app.use('/',indexRouter)

app.listen(process.env.PORT || '3000', process.env.HOST || '127.0.0.1', () => {
	logger.info('Start app %s:%s', process.env.HOST || '127.0.0.1', process.env.PORT || '3000')
})
module.exports = app
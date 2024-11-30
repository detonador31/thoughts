const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const app = express()

const conn = require('./db/conn')

// Imports variados
const thoughtRoutes = require('./routes/thoughtRoutes')
const authRoutes = require('./routes/authRoutes')
const ThoughtsController = require('./controllers/ThoughtsController')

//Models

const Thought = require('./models/Thought')
const User = require('./models/User')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Importa os asets da pasta public
app.use(express.static('public'))

//Resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//session middleware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: () => { },
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

// flash messages
app.use(flash())

// set session to res
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

//Routes
app.use('/thoughts', thoughtRoutes)
app.use('/', authRoutes)

app.get('/', ThoughtsController.index)

conn
    //.sync({ force: true })
    .sync()
    .then(() => {
        app.listen(5000)
    })
    .catch((err) => console.log(`Erro ao tentar conectar ao bd por meio do index: ${err}`))
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

//database
const db = require('./config/db')

const app = express()

app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

//Config.env to ./config/config.env
require('dotenv').config({
    path:'./config/config.env'
})


//Use bodyParser
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())

//Config for only developement
if(process.env.NODE_ENV === 'development'){
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'))
    //Morgan give information about each request
    //Cors allow to deal with react for localhost at port 3000 without any problem
}

//Load all routes 
const autosearchRouter = require('./routes/auto.search.route')
const pneuRouter = require('./routes/pneu.route')
const poidsLourdsRouter = require('./routes/poidsLourd.search.route')
const motoRouter = require('./routes/moto.search.route')
const agricoleRouter = require('./routes/agricole.search.route')
const commande = require('./routes/commande.route')
const authRouter = require('./routes/admin.auth.route')

//Use routes
app.use('/api/', authRouter)
app.use('/api/', autosearchRouter)
app.use('/api/', pneuRouter)
app.use('/api/', poidsLourdsRouter)
app.use('/api', motoRouter)
app.use('/api/', agricoleRouter)
app.use('/api/', commande)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})

//connect to database
db.authenticate()
.then(() => (console.log('database connected successfully...')))
.catch(err => console.error('Unable to connect to the database:', error))


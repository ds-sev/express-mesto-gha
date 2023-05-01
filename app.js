require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const { errors } = require('celebrate')
const routes = require('./routes/index')
const centralErrorHandler = require('./middlewares/centralErrorHandler')

const app = express();
const port = process.env.PORT || 3000

mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true,
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(routes)

// validation errors by Joi-library
app.use(errors())

// main error processing
app.use(centralErrorHandler)

app.listen(port, () => {
  // console.log(`App listening on port ${port}`);
})

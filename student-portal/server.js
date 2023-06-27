const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { errorHandler } = require('./middleware/Error')
const connectDB = require('./config/db')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
connectDB()
app.use( express.urlencoded({extended : true }));
app.use(errorHandler)
app.listen(PORT,() => {console.log(`Server Started On ${PORT}`)})
app.use(cors())
app.use(express.json())
app.use('/api/student',require('./routes/eventRoutes'))
app.use('/api/student',require('./routes/profileRoutes'))

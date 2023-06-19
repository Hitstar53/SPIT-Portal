const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const throwError = require('./Error')
const ErrorHandler = require('./ErrorHandler')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const URI = process.env.MONGO_URI

mongoose.connect(URI,{useNewUrlParser:true})
.then(()=>{
    console.log("Connected to mongodb succesfully")
}).catch(err=>console.error(err))

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})

//Middleware to throw errors
app.use(throwError)
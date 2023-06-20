const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');


const PORT = process.env.PORT || 5000
connectDB();
const app = express()

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// const URI = process.env.MONGO_URI

app.use('/api/faculty', require('./routes/teacherRoutes'));
app.use(errorHandler);
app.listen(port, () => console.log(`Server Started on Port ${port}`));

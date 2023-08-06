const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { errorHandler } = require('./middleware/Error')
const connectDB = require('./config/db')
const schedule = require('node-schedule')
const { cleanupAnnouncements,cleanupExams } = require('./controllers/cleanupController')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
connectDB()

schedule.scheduleJob('0 2 * * *',async()=>{
    try {
        await cleanupAnnouncements();
        console.log('Announcements cleanup completed.');
    } catch (err) {
        console.error('An error occurred during announcements cleanup:', err);
    }
})

schedule.scheduleJob('0 3 * * *',async()=>{
    try {
        await cleanupExams();
        console.log('Exams cleanup completed.');
    } catch (err) {
        console.error('An error occurred during exams cleanup:', err);
    }
})

app.use( express.urlencoded({extended : true }));
app.use(errorHandler)
app.listen(PORT,() => {console.log(`Server Started On http://localhost:${PORT}`)})
app.use(cors())
app.use(express.json({limit:'5mb'}))
app.use('/api/student',require('./routes/eventRoutes'))
app.use('/api/student',require('./routes/profileRoutes'))
app.use('/api/student',require('./routes/committeeRoutes'))
app.use('/api/student',require('./routes/careerConnectRoutes'))
app.use('/api/student',require('./routes/extracurricularRoutes'))
app.use('/api/student',require('./routes/announcementsRoutes'))
app.use('/api/admin',require('./routes/adminRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/faculty',require('./routes/facultyRoutes'))
app.use('/api/faculty',require('./routes/searchRoutes'))
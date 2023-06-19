import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { facultyRouter } from "./routes/faculty.js"
import { connect } from 'http2';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/faculty", facultyRouter)

mongoose.connect(
    "mongodb+srv://test:test123@nodeexpproj.if4mumv.mongodb.net/portal?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(
    console.log("MongoDb connected")
).catch(
    (err) => console.log(err)
)

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
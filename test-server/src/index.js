import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import facultyRouter from './routes/faculty.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/faculty", facultyRouter);

mongoose.connect(
    "mongodb+srv://siddhesh:1234@cluster0.rnjvol7.mongodb.net/faculty?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log("MongoDb connected");
}).catch((err) => {
    console.log(err);
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});

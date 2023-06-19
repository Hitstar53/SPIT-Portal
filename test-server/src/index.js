import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://test:test123@nodeexpproj.if4mumv.mongodb.net/NodeExpProj?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
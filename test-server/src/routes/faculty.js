import express from 'express';
// import { facultyModel } from '../models/Faculty.js';
import Faculty from '../models/Faculty.js'

const router = express.Router();

router.get("/", async (req, res) => {
    const faculty = await Faculty.find({}).catch((err) => {
        console.log(err);
        });
        console.log(faculty)
    res.json(faculty);
})

router.get("/info", async (req, res) => {
    const { name, email } = req.body;

    console.log(name,email)

    const faculty = await facultyModel.findOne({ name: name }).catch((err) => {
        console.log(err);
      });
    console.log(faculty)
    res.json(faculty);
})

export {router as facultyRouter}
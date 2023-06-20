import express from 'express';
import { facultyModel } from '../models/Faculty.js';

const router = express.Router();

router.post("/info", async (req, res) => {
    const { name, email } = req.body;

    console.log(name, email);

    const faculty = await facultyModel.findOne({ name }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Failed to create faculty" });
    });

    console.log(faculty);
    res.json(faculty);
});

export default router;

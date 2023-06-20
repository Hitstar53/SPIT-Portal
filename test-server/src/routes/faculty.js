import express from 'express';
import { facultyModel } from '../models/Faculty.js';

const router = express.Router();

router.post("/info", async (req, res) => {
    const { name, courses } = req.body; 

    try {
        const filter = { name: name }; 
        const update = { courses: courses }; 

        const faculty = await facultyModel.findOneAndUpdate(filter, update, {
            new: true 
        });

        console.log(faculty);
        res.json(faculty);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update faculty" });
    }
});

export default router;

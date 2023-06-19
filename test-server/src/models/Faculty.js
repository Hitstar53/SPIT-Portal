import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
   
});

// export const facultyModel = mongoose.model('faculty', teacherSchema);
models.export =mongoose.model('faculty', teacherSchema);


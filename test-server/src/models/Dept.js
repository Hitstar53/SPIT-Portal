import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    floor: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    HOD: {
        type: String,
        required: true,
    },
});




const Department = mongoose.model('Dept', departmentSchema);
export default Department;
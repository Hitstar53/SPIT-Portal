const mongoose = require('mongoose');

const appraisalSchema = new mongoose.Schema({
    teacherName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    Dimension1: {

    }

    Dimension2: {
        RP1: [
        
        ]
    }
    // Add other fields relevant to the appraisal
});

const Appraisal = mongoose.model('Appraisal', appraisalSchema);

module.exports = Appraisal;
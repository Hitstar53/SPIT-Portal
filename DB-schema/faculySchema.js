import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const facultySchema = new Schema({
    dept: {
        name: { type: String, required: true },
        id: { type: String, required: true },
        floor: { type: Number, required: true },
    },
    teachers: [{
        name: { type: String, required: true },
        id: { type: String, required: true },
        gender: { type: String, required: true },
        DOB: { type: Date, required: true },
        DOJ: { type: Date, required: true },
        address: { type: String, required: true },
        phone: { type: Number, required: true },
        email: { type: String, required: true },
        type: { type: String, enum: ['Permanent', 'Temporary'], required: true },
        deptName: { type: String, required: true },
        position: { type: String, required: true },
        qualification: { type: String, required: true },
        specialization: { type: String, required: true },
        salary: { type: Number, required: true },
        courses: [{
            name: { type: String, required: true },
            id: { type: String, required: true },
            credits: { type: Number, required: true },
            semester: { type: String, required: true },
            type: { type: String, enum: ['OE', 'PE', 'core'], required: true },
            deptName: { type: String, required: true },
            class: { type: String, required: true },
        }],
        leaves: [{
            allotedLeaves: { type: Number, required: true },
            remainingLeaves: { type: Number, required: true },
            numberOfDays: { type: Number, required: true },
            date: { type: Date, required: true },
            type: { type: String, required: true },
            reason: { type: String, required: true },
        }],
        attendance: [{
            date: { type: Date, required: true },
            punchInTime: { type: Date, required: true },
            punchOutTime: { type: Date, required: true },
            hours: { type: Number, required: true },
        }],
        inchargeOfclass: { type: String, required: true },
        lecSchedule: [{
            couresName: { type: String, required: true },
            classNumber: { type: String, required: true },
            semester: { type: String, required: true },
            day: { type: String, required: true },
            time: { type: String, required: true },
            roomNumber: { type: String, required: true },
            type: { type: String, required: true },
            typePlan: {
                typeNo: { type: Number, required: true },
                topic: { type: String, required: true },
                suggestedReadings: { type: String, required: true },
            },
        }],
    }],
    appraisal: [{
        teacherName: { type: String, required: true },
        subject: [{
            name: { type: String, required: true },
            semester: { type: String, required: true },
            totalLectures: { type: Number, required: true },
            lecturesTaken: { type: Number, required: true },
            percentFeedback: { type: Number, required: true },
            studentsAttended: { type: Number, required: true },
            remedialActivities: { type: String, required: true },
            OtherActivities: { type: String, required: true },
        }],
        menteeFeedback: { type: String, required: true },
        guestLectures: [{
            title: { type: String, required: true },
            guestName: { type: String, required: true },
            details: { type: String, required: true },
        }],
        qpaper: [{
            courseName: { type: String, required: true },
        }],
        publications: [{
            title: { type: String, required: true },
            name: { type: String, required: true },
            authors: { type: String, required: true },
            publisher: { type: String, required: true },
            paperLink: { type: String, required: true },
        }],
        patent: [{
            patentObtained: { type: String, required: true },
            details: { type: String, required: true },
        }],
        books: [{
            title: { type: String, required: true },
            authors: { type: String, required: true },
            publisher: { type: String, required: true },
        }],
        mooc: [{
            moocs: { type: String, required: true },
            title: { type: String, required: true },
            details: { type: String, required: true },
        }],
        sponseredReasearch: [{
            projTitle: { type: String, required: true },
            agency: { type: String, required: true },
            details: { type: String, required: true },
            fundedAmount: { type: Number, required: true },
        }],
        consultancy: [{
            consultancy: { type: String, required: true },
            consultant: { type: String, required: true },
            details: { type: String, required: true },
            fundedAmount: { type: Number, required: true },
        }],
        citations: [{
            citations: { type: String, required: true },
            prevYearCitations: { type: Number, required: true },
        }],
        selfDevelopment: [{
            title: { type: String, required: true },
            orgDetails: { type: String, required: true },
            dates: { type: Date, required: true },
            noOfDays: { type: Number, required: true },
        }],
        softwareOrHardwareDev: [{
            labSetup: { type: String, required: true },
            model: { type: String, required: true },
            details: { type: String, required: true },
        }],
        activitiesNotCovered: [{ }],
        administration: { type: Boolean, required: true },
        outreachActivities: {
            trainingOrganized: [{
                organized: { type: String, required: true },
                sponserAgency: { type: String, required: true },
                funds: { type: Number, required: true },
                noOfDays: { type: Number, required: true },
            }],
            invitedAsGuest: [{
                instituteName: { type: String, required: true },
                dates: { type: Date, required: true },
                details: { type: String, required: true },
            }],
            partOfCommittee: [{
                partOfCommittee: { type: String, required: true },
                details: { type: String, required: true },
                organization: { type: String, required: true },
                dates: { type: Date, required: true },
            }],
            articleInMedia: [{
                details: { type: String, required: true },
            }],
            coGuide: [{
                instituteName: { type: String, required: true },
                details: { type: String, required: true },
            }],
            collaboration: [{
                instituteName: { type: String, required: true },
                details: { type: String, required: true },
            }],
        }
    }],
});

const Faculty = model('Faculty', facultySchema);

export default Faculty;

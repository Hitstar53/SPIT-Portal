import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

// Profile Schema
const profileSchema = new Schema({
  student: {
    uid: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    religion: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    social: { type: String, required: true },
    parentInfo: {
      father: {
        name: { type: String, required: true },
        phone: { type: Number, required: true },
        email: { type: String, required: true }
      },
      mother: {
        name: { type: String, required: true },
        phone: { type: Number, required: true },
        email: { type: String, required: true }
      }
    }
  },
  education: {
    uid: { type: Schema.Types.ObjectId, required: true },
    background: [
      {
        degree: { type: String, required: true },
        year: { type: Number, required: true },
        institute: { type: String, required: true },
        result: { type: String, required: true },
        board: { type: String, required: true }
      }
    ],
    current: {
      degree: { type: String, required: true },
      admissionYear: { type: Number, required: true },
      passingYear: { type: Number, required: true },
      institute: { type: String, required: true },
      cgpa: { type: Number, required: true },
      semester: { type: Number, required: true },
      branch: { type: String, required: true },
      division: { type: String, required: true }
    }
  },
  attendance: {
    uid: { type: Schema.Types.ObjectId, required: true },
    semester: {
      semester: { type: Number, required: true },
      course: [
        {
          name: { type: String, required: true },
          total: { type: Number, required: true },
          attended: { type: Number, required: true },
          percentage: { type: Number, required: true }
        }
      ]
    }
  }
});

// Academics Schema
const academicsSchema = new Schema({
  course: [
    {
      code: { type: String, required: true },
      name: { type: String, required: true },
      semester: { type: Number, required: true },
      credit: { type: Number, required: true },
      type: { type: String, required: true },
      teacher: { type: String, required: true },
      attendance: { type: Number, required: true } // referenced from attendance sub-collection
    }
  ],
  result: {
    uid: { type: Schema.Types.ObjectId, required: true },
    cgpa: { type: Number, required: true },
    semester: [
      {
        semester: { type: Number, required: true },
        course: [
          {
            exam: [
              {
                type: { type: String, required: true },
                date: { type: Date, required: true },
                marks: { type: Number, required: true },
                total: { type: Number, required: true }
              }
            ],
            grade: { type: String, required: true },
            gpa: { type: Number, required: true }
          }
        ],
        sgpa: { type: Number, required: true }
      }
    ]
  }
});

// Extra-curricular Schema
const extraCurricularSchema = new Schema({
  committee: [
    {
      name: { type: String, required: true },
      faculty: { type: String, required: true },
      member: [
        {
          uid: { type: Schema.Types.ObjectId, required: true },
          name: { type: String, required: true },
          position: [
            {
              pos: { type: String, required: true },
              duration: { type: String, required: true }
            }
          ]
        }
      ]
    }
  ],
  event: [
    {
      uid: { type: Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      organizer: { type: String, required: true },
      date: { type: Date, required: true },
      description: { type: String, required: true },
      report: { type: Schema.Types.Mixed, required: true }
    }
  ],
  volunteer: [
    {
      uid: { type: Schema.Types.ObjectId, required: true },
      organizer: { type: String, required: true },
      date: { type: Date, required: true },
      description: { type: String, required: true }
    }
  ]
});

// CareerConnect Schema
const careerConnectSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, required: true },
  skills: { type: String, required: true },
  internship: [
    {
      company: { type: String, required: true },
      duration: { type: String, required: true },
      description: { type: String, required: true },
      role: { type: String, required: true },
      mode: { type: String, required: true },
      stipend: { type: Number, required: true }
    }
  ],
  placement: {
    company: { type: String, required: true },
    start: { type: Date, required: true },
    role: { type: String, required: true },
    salary: { type: Number, required: true },
    description: { type: String, required: true }
  },
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      link: { type: String, required: true },
      mentor: { type: String, required: true },
      duration: { type: String, required: true },
      team: [
        {
          uid: { type: Schema.Types.ObjectId, required: true },
          name: { type: String, required: true },
          role: { type: String, required: true }
        }
      ]
    }
  ]
});

// Main Schema
const studentSchema = new Schema({
  profile: { type: profileSchema, required: true },
  academics: { type: academicsSchema, required: true },
  extraCurricular: { type: extraCurricularSchema, required: true },
  careerConnect: { type: careerConnectSchema, required: true }
});

// Create the model
const Student = model('Student', studentSchema);

export default Student;

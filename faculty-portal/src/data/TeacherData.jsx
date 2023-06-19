export const Teacher = {
    name: "John Doe",
    dob: "01/02/1995",
    doj: "01/02/2020",
    gender: "Male",
    address:"123, ABC Street, XYZ City, 123456",
    email: "example@spit.ac.in",
    phone: "1234567890",
    designation: "Assistant Professor",
    type: "Regular",
    department: "Computer Science and Engineering",
    qualification: "PhD",
    specialization:"Machine Learning, Artificial Intelligence, Image Processing, Computer Vision",
    inchargeOf: "CSE-1A",
    courses: [
        {
            courseName: 'DAA',
            courseType: 'Core',
            lecType: 'Theory',
            class: 'CSE-1A',
            sem: 4,
            lecTarget: 40,
            lecTaken: 38,
            percentTarget: (lecTaken/lecTarget)*100,
            lecPlan: [
            {
                lecNo: 1,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
            {
                lecNo: 2,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
            {
                lecNo: 3,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
            {
                lecNo: 4,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
        ],
        announcement: [
            {
                date: '01/01/2023',
                message: 'Class will be held on 02/01/2023',
            },
            {
                date: '01/02/2023',
                message: 'Class will be held on 02/02/2023',
            },
        ]
        },
        {
            courseName: 'CCN',
            courseType: 'Core',
            lecType: 'Lab',
            class: 'CSE-1A',
            sem: 4,
            lecTarget: 12,
            lecTaken: 11,
            percentTarget: (lecTaken/lecTarget)*100,
            lecPlan: [
            {
                lecNo: 1,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
            {
                lecNo: 2,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
            {
                lecNo: 3,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
            {
                lecNo: 4,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
        ],
        announcement: [
            {
                date: '01/01/2023',
                message: 'Class will be held on 02/01/2023',
            },
            {
                date: '01/02/2023',
                message: 'Class will be held on 02/02/2023',
            },
        ]
        },
        {
            courseName: 'Cloud Computing',
            courseType: 'OE',
            lecType: 'Theory',
            class: 'CSE-1A',
            sem: 6,
            lecTarget: 35,
            lecTaken: 32,
            percentTarget: (lecTaken/lecTarget)*100,
            lecPlan: [
            {
                lecNo: 1,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
            {
                lecNo: 2,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
            {
                lecNo: 3,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
            {
                lecNo: 4,
                topic: 'Introduction',
                suggestedReading: '1.1F',
            },
        ],
        announcement: [
            {
                date: '01/01/2023',
                message: 'Class will be held on 02/01/2023',
            },
            {
                date: '01/02/2023',
                message: 'Class will be held on 02/02/2023',
            },
        ]
        },
    ]
}
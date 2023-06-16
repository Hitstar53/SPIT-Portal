import React from 'react';

export const AppraisalData = {
    name: "John Doe",
    year: "2021",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    // courses: ['DAA', 'OS', 'DBMS'],
    // classes: ['CSE-1A', 'CSE-1B', 'CSE-2C'],
    // sem: [4, 4, 3],
    // lecTarget: [
    //     {
    //         course: 'DAA',
    //         target: String,
    //     }
    // ]
    subjects: [
        {
            course: 'DAA',
            class: 'CSE-1A',
            sem: 4,
            lecTarget: Number,
            lecTaken: Number,
            percentTarget: Number,
            averagePercent: Number,
            percentFeedback: Number,
            menteeFeedback: {
                type: Number(1, 2, 3, 4, 5), 
                default: null
            },
            remedialActivity: String,
            
        }
    ]
}
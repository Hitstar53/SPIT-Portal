import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const ViewHistory = () => {
    const { user } = useContext(UserContext);
    const [history, setHistory] = useState({});

    useEffect(() => {
        const id = window.location.pathname.split('view-history/:')[1];
        console.log(id);
        const fetchData = async () => {
            const endpoint = 'http://localhost:5000/api/faculty/appraisal/getappraisal';
            await axios.post(endpoint, {
                yearofAssesment: id,
                facultyName: user.fullName,
            }).then((response) => {
                console.log(response.data);
                setHistory(response.data);
            });
        }
        fetchData();
    }, [])
    return (
        <div>
            {history.facultyName}

            < table >
                <thead>
                    <tr>
                        <th>Year of Assessment:</th>
                        <th>{history.yearofAssesment}</th>
                        <th>Department</th>
                        <th>{history.department}</th>
                    </tr>
                    <tr>
                        <th>Name of Faculty</th>
                        <th>{history.facultyName}</th>
                        <th>Designation</th>
                        <th>{history.designation}</th>
                    </tr>
                </thead>
            </table >
            {/* ---------------------------------------------------------- */}
            < table >
                <thead>
                    AP1: Courses conducted
                    <tr>
                        <th>Sr. No.</th>
                        <th>Course Name</th>
                        <th>Class</th>
                        <th>Semester</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        history.Dimension1.info.courses.map((course, index) => {
                            <center>
                                return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{course.name}</td>
                                    <td>{course.class}</td>
                                    <td>{course.sem}</td>
                                </tr>
                                )
                            </center>
                        })
                    }
                </tbody>
            </table >
        </div >
    )
}

export default ViewHistory

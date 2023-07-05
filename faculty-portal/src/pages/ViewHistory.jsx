import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../context/UserContext';
const ViewHistory = () => {
    const { user } = useContext(UserContext);
    const [history, setHistory] = useState([]);

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
            {
                history.facultyName
            }
        </div>
    )
}

export default ViewHistory

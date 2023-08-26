import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import '../styles/History.css';
import { API_URL } from '../config';

const History = () => {
    const [history, setHistory] = useState([]);
    const { user } = useContext(UserContext);



    useEffect(() => {
        const fetchHistory = async () => {
            const endpoint = API_URL + '/api/faculty/appraisal/getallappraisal';

            await axios.post(endpoint, {
                facultyName: "Mahesh Patil",
            }).then((response) => {
                setHistory(response.data);
            });
        };
        fetchHistory();
    }, []);

    return (
        <div>
            <h1>Appraisal History</h1>

            <div className="outer">
                {
                    history.map((item) => {
                        return (
                            <div className='assesmentCard' key={item.yearofAssesment}>

                                <div>Year of Assesment: {item.yearofAssesment}</div>
                                <button className='button-3' onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = `/view-history/:${item.yearofAssesment}`;
                                }}> View</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default History;

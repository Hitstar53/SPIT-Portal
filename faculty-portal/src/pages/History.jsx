import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import '../styles/History.css';

const History = () => {
    const [history, setHistory] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log(user);
    }, []

    )

    useEffect(() => {
        const fetchHistory = async () => {
            const endpoint = 'http://localhost:5000/api/faculty/appraisal/getallappraisal';
            // const payload = JSON.parse(localStorage.getItem('user'));
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
            {/* <div className='historyflexbox'>
                {history.map((item) => (
                    <div className='historycard'>
                        {item.yearofAssesment}
                    </div>
                ))}

            </div> */}
            <div className="outer">
                {
                    history.map((item) => {
                        return (
                            <div className='assesmentCard' key={item.yearofAssesment}>
                                {/* <div className='cardtitle'><b>Title: </b>{recipe.title}</div> */}
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

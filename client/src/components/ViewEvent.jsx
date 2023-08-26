import React, { useState, useEffect, useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../config';

const ViewEvent = ({ title, start, end, id, fetchEvents, toggle2 }) => {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    const sdate = new Date(start)
    const startDate = sdate.toLocaleString('en-US', options)
    const edate = new Date(end)
    const endDate = edate.toLocaleString('en-US', options)
    const { user } = useContext(UserContext);

    const handleDelete = async () => {
        await axios.post(API_URL + '/api/faculty/delete/event', { email: user.email, id: id })
            .then(async (res) => {

                toast.success('Event Deleted Successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .then(() => {
                fetchEvents()
                toggle2()
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div className='full-event'>
            <div className='strip'>
                <div>
                    <h3 className='view-title'>{title}</h3>
                </div>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon sx={{ fontSize: "2rem", color: "red" }} />
                </IconButton>
            </div>
            <div className='strip-foot'>
                <p className='view-dates'>Start: {startDate}</p>
                <p className='view-dates'>End: {endDate}</p>
            </div>
            <hr style={{ margin: 0, padding: 0, border: "1px solid black", width: "100%" }} />
        </div>
    );
};

export default ViewEvent;
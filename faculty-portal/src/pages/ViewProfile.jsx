import React from 'react';
import { Box } from '@mui/material';
import '../styles/ViewProfile.css'

const ViewProfile = () => {
    return (
        <div className='full-view'>
            <div className='wrapper'>
                <div className='img-wrapper'>
                    <img src='https://www.w3schools.com/howto/img_avatar.png' alt='profile' />
                </div>
                <div className='info-wrapper'>
                    <h1 className='bigger'>Name : Shubham Ramdas More</h1>
                    <h1 className='big'>Designation : Assistant Professor</h1>
                    <h1 className='big'>Department : Computer Engineering</h1>
                    <h1 className='big'>ID : 2021300079</h1>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default ViewProfile;
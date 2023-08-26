import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import DateCalendar from '../components/DateCalendar';
import '../styles/Home.css';
import { API_URL } from '../config';

const Home = () => {

    return (
        <div className='home-page'>
            <DateCalendar />
        </div>
    );
};

export default Home;
import React from 'react';
import DateCalendar from '../components/DateCalendar';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className='home-page'>
            <DateCalendar />
        </div>
    );
};

export default Home;
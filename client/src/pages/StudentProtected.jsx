import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = (props) => {
    const role = localStorage.getItem('role');
    // if (!props.isLoggedIn) {
    //     return <Navigate to="/" replace />;
    // }
    // if (role !== "Student") {
    //     return <Navigate to="/faculty/home" replace />;
    // }
    return props.children;
};

export default Protected;

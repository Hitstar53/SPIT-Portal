import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = (props) => {
    if (!props.isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return props.children;
};

export default Protected;

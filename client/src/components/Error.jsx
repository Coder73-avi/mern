import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () =>{
    return(
        <>
            <div className="container">
                <h1>WE ARE SORRY, PAGE NOT FOUND</h1>
                <p>The page you are looking for might have been removed 
                    had its name chaged or is temporarily unavailable.
                </p>
                <NavLink to="/" className="btn btn-outline-primary">Go to Home page</NavLink>
            </div>
        </>
    );
}

export default Error;
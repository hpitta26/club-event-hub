import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PropTypes from 'prop-types';

export const EnsureLoggedIn = ({ role = "CheckLoggedIn" }) => {
    const { userContext } = useContext(UserContext);
    if (userContext) {
        if (role === "NotLoggedIn") {
            return <Navigate to="/" />;
        };
    
        const roles = userContext['role'];
        
        if (Array.isArray(roles) && !roles.includes(role)) return <Navigate to="/" />;
    } else {
        if (role === "CheckLoggedIn") {
            return <Navigate to="/login" />;
        };
    };

    return <Outlet />;
};

EnsureLoggedIn.propTypes = {
    role: PropTypes.oneOf(["CLUB", "STUDENT", "CheckLoggedIn", "NotLoggedIn"]),
};
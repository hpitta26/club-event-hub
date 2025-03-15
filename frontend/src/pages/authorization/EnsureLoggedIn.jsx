import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PropTypes from 'prop-types';

export const EnsureLoggedIn = ({ role }) => {
    const { userContext } = useContext(UserContext);

    if (role === "CheckLoggedIn") {
        return <Navigate to="/login" />;
    };

    if (userContext.role !== role) return <Navigate to="/" />;

    return <Outlet />;
};

EnsureLoggedIn.propTypes = {
    role: PropTypes.oneOf(["CLUB", "STUDENT", "CheckLoggedIn"]),
};
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PropTypes from 'prop-types';

export const EnsureLoggedIn = ({ role = "CheckLoggedIn" }) => {
    const { userContext } = useContext(UserContext);

    if (role === "CheckLoggedIn") {
        return <Navigate to="/login" />;
    };

    if (!userContext.role.contains(role)) return <Navigate to="/" />;

>>>>>>> 40b5349 (added protected routes for clubs and students, and made populate command)
    return <Outlet />;
};

EnsureLoggedIn.propTypes = {
<<<<<<< HEAD
    role: PropTypes.oneOf(["CLUB", "STUDENT", "CheckLoggedIn", "NotLoggedIn"]),
=======
    role: PropTypes.oneOf(["CLUB", "STUDENT", "CheckLoggedIn"]),
>>>>>>> 40b5349 (added protected routes for clubs and students, and made populate command)
};
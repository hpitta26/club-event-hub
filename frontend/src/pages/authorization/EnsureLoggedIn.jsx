import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PropTypes from 'prop-types';

export const EnsureLoggedIn = ({ role = "CheckLoggedIn" }) => {
    const { userContext } = useContext(UserContext);

    if (userContext) {
        const roles = userContext['role'];
        console.log(`Roles: ${roles}`);

        if (Array.isArray(roles) && !roles.includes(expRole)) {
            if (roles.includes("STUDENT")) {
                return <Navigate to="/discover" />; // Student accessed forbidden page
            } else {
                return <Navigate to="/analytics" />; // Club accessed forbidden page
            }
        };
    } else { // Not logged in User accessed forbidden page (empty context)
        if (expRole === "CheckLoggedIn") {
            return <Navigate to="/login" />;
        }
        if (expRole !== "NotLoggedIn") {
            return <Navigate to="/login" />;
        }
    };

EnsureLoggedIn.propTypes = {
    role: PropTypes.oneOf(["CLUB", "STUDENT", "CheckLoggedIn", "NotLoggedIn"]),
};
}
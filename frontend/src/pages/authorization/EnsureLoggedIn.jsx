import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PropTypes from 'prop-types';

<<<<<<< HEAD
export const EnsureLoggedIn = ({ expRole = "CheckLoggedIn" }) => {
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

=======
export const EnsureLoggedIn = ({ role }) => {
    const { userContext } = useContext(UserContext);

    if (role === "CheckLoggedIn") {
        return <Navigate to="/login" />;
    };

    if (userContext.role !== role) return <Navigate to="/" />;

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
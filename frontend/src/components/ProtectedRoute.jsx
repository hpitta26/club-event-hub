import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const ProtectedRoute = () => {
    const { userContext } = useContext(UserContext);
    return userContext === null || userContext === undefined ? <Navigate to='/' /> : <Outlet />;
};

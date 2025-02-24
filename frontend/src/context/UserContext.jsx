import { createContext, useState, useEffect } from "react";
import backend from '../components/backend';

function useUserContextState() {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const [userContext, setUserContext] = useState(user_data ? user_data : null);

    function Login(userData) {
        console.log(`Updating user to: ${JSON.stringify(userContext)}`);
        setUserContext(userData);
        localStorage.setItem('user_data', JSON.stringify(userData));
    };
    
    function Logout() {
        console.log(`Logging user out...`);
        localStorage.removeItem('user_data');
        setUserContext(null);
    };

    return [userContext, Login, Logout]
};

export const UserContext = createContext({
	userContext: null,
	Login: () => {},
	Logout: () => {}
});

export const UserProvider = ({ children }) => {
    const [userContext, Login, Logout] = useUserContextState(null);
    
    useEffect(() => {
        if (location.pathname === '/logout') return;
        console.log(`userContext: ${JSON.stringify(userContext)}`);
        const verifySession = async () => {
            const response = await backend.get('/verify-session/');
    
            if (!response?.data?.user ||  Object.keys(response?.data?.user).length === 0) {
                Logout();
            } else {
                Login(response.data.user);
            };
        };
        verifySession();
    }, []);

    return (
        <UserContext.Provider value={{ Login, Logout, userContext }}>
            {children}
        </UserContext.Provider>
    );
};
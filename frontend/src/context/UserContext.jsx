import { createContext, useState, useEffect, useContext } from "react";
import backend from '../components/backend';
import { CsrfContext } from "./CsrfContext";

function useUserContextState() {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const [userContext, setUserContext] = useState(user_data ? user_data : null);
    const { setCachedCsrfToken } = useContext(CsrfContext);

    function Login(userData) {
        setUserContext(userData);
        console.log(`Updating user to: ${JSON.stringify(userData)}`);
        localStorage.setItem('user_data', JSON.stringify(userData));
    };
    
    function Logout() {
        console.log(`Logging user out...`);
        localStorage.removeItem('user_data');
        setUserContext(null);
        setCachedCsrfToken(null);
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
                Logout(); // This is being called everytime the page is refreshed
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
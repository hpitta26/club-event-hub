import { createContext, useState, useEffect } from "react";


function useUserContextState(init) {
    const [userContext, setUserContext] = useState(init);

    function Login(userData) {
        setUserContext(userData);
    };

    function Logout() {
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
        console.log(`Updated user to: ${JSON.stringify(userContext)}`);
    }, [userContext]);


    return (
        <UserContext.Provider value={{ Login, Logout, userContext }}>
            {children}
        </UserContext.Provider>
    );
};
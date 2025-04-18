import { createContext, useState, useEffect } from "react";
import backend from '../components/backend';

function useUserContextState() {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const [userContext, setUserContext] = useState(user_data || null);

    function Login(userData) {
        setUserContext(userData);
        console.log(`Updating user to: ${JSON.stringify(userData)}`);
        localStorage.setItem('user_data', JSON.stringify(userData));
    }

    function Logout() {
        console.log(`Logging user out...`);
        localStorage.removeItem('user_data');
        setUserContext(null);
    }
    
    function updateProfilePic(profile_picture_url) {
        setUserContext(prev => {
            const updated = { ...prev, profile_picture: profile_picture_url };
            localStorage.setItem('user_data', JSON.stringify(updated));
            console.log("✅ Updated userContext:", updated);
            return updated;
          });
    }
    
    function updateBanner(club_banner_url) {
        setUserContext(prev => {
            const updated = { ...prev, banner: club_banner_url };
            localStorage.setItem('user_data', JSON.stringify(updated));
            console.log("✅ Updated userContext:", updated);
            return updated;
          });
    }

    return [userContext, Login, Logout, updateProfilePic, updateBanner];
}


export const UserContext = createContext({
	userContext: null,
	Login: () => {},
	Logout: () => {}
});

export const UserProvider = ({ children }) => {
    const [userContext, Login, Logout, updateProfilePic, updateBanner] = useUserContextState(null);
    
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
        <UserContext.Provider value={{ Login, Logout, userContext, updateProfilePic, updateBanner }}>
            {children}
        </UserContext.Provider>
    );
};
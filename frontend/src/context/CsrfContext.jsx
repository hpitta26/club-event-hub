import { createContext, useState } from "react";
import backend from '../components/backend';

export const CsrfContext = createContext('');

export const CsrfProvider = ({ children }) => {
    const [cachedCsrfToken, setCachedCsrfToken] = useState('');
    const getCsrfToken = async () => {
        try {
            if (cachedCsrfToken) {
                console.log(`Using cached CSRF token: ${cachedCsrfToken}...`);
                return cachedCsrfToken;
            };
            console.log('Fetching CSRF from backend...');
            const response = await backend.get('/csrf-provider/');
            console.log(`CSRF Response: ${response.data.csrfToken}`);
            if (response.status === 200) {
                setCachedCsrfToken(response.data.csrfToken)
                return response.data.csrfToken;
            };
        } catch (e) {
            console.log(`Error fetching CSRF Token!! ${e}`);
        };
    };
    
    console.log('CSRF component loaded');
    return (
        <CsrfContext.Provider value={{getCsrfToken, setCachedCsrfToken}}>
            {children}
        </CsrfContext.Provider>
    );    
};

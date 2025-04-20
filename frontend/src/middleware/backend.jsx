import axios from 'axios';

const backend = axios.create({
    baseURL: 'http://localhost:8000/restapi', 
    withCredentials: true
});

backend.interceptors.request.use(async (config) => {
    try {
        const response = await axios.get("/restapi/csrf-provider/");
        console.log('CSRF Response: ', response);
        if (response.status === 200) {
            config.headers['X-CSRFToken'] = response.data.csrfToken;
        };
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
        return config;
    }, (error) => {
    return Promise.reject(error);
});

export default backend;

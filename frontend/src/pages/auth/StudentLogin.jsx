import { useState, useContext } from 'react';
import backend from '../../components/backend.jsx';
import { UserContext } from '../../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import { CsrfContext } from '../../context/CsrfContext.jsx';


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { Login } = useContext(UserContext);
    const getCsrfToken = useContext(CsrfContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const csrfToken = await getCsrfToken();
            const response = await backend.post('/student-login/',
                formData,
                {
                    headers: {
                        'X-CSRFToken': csrfToken
                    }
                }
            );
            console.log(response);
            if (response.status === 200) {
                console.log('logging user in...');
                Login(response.data);
                navigate('/home');
            } else {
                setError(response.message);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError('Login failed. Please try again.');
        }
    };
    
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section className="min-h-screen bg-stone-900 flex justify-center items-center">
            <div className="grid grid-rows-4 gap-4">
                <h1 className="text-white text-4xl mb-4">Student Login</h1>
                {error && <div className="text-red-500">{error}</div>}
                <input onChange={handleChange} name="email" value={formData.email} placeholder="School Email" className="bg-gray-700 text-white rounded-md ps-4 py-2" />
                <input type="password" onChange={handleChange} name="password" value={formData.password} placeholder="Password" className="bg-gray-700 text-white rounded-md ps-4 py-2" />
                <button type="submit" onClick={handleSubmit} className="bg-blue-600 w-full py-2 text-white rounded-md hover:bg-blue-500">Login</button>
            </div>
        </section>
    );
}

export default Login;

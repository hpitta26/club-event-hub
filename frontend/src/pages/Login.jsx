import { useState, useContext } from 'react';
import backend from '../components/backend.jsx';
import { UserContext } from '../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [formData, setFormData] = useState({
        school_email: '',
        password: ''
    });
    const { Login } = useContext(UserContext);

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/restapi/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.cookie.split('csrftoken=')[1]?.split(';')[0] || ''
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();
            if (data.status === 'success') {
                window.location.href = data.redirect_url; // Redirect to home page
                // console.log('logging user in...')
                // Login({name: 'Kevin Pino'});
                // --> needs to match Student Model in models.py (accessed through data)
            } else {
                setError(data.message);
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
                <h1 className="text-white text-4xl mb-4">Login</h1>
                {error && <div className="text-red-500">{error}</div>}
                <input onChange={handleChange} name="school_email" value={formData.school_email} placeholder="School Email" className="bg-gray-700 text-white rounded-md ps-4 py-2" />
                <input type="password" onChange={handleChange} name="password" value={formData.password} placeholder="Password" className="bg-gray-700 text-white rounded-md ps-4 py-2" />
                <button type="submit" onClick={handleSubmit} className="bg-blue-600 w-full py-2 text-white rounded-md hover:bg-blue-500">Login</button>
            </div>
        </section>
    );
}

export default Login;

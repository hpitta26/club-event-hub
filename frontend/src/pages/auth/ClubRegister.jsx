import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backend from '../../components/backend';

function Register() {
    const [formData, setFormData] = useState({
        club_name: '',
        description: '',
        email: '',
        password1: '',
        password2: '',
        role: 'CLUB'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Debug log
        console.log('Submitting form data:', formData);

        try {
            // Debug log 
            console.log('Making request to:', '/restapi/register/');
            const response = await backend.post('/register/', formData);

            // Debug log
            console.log('Response:', response);

            if (response.status === 200) {
                setSuccess('Registration successful! Please check your email for verification.');
                setFormData({
                    club_name: '',
                    email: '',
                    password1: '',
                    password2: ''
                });
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            // Debug log
            console.error('Error details:', err);
            console.error('Error response:', err.response);

            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                const errorMessage = Object.entries(errors)
                    .map(([key, value]) => `${key}: ${value.join(', ')}`)
                    .join('\n');
                setError(errorMessage);
            } else {
                setError(err.response?.data?.message || 'Registration failed. Please try again.');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        // Debug log
        console.log('Field updated:', name, value);
    };


    // Debug log for render
    console.log('Current form state:', formData);
    

    return (
        <section className='min-h-screen bg-stone-900 flex justify-center items-center pt-10'>
            <form onSubmit={handleSubmit} className='w-96 max-w-full px-4'>
                <div className='space-y-4'>
                    <div>
                        <h1 className='text-white text-4xl mb-4'>Club Register</h1>
                    </div>
                    
                    {error && (
                        <div className='bg-red-500 text-white p-3 rounded-md text-sm whitespace-pre-line'>
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className='bg-green-500 text-white p-3 rounded-md text-sm'>
                            {success}
                        </div>
                    )}

                    <div>
                        <input 
                            onChange={handleChange} 
                            value={formData.club_name}
                            name='club_name' 
                            placeholder='Club Name'
                            required
                            className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full' 
                        />
                    </div>
                    <div>
                        <textarea 
                            onChange={handleChange} 
                            value={formData.description}
                            name='description' 
                            placeholder='Description / Mission Statement'
                            required
                            className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full' 
                        />
                    </div>
                    <div>
                        <input 
                            onChange={handleChange} 
                            value={formData.email}
                            name='email' 
                            type='email'
                            placeholder='Club Email' 
                            required
                            pattern='.+@*\.*'
                            className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full' 
                        />
                    </div>
                    <div>
                        <input 
                            onChange={handleChange} 
                            value={formData.password1}
                            name='password1' 
                            type='password'
                            placeholder='Password' 
                            className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full' 
                        />
                    </div>
                    <div>
                        <input 
                            onChange={handleChange}
                            value={formData.password2} 
                            name='password2' 
                            placeholder='Confirm Password'
                            type='password' 
                            required
                            className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full' 
                        />
                    </div>
                    <div>
                        <button 
                            type='submit'
                            className='bg-blue-600 w-full py-2 text-white hover:bg-blue-500 rounded-md'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default Register;
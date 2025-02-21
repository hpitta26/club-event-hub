import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backend from '../../components/backend';
import { CsrfContext } from '../../context/CsrfContext';

function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password1: '',
        password2: '',
        major: '',
        graduation_year: ''
    });
    const getCsrfToken = useContext(CsrfContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Form validation
        if (!formData.email || !formData.email.endsWith('@fiu.edu')) {
            setError('Please enter a valid FIU email address');
            return;
        }

        // Debug log
        console.log('Submitting form data:', formData);

        try {
            // Debug log
            const csrfToken = await getCsrfToken();
            console.log('Making request to:', '/restapi/register/');
            const response = await backend.post('/student-register/', 
            formData,
            {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });

            // Debug log
            console.log('Response:', response);

            if (response.status === 200) {
                setSuccess('Registration successful! Please check your email for verification.');
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password1: '',
                    password2: '',
                    major: '',
                    graduation_year: ''
                });
                navigate('/student-login');
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
        <section className='min-h-screen bg-stone-900 flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='w-96 max-w-full px-4'>
                <div className='space-y-4'>
                    <div>
                        <h1 className='text-white text-4xl mb-4'>Student Register</h1>
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
                            value={formData.first_name}
                            name='first_name' 
                            placeholder='First Name' 
                            required
                            className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full' 
                        />
                    </div>
                    <div>
                        <input 
                            onChange={handleChange}
                            value={formData.last_name} 
                            name='last_name' 
                            placeholder='Last Name' 
                            required
                            className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full' 
                        />
                    </div>
                    <div>
                        <input 
                            onChange={handleChange} 
                            value={formData.school_email}
                            name='email' 
                            type='email'
                            placeholder='FIU Email (@fiu.edu)' 
                            required
                            pattern='.+@fiu\.edu'
                            className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full' 
                        />
                    </div>
                    <div>
                        <input 
                            onChange={handleChange} 
                            value={formData.major}
                            name='major' 
                            placeholder='Major' 
                            className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full' 
                        />
                    </div>
                    <div>
                        <input 
                            onChange={handleChange} 
                            value={formData.graduation_year}
                            name='graduation_year' 
                            type='number'
                            min="2024"
                            max="2030"
                            placeholder='Graduation Year' 
                            className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full' 
                        />
                    </div>
                    <div>
                        <input 
                            type='password' 
                            onChange={handleChange} 
                            value={formData.password1}
                            name='password1' 
                            placeholder='Password' 
                            required
                            minLength={8}
                            className='bg-gray-700 focus:outline-none text-white rounded-md ps-4 py-2 w-full' 
                        />
                    </div>
                    <div>
                        <input 
                            type='password' 
                            onChange={handleChange} 
                            value={formData.password2}
                            name='password2' 
                            placeholder='Confirm Password' 
                            required
                            minLength={8}
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
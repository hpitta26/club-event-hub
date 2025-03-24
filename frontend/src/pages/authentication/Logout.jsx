<<<<<<< HEAD
import { useContext, useEffect } from 'react';
import backend from '../../components/backend.jsx';
import { UserContext } from '../../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';


function Login() {
    const { Logout } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        backend.get('/logout/');
        Logout();
        setTimeout(() => {
            navigate('/');
        }, 1000);
    }, []);
    
    return (
        <section className="min-h-screen bg-stone-900 flex justify-center items-center pt-10">
            <div>
                <h1 className='text-4xl text-pink-100 hover:text-pink-200'>Successfully logged out!</h1>
            </div>
        </section>
    );
};

export default Login;
=======
import { useContext, useEffect } from 'react';
import backend from '../../components/backend.jsx';
import { UserContext } from '../../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';


function Login() {
    const { Logout } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        backend.get('/logout/');
        Logout();
        setTimeout(() => {
            navigate('/');
        }, 1000);
    }, []);
    
    return (
        <section className="min-h-screen bg-stone-900 flex justify-center items-center pt-10">
            <div>
                <h1 className='text-4xl text-pink-100 hover:text-pink-200'>Successfully logged out!</h1>
            </div>
        </section>
    );
};

export default Login;
>>>>>>> 5a06f19 (adjusted protected route logic)

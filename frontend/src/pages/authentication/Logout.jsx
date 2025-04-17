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
        <section className="min-h-screen flex justify-center items-center pt-10">
            <div>
                <h1 className='text-4xl text-[#FD4EB7] font-bold'>Successfully logged out!</h1>
            </div>
        </section>
    );
};

export default Login;

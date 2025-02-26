import { useContext, useEffect } from 'react';
import backend from '../../components/backend.jsx';
import { UserContext } from '../../context/UserContext.jsx';


function Login() {
    const { Logout } = useContext(UserContext);

    useEffect(() => {
        backend.get('/logout/');
        Logout();
    }, []);
    
    return (
        <section className="min-h-screen bg-stone-900 flex justify-center items-center">
            <div>
                <h1 className='text-4xl text-pink-100 hover:text-pink-200'>Successfully logged out!</h1>
            </div>
        </section>
    );
}

export default Login;

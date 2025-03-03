import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import StudentOrClubModal from '../components/StudentOrClubModal';

function Landing () {
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <section className='min-h-screen bg-stone-900 flex justify-center items-center text-center'>
            <div className='grid grid-rows-2 gap-3'>
                <div>
                    <h1 className='text-white text-5xl'>
                        Welcome to GatherU!
                    </h1>
                </div>
                <div className='grid grid-cols-2 gap-3 text-center'>
                    <button onClick={() => setIsOpen(true)} className='text-2xl bg-emerald-600 py-2 rounded-sm hover:bg-emerald-500 px-5 text-white'>Register</button>
                    <button onClick={() => navigate(`/login`)} className='text-2xl bg-emerald-600 py-2 rounded-sm hover:bg-emerald-500 px-5 text-white'>Login</button>
                </div>
                <StudentOrClubModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
            </div>
        </section>
    );
};


export default Landing;
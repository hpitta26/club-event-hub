import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

function Landing () {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loginRegister, setLoginRegister] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        Modal.setAppElement('#mainSection');
    }, []);

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "#1e1e1e",
            textAlign: "center",
        },
    };

    return (
        <section id="mainSection" className='min-h-screen bg-stone-900 flex justify-center items-center text-center'>
            <div className='grid grid-rows-2 gap-3'>
                <div>
                    <h1 className='text-white text-5xl'>
                        Welcome to GatherU!
                    </h1>
                </div>
                <div className='grid grid-cols-2 gap-3 text-center'>
                    <button onClick={() => {setIsOpen(true);setLoginRegister('register')}} className='text-2xl bg-emerald-600 py-2 rounded-sm hover:bg-emerald-500 px-5 text-white'>Register</button>
                    <button onClick={() => {setIsOpen(true);setLoginRegister('login')}} className='text-2xl bg-emerald-600 py-2 rounded-sm hover:bg-emerald-500 px-5 text-white'>Login</button>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    onRequestClose={() => setIsOpen(false)}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-white text-lg font-semibold">
                            Are you a student or a club?
                        </h2>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition ms-10"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <button onClick={() => {navigate(`/student-${loginRegister}`); setLoginRegister(''); setIsOpen(false)}} className="bg-blue-500 text-white font-medium rounded-md py-2 px-4 hover:bg-blue-600 transition">
                            I am a student!
                        </button>
                        <button onClick={() => {navigate(`/club-${loginRegister}`);setLoginRegister(''); setIsOpen(false)}} className="bg-green-500 text-white font-medium rounded-md py-2 px-4 hover:bg-green-600 transition">
                            I am a club!
                        </button>
                    </div>
                </Modal>
            </div>
        </section>
    );
};


export default Landing;
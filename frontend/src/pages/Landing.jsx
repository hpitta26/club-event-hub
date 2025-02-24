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
            backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "#000000",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            textAlign: "center",
            padding: "24px",
            color: "#F0EFEB"
        },
    };
    
    return (
        <section id="mainSection" className='min-h-screen bg-black flex justify-center items-center text-center'>
            <div className='grid grid-rows-2 gap-5'>
                <div>
                    <h1 className='text-[#F0EFEB] text-5xl font-bold'>
                        Welcome to GatherU!
                    </h1>
                </div>
                <div className='grid grid-cols-2 gap-3 text-center'>
                    <button onClick={() => {setIsOpen(true);setLoginRegister('login')}} className='text-2xl bg-emerald-600 py-2 rounded-sm hover:bg-emerald-500 px-5 text-white'>Login</button>
                    <button onClick={() => {setIsOpen(true);setLoginRegister('register')}} className='text-2xl bg-emerald-600 py-2 rounded-sm hover:bg-emerald-500 px-5 text-white'>Register</button>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    onRequestClose={() => setIsOpen(false)}
                >
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-[#F0EFEB] text-xl font-medium">
                            Are you a student or a club?
                        </h2>
                        <button
                            className="text-[#F0EFEB] px-2 py-1 rounded-full hover:bg-[rgba(255,255,255,0.05)] transition"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <button 
                            onClick={() => {navigate(`/student-${loginRegister}`); setLoginRegister(''); setIsOpen(false)}} 
                            className="bg-transparent border border-[rgba(255,255,255,0.2)] text-[#F0EFEB] font-medium rounded-md py-2 px-4 
                            hover:bg-[rgba(255,255,255,0.05)] hover:text-[#4D9FFD] hover:border-[#4D9FFD] transition duration-300"
                        >
                            I am a student!
                        </button>
                        <button 
                            onClick={() => {navigate(`/club-${loginRegister}`);setLoginRegister(''); setIsOpen(false)}} 
                            className="bg-transparent border border-[rgba(255,255,255,0.2)] text-[#F0EFEB] font-medium rounded-md py-2 px-4 
                            hover:bg-[rgba(255,255,255,0.05)] hover:text-[#FD4EB7] hover:border-[#FD4EB7] transition duration-300"
                        >
                            I am a club!
                        </button>
                    </div>
                </Modal>
            </div>
        </section>
    );
};

export default Landing;
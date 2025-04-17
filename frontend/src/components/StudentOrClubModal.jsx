import { useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const StudentOrClubModal = ({ modalIsOpen, setIsOpen }) => {
    const navigate = useNavigate();

    useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
            backgroundColor: '#FFFAFD',
            border: '1.5px solid black',
            boxShadow: '4px 4px 0px #000000',
        },
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            onRequestClose={() => setIsOpen(false)}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-black">
                    You are joining as:
                </h2>
                <button
                    className="text-gray-400 hover:text-[#FD4EB7] text-2xl font-bold transition-all"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>

            <div className="flex flex-col gap-4">
                <button
                    onClick={() => {
                        navigate('/student-register');
                        setIsOpen(false);
                    }}
                    className="bg-white text-black font-medium text-sm px-4 py-2 rounded-md border-[1.5px] border-black hover:bg-blue-100 transition-all"
                >
                    I'm a student
                </button>

                <button
                    onClick={() => {
                        navigate('/club-register');
                        setIsOpen(false);
                    }}
                    className="bg-white text-black font-medium text-sm px-4 py-2 rounded-md border-[1.5px] border-black hover:bg-purple-100 transition-all"
                >
                    I'm a club
                </button>
            </div>
        </Modal>
    );
};

export default StudentOrClubModal;

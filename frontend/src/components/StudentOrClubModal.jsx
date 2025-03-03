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
                <button onClick={() => {navigate(`/student-register`); setIsOpen(false)}} className="bg-blue-500 text-white font-medium rounded-md py-2 px-4 hover:bg-blue-600 transition">
                    I am a student!
                </button>
                <button onClick={() => {navigate(`/club-register`); setIsOpen(false)}} className="bg-green-500 text-white font-medium rounded-md py-2 px-4 hover:bg-green-600 transition">
                    I am a club!
                </button>
            </div>
        </Modal>
    );
};

export default StudentOrClubModal;

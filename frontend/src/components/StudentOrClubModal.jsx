import { useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import gatherULogo from '../assets/icons/GatherUIcon.png';

const StudentOrClubModal = ({ modalIsOpen, setIsOpen }) => {
    const navigate = useNavigate();

    useEffect(() => {
        Modal.setAppElement('#root');
        
        // Add this effect to prevent scrolling of the background content
        if (modalIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [modalIsOpen]);

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            className="rounded-[20px] border-black border-2 shadow-[2px_2px_0px_#000000] bg-white text-white max-w-md w-full p-6 mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            // Ensure the modal content has a higher z-index
            style={{
                overlay: {
                    zIndex: 1000,
                    backgroundColor: "rgba(0, 0, 0, 0.85)", // Darker overlay for better hiding
                },
                content: {
                    zIndex: 1001,
                }
            }}
        >
            {/* Rest of your modal content remains the same */}
            <div className="flex flex-col items-center mb-4">
                <div className="flex items-center justify-center">
                    <span className="text-2xl font-bold mr-2 text-black">Welcome to</span>
                    <img src={gatherULogo} alt="GatherU Logo" className="h-10" />
                </div>
                <h2 className="text-black text-lg font-semibold mt-2 text-center">
                    Are you a student or a club?
                </h2>
            </div>

            <div className="flex flex-col space-y-4">
                <button onClick={() => {navigate(`/student-register`); setIsOpen(false)}} className="bg-[#FD4EB7] hover:bg-[#E93DA6] text-black py-2 px-4 rounded w-full border-black border-2 shadow-[2px_2px_0px_#000000]">
                    I am a student!
                </button>
                <button onClick={() => {navigate(`/club-register`); setIsOpen(false)}} className="bg-[#4D9FFD] hover:bg-[#288afa] text-black py-2 px-4 rounded w-full flex items-center justify-center border-black border-2 shadow-[2px_2px_0px_#000000]">
                    I am a club!
                </button>
            </div>
        </Modal>
    );
};

export default StudentOrClubModal;
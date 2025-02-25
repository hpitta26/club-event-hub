import React, { useEffect, useState } from "react";
import backend from "../components/backend";
import CallToAction from "../components/CallToAction";
import { CiSearch } from "react-icons/ci";


function FollowingModal({ isOpen, onClose }) {
    const [followingClubs, setFollowingClubs] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState("");
    const getFollowingClubs = () => {
        backend.get("/following-clubs")
            .then((response) => setFollowingClubs(response.data.data))
            .catch((error) => console.log(error));
    }
    const visitClubPage = (clubPK) => {
        window.location.href = `/club/${clubPK}`
        onClose();
    }
    const unfollowClub = async (clubPk) => {
        await backend.delete(`/unfollow-club/${clubPk}/`);
        getFollowingClubs();
    }

    useEffect(() => {
        if (isOpen) getFollowingClubs();
    }, [isOpen]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity">
            <div className="absolute inset-0 bg-black bg-opacity-60" onClick={onClose}></div>

            <div className="relative bg-stone-900 text-white rounded-xl shadow-2xl p-6 max-w-xl w-full mx-4 transform transition-all duration-300 ease-out scale-100">
                <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-200">
                    &times;
                </button>

                <h1 className="text-3xl mb-4 text-center">Your Clubs</h1>

                {followingClubs.length < 1 ? (
                    <div className="text-center">
                        <h2 className="text-white text-xl mb-6">
                            You are not following any clubs
                        </h2>
                        <CallToAction to="/explore" onClick={onClose}>
                            Explore Clubs
                        </CallToAction>
                    </div>
                ) : (
                    <div className="max-h-96 overflow-y-auto">
                        <div className="flex items-center bg-stone-800 rounded-md px-3 py-2 mb-4">
                            <CiSearch />
                            <input type="text" placeholder="Search clubs..." className="bg-transparent focus:outline-none text-gray-200 w-full" onChange={(e) => setSearchCriteria(e.target.value)} />
                        </div>
                        {followingClubs.filter(club => club.name.toLowerCase().startsWith(searchCriteria.toLowerCase())).map(club => (
                            <div key={club.id} className=" flex items-center justify-between px-4 py-3 border-b border-stone-700 hover:bg-stone-800" onClick={() => visitClubPage(club.id)}>
                                <div className="flex items-center space-x-3">
                                    <span className="font-medium text-white">{club.name}</span>
                                </div>
                                <CallToAction className="bg-red-600 hover:bg-red-500" onClick={(e) => { e.stopPropagation(); unfollowClub(club.id) }}>
                                    Unfollow
                                </CallToAction>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FollowingModal;
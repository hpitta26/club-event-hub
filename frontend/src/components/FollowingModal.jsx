import React, { useEffect, useState, useContext } from "react";
import backend from "../components/backend";
import CallToAction from "../components/CallToAction";
import { CiSearch } from "react-icons/ci";

function FollowingModal({ isOpen, onClose }) {
  const [followingClubs, setFollowingClubs] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("");

  const getFollowingClubs = () => {
    backend
      .get("/following-clubs")
      .then((response) => setFollowingClubs(response.data.data))
      .catch((error) => console.log(error));
  };

  const visitClubPage = (clubSlug) => {
    window.location.href = `/club/${clubSlug}/`;
    onClose();
  };

  const unfollowClub = async (clubPk) => {
    try {
      await backend.delete(`/unfollow-club/${clubPk}/`);
      getFollowingClubs();
    } catch (err) {
      console.error("Unfollow club error:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getFollowingClubs();
    }
  }, [isOpen]);

  // If modal isn't open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-stone-900 text-[#F0EFEB] rounded-xl shadow-2xl p-6 max-w-xl w-full mx-4 transform transition-all duration-300 ease-out scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-200 transition-all duration-300 ease-out transform hover:scale-110"
        >
          &times;
        </button>

        <h1 className="text-3xl mb-4 text-center transition-all duration-300 ease-out">
          Your Clubs
        </h1>

        {/* If no clubs followed */}
        {followingClubs.length < 1 ? (
          <div className="text-center">
            <h2 className="text-xl mb-6">You are not following any clubs</h2>
            <CallToAction
              to="/explore"
              onClick={onClose}
              className="transition-all duration-300 ease-out transform hover:scale-105"
            >
              Explore Clubs
            </CallToAction>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {/* Search Bar */}
            <div className="flex items-center bg-stone-800 rounded-md px-3 py-2 mb-4 transition-all duration-300 ease-out">
              <CiSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search clubs..."
                className="bg-transparent focus:outline-none text-gray-200 w-full ml-2"
                onChange={(e) => setSearchCriteria(e.target.value)}
              />
            </div>

            {/* Club List */}
            {followingClubs
              .filter((club) =>
                club.club_name
                  .toLowerCase()
                  .startsWith(searchCriteria.toLowerCase())
              )
              .map((club) => (
                <div
                  key={club.user_id}
                  className="flex items-center justify-between px-4 py-3 border-b border-stone-700 hover:bg-stone-800 transition-all duration-300 ease-out transform"
                  onClick={() => visitClubPage(club.slug)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{club.club_name}</span>
                  </div>
                  <CallToAction
                    className="bg-red-600 hover:bg-red-500 transition-all duration-300 ease-out transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      unfollowClub(club.user_id);
                    }}
                  >
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

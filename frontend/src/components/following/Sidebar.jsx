import React, { useState, useEffect } from "react";
import ClubCard from "../discover/ClubCard.jsx";
import FollowingClubCard from "../following/FollowingClubCard.jsx";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg"; // Fallback image
import backend from "../backend";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [followedClubs, setFollowedClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch clubs the user is following
    backend.get('following-clubs/')
      .then(response => {
        if (response.data.status === 'success') {
          // Transform the data to match the expected format
          const clubs = response.data.data.map(club => ({
            id: club.user_id,
            name: club.club_name,
            imageUrl: dummyEventCardCover, // Using dummy image as fallback
            description: club.description
          }));
          setFollowedClubs(clubs);
        } else {
          console.error("Failed to fetch following clubs");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching clubs:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        className={`fixed z-50 lg:hidden bg-gray-800 text-white p-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-700
        ${isOpen ? "top-8 left-56" : "top-10 left-0"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoMdArrowBack size={8} /> : <IoMdArrowForward size={8} />}
      </button>
      
      {/* Sidebar - Main Container */}
      <aside
        className={`fixed top-6 left-4 w-64 bg-gray text-black transition-transform duration-300 z-40 mt-5
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:fixed h-[calc(100vh-80px)]`}
      >
        {/* Sidebar Content - Scrollable */}
        <div className="p-6 h-full overflow-y-auto">
          {/* Followed Clubs Section */}
          <h2 className="font-semibold text-lg text-black-300 mb-3 tracking-wide">
            Following
          </h2>
          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-gray-600">Loading clubs...</p>
            ) : followedClubs.length > 0 ? (
              followedClubs.map((club) => (
                <ClubCard 
                  key={club.id} 
                  name={club.name} 
                  imageUrl={club.imageUrl} 
                />
              ))
            ) : (
              <p className="text-sm text-gray-600">You're not following any clubs yet</p>
            )}
          </div>
          
          {/* Discover more clubs button */}

        </div>
      </aside>
      
      {/* Overlay (for mobile when sidebar is open) */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
import React, { useState, useEffect } from "react";
import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg"; // Fallback image
import backend from "../backend";
import SidebarCard from "../discover/SidebarCard.jsx";

const Sidebar = () => {
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

  if (loading) {  
    return (
      <></>
    )
  } else {
    return (
      <div className="p-4 flex flex-col items-center">
        {/* Following Clubs */}
        <div>
          <h2 className="font-semibold text-lg text-black-300 mb-3 tracking-wide self-start">
            Following
          </h2>
          <div className="space-y-3">
            {followedClubs.map((club) => (
              <SidebarCard 
                key={club.id} 
                name={club.name} 
                image={club.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Sidebar;
import React, { useState, useEffect } from "react";
import dummyInitLogo from "../../../assets/dummyInitLogo.png";
import backend from "../../../middleware/backend.jsx";
import SidebarCard from "../discover/SidebarCard.jsx";

const FollowingSidebar = () => {
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
            imageUrl: dummyInitLogo, // Using dummy image as fallback
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
      <div className="absolute w-[278px] h-[calc(100vh-80px)] top-[80px] left-0 bg-[#4D9FFD] border border-black shadow-[4px_4px_0px_#000000] p-4">
      {/* New Events Section */}
      <div className="flex flex-col items-center">
        <div>
          <h2 className="font-medium text-xl leading-[31px] text-black mb-2">Following</h2>
          <div className="flex flex-col gap-2">
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
    </div>
    );
  }
};

export default FollowingSidebar;
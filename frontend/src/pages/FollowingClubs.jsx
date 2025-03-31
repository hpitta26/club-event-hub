import React, { useState, useEffect } from "react";
import Sidebar from "../components/following/Sidebar.jsx";
import EventGrid from "../components/discover/EventGrid";
import backend from "../components/backend";

const FollowingClubs = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events for this week
    backend.get('get-week-events/')
      .then(response => {
        if (response.data.status === 'success') {
          setAllEvents(response.data.data);
        } else {
          console.error("Failed to fetch events");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const filteredEvents = allEvents;

  if (loading) {
    return (
      <></>
    );
  } else {
    return (
      <div className="max-w-[1400px] mx-auto pt-10">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 mt-[86px] hidden lg:block">
            <Sidebar />
          </div>
  
          {/* Main Content */}
          <div className="flex-1">
            {/* Title and Filters */}
            <div className="pt-6 px-6">
              <h1 className="text-2xl font-bold mb-4">Your Club Feed</h1>
            </div>
            {/* Event Grid */}
            <div className="overflow-y-auto h-[calc(100vh-150px)] p-6">
              <EventGrid events={filteredEvents} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  
};

export default FollowingClubs;
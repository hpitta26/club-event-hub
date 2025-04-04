import React, { useState, useEffect } from "react";
import Sidebar from "../components/following/sidebar.jsx";
import NewSidebar from "../components/following/NewSidebar.jsx";
import EventGrid from "../components/discover/EventGrid";
import backend from "../components/backend";
import { useSidebar } from "../context/SidebarContext";

const NewFollowing = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isSidebarOpen } = useSidebar();

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
        <div className="max-w-[1400px] mx-auto h-[calc(100vh)]">
        <div className="flex h-full">
          {/* Sidebar */}
          {isSidebarOpen && (
            <div className="w-1/4 hidden lg:block">
              <NewSidebar />
            </div>
          )}
  
          {/* Main Content Wrapper */}
          <div
            className={`${
              isSidebarOpen
                ? "flex-1 ml-0" // Sidebar is open, main content takes remaining space
                : "w-[75%] mx-auto" // Sidebar is closed, main content is centered
            }`}
          >
            <div className="pt-[80px] h-full flex flex-col">
              {/* Title and Filters */}
              <div className="pt-6 px-6">
                <h1 className="text-2xl font-bold mb-4">Your Club Feed</h1>
              </div>
              {/* Event Grid */}
              <div className="overflow-y-auto flex-1 p-6">
                <EventGrid events={filteredEvents} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
};

export default NewFollowing;
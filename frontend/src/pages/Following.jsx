import React, { useState, useEffect } from "react";
import FollowingSidebar from "../components/following/FollowingSidebar.jsx";
import EventGrid from "../components/discover/EventGrid.jsx";
import backend from "../components/backend.jsx";
import { useSidebar } from "../context/SidebarContext.jsx";

const Following = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isSidebarOpen, isMobileSidebarOpen, toggleMobileSidebar } = useSidebar();

  useEffect(() => {
    backend.get('get-following-clubs-events/')
      .then(response => {
        if (response.status === 200) {
          setAllEvents(response.data);
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  } else {
    return (
      <div className="max-w-[1400px] mx-auto min-h-screen">
        <div className="flex flex-col h-full">
          {/* Desktop Sidebar */}
          {isSidebarOpen && (
            <div className="w-1/4 hidden lg:block">
              <FollowingSidebar />
            </div>
          )}
          
          {/* Mobile Sidebar Toggle Button */}
          <div className="fixed bottom-4 right-4 z-40 lg:hidden">
            <button 
              className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
              onClick={toggleMobileSidebar}
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Sidebar Content - This will be rendered inside the SidebarContext overlay */}
          {isMobileSidebarOpen && (
            <div className="lg:hidden">
              <FollowingSidebar />
            </div>
          )}

          {/* Main Content Wrapper */}
          <div
            className={`w-full ${
              isSidebarOpen
                ? "lg:w-3/4 lg:ml-auto" // Sidebar is open on desktop
                : "w-full lg:w-3/4 lg:mx-auto" // Sidebar is closed
            }`}
          >
            <div className="pt-[60px] lg:pt-[80px] h-full flex flex-col">
              {/* Title and Filters */}
              <div className="pt-4 lg:pt-6 px-4 lg:px-6">
                <h1 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">Your Club Feed</h1>
              </div>
              {/* Event Grid */}
              <div className="overflow-y-auto flex-1 p-3 lg:p-6">
                <EventGrid events={filteredEvents} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Following;
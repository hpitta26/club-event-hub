import React, { useState, useEffect } from "react";
import FollowingSidebar from "../../components/student/following/FollowingSidebar.jsx";
import EventGrid from "../../components/student/discover/EventGrid.jsx";
import backend from "../../middleware/backend.jsx";
import { useSidebar } from "../../context/SidebarContext.jsx";

const Following = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isSidebarOpen } = useSidebar();

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

  useEffect(() => {
      // Listen for RSVP changes from EventModal
      const handleRsvpChange = (event) => {
        const { eventId, isRsvped } = event.detail;
        console.log(event.detail)
        handleRsvpUpdate(eventId, isRsvped);
        console.log(event.detail)
        console.log(`${eventId} has been set to ${isRsvped}`);
      };

      window.addEventListener('rsvpChange', handleRsvpChange);
      // Clean up
      return () => {
        window.removeEventListener('rsvpChange', handleRsvpChange);
      };
    }, []);

    // New function to handle RSVP updates across components
  const handleRsvpUpdate = (eventId,isRsvped) =>{
      setAllEvents(prev => prev.map(event=>
          event.id === eventId?{...event,is_rsvped:isRsvped,attending:isRsvped?event.attending+1 : event.attending-1} : event
      ))
  }

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
            <div className="w-[300px] hidden lg:block">
              <FollowingSidebar />
            </div>
          )}
  
          {/* Main Content Wrapper */}
          <div
            className={`${
              isSidebarOpen
                ? "flex-1 ml-0"
                : "w-[75%] mx-auto"
            }`}
          >
            <div className="pt-[80px] h-full flex flex-col">
              {/* Title */}
              <div className="pt-6 px-6 pl-10">
                <h1 className="text-2xl font-bold mb-4">Your Club Feed</h1>
              </div>
              {/* Event Grid */}
              <div className="overflow-y-auto flex-1 p-6 px-10 pr-14">
                <EventGrid events={filteredEvents} onRsvpUpdate={handleRsvpUpdate}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
};

export default Following;

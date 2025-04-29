import { useState, useMemo, useEffect } from 'react';
import EventModalUpcomingList from "./EventModalUpcomingList";
import { FiChevronsRight } from "react-icons/fi";

function EventModal({ events = { upcoming: [], past: [] }, onClose }) {
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 300); 
  };
  
  // Detect mobile screen on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Check initially
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Cache the event list to avoid unnecessary re-renders
  const eventList = useMemo(() => {
    return isUpcoming ? events.upcoming : events.past;
  }, [events.upcoming, events.past, isUpcoming]);

  return (
    <div className="fixed top-0 right-0 z-50 h-screen w-full flex items-start justify-end p-2 sm:p-4">
      <div 
        className={`container bg-white flex flex-col bg-[#F0EFEB] p-3 sm:p-4 gap-3 sm:gap-4 
          ${isMobile ? 'w-full' : 'w-96'} 
          h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] 
          overflow-y-hidden rounded-lg border-black border-2 shadow-[3px_3px_0px_#000000]
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header section with title and close button */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-black -mx-3 sm:-mx-4 px-3 sm:px-4 w-[calc(100%+1.5rem)] sm:w-[calc(100%+2rem)]">
          <h1 className="text-lg sm:text-xl font-bold">Your Events</h1>
          <div>
            <FiChevronsRight 
              className="cursor-pointer text-lg h-7 sm:h-8 w-auto border-2 border-black rounded-lg hover:shadow-[2px_2px_0_#000] transition-all duration-200" 
              onClick={handleClose} 
            />
          </div>
        </div>
        
        {/* Toggle buttons for upcoming/past */}
        <div className="relative flex items-center justify-center bg-[#eedeff] rounded-md p-[3px] mt-1 sm:mt-2 mb-2 sm:mb-3 self-center">
          <div className="relative flex text-center rounded-md w-40 sm:w-44 font-semibold text-xs sm:text-sm">
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-white rounded-md transition-transform duration-200 bg-[#b17ee6]`}
              style={{
                transform: isUpcoming ? "translateX(0%)" : "translateX(100%)",
              }}
            ></div>
            <button
              onClick={() => setIsUpcoming(true)}
              className={`w-1/2 py-1 sm:py-1.5 rounded-md z-10 ${isUpcoming ? "text-black font-bold" : "text-gray-600"}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setIsUpcoming(false)}
              className={`w-1/2 py-1 sm:py-1.5 rounded-md z-10 ${isUpcoming ? "text-gray-600" : "text-black font-bold"}`}
            >
              Past
            </button>
          </div>
        </div>
        
        {/* Event list */}
        <div className="flex-1 overflow-hidden">
          <EventModalUpcomingList events={eventList} upcoming={isUpcoming} />
        </div>
      </div>
    </div>
  );
}

export default EventModal;
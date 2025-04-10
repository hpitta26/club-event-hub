import { useEffect, useState } from 'react';
import EventModalCard from "./EventModalCard";

{/* Custom Scroll Bar Styling */}
const customScrollbarStyle = {
  scrollbarWidth: "none",  
  scrollSnapType: "proximity",
  scrollBehavior: "smooth",
  overflowY: "scroll",
  msOverflowStyle: "none",  
};

function EventModalUpcomingList({ events = [] }) {
  const [currentRSVPS, setCurrentRSVPS] = useState([]);

  useEffect(() => {
    setCurrentRSVPS(events);
  }, [events]);

  return (
    <div className="w-full h-full rounded-md" style={customScrollbarStyle}>
      <div className="flex flex-col gap-3">
        {/* Making a card for every RSVP */}
        {currentRSVPS.map((event, index) => (
          <div key={index}>
            <EventModalCard title={event.title} date={event.start_time} host={event.host} image={event.hostLogo} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventModalUpcomingList;

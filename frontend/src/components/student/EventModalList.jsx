import EventModalCard from "./EventModalCard";
import {useEffect, useState} from "react";

const customScrollbarStyle = {
  scrollbarWidth: "none",  
  scrollSnapType: "proximity",
  scrollBehavior: "smooth",
  overflowY: "scroll",
  msOverflowStyle: "none",  
};

function EventModalUpcomingList({ events = [], upcoming = false,onRemoveEvent }) {

const [modalEvents, setModalEvents] = useState(events)

  useEffect(() => {
    setModalEvents(events);
  }, [events]);

  return (
    <div className="w-full h-full rounded-md pr-1 pb-2" style={customScrollbarStyle}>
      <div className="flex flex-col gap-3">
        {modalEvents.map((modalEvent, index) => (
          <div key={index}>
            <EventModalCard title={modalEvent.title} date={modalEvent.start_time} host={modalEvent.host} profilebanner={modalEvent.profilebanner} upcoming={upcoming} onClose={() => onRemoveEvent(modalEvent)}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventModalUpcomingList;

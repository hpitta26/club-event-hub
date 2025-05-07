import EventModalCard from "./EventModalCard";
import {useEffect, useState} from "react";
import backend from "../../middleware/backend.jsx";

const customScrollbarStyle = {
  scrollbarWidth: "none",  
  scrollSnapType: "proximity",
  scrollBehavior: "smooth",
  overflowY: "scroll",
  msOverflowStyle: "none",  
};

function EventModalUpcomingList({ events = [], upcoming = false }) {

const [modalEvents, setModalEvents] = useState(events)

  useEffect(() => {
    setModalEvents(events);
  }, [events]);

 const handleUnRSVP = async (removedEvent) => {
   try {
     const response = await backend.post('/rsvp/', { event_id: removedEvent.id });
     console.log(response.data)
     setModalEvents(prevEvents =>
         prevEvents.filter(event => event.id !== removedEvent.id)
     );
   }
   catch (err){
     console.log(err)
   }
};

  return (
    <div className="w-full h-full rounded-md pr-1 pb-2" style={customScrollbarStyle}>
      <div className="flex flex-col gap-3">
        {modalEvents.map((modalEvent, index) => (
          <div key={index}>
            <EventModalCard title={modalEvent.title} date={modalEvent.start_time} host={modalEvent.host} profilebanner={modalEvent.profilebanner} upcoming={upcoming} onClose={() => handleUnRSVP(modalEvent)}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventModalUpcomingList;

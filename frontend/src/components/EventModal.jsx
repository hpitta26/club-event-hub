import { useState, useEffect } from 'react';
import EventModalUpcomingList from "./EventModalUpcomingList";
import { FiChevronsRight } from "react-icons/fi";

function EventModal({ events = {upcoming: [], past: []}, onClose }) {
	const [isUpcoming, setIsUpcoming] = useState(true);
	const [eventList, setEventList] = useState([]);
	useEffect(() => {
		setEventList(isUpcoming ? events.upcoming : events.past);
	}, [events, isUpcoming]);
  return (
    <div className="fixed top-0 right-0 z-50 h-screen flex items-start justify-end p-4">
      <div className="container flex flex-col bg-neutral-400 p-4 gap-5 w-96 shadow-lg h-[calc(100vh-2rem)] overflow-y-hidden">
        <div>
          <FiChevronsRight className="cursor-pointer text-lg" onClick={() => onClose()} />
          <p className="text-2xl font-bold mt-5 mb-1">Your Events</p>
        </div>
	<div className="flex bg-neutral-500 text-center">
		<div className={`${isUpcoming ? 'bg-neutral-600' : ''} w-full hover:bg-neutral-600 py-2 rounded-md`}>
	  		<button onClick={() => setIsUpcoming(true)} className="w-full text-sm">Upcoming Events</button>
	  	</div>
	  	<div className={`${isUpcoming ? '' : 'bg-neutral-600'} w-full hover:bg-neutral-600 py-2 rounded-md`}>
	  		<button onClick={() => setIsUpcoming(false)} className="text-sm w-full">Past Events</button>
	  	</div>
	</div>
        <EventModalUpcomingList events={eventList} upcoming={isUpcoming} />
      </div>
    </div>
  );
}

export default EventModal;

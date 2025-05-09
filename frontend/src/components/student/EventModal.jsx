import {useState, useMemo, useEffect} from 'react';
import EventModalUpcomingList from "./EventModalList";
import { FiChevronsRight } from "react-icons/fi";
import backend from "../../middleware/backend.jsx";

function EventModal({ events = { upcoming: [], past: [] }, onClose }) {
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    setUpcomingEvents(events.upcoming || []);
    setPastEvents(events.past || []);
  }, [events]);

    const handleUnRSVP = async (removedEvent) => {
      try {
        const response = await backend.post('/rsvp/', { event_id: removedEvent.id });

        // Update the appropriate events list
        if (isUpcoming) {
          setUpcomingEvents(prev => prev.filter(event => event.id !== removedEvent.id));
        } else {
          setPastEvents(prev => prev.filter(event => event.id !== removedEvent.id));
        }

        // Dispatch a custom event to notify the app about the RSVP change
        // This provides a way to communicate between disconnected components
        const rsvpChangeEvent = new CustomEvent('rsvpChange', {
          detail: { eventId: removedEvent.id, isRsvped: false }
        });
        console.log("Dispatching rsvpChange event:", rsvpChangeEvent.detail);
        window.dispatchEvent(rsvpChangeEvent);

      } catch (err) {
        console.error('Error updating RSVP:', err);
      }
  };

  // Determine which events to display based on current tab
  const displayedEvents = isUpcoming ? upcomingEvents : pastEvents;

  return (
    <div className="fixed top-0 right-0 z-50 h-screen flex items-start justify-end p-4">
      <div className="container flex flex-col bg-[#F0EFEB] p-4 gap-5 w-96 h-[calc(100vh-2rem)] overflow-y-hidden rounded-lg border-black border-2 shadow-[3px_3px_0px_#000000]">
        <div className="flex items-center justify-between">
          <div>
            <FiChevronsRight className="cursor-pointer text-lg" onClick={() => onClose()} />
            <p className="text-2xl font-bold my-3">Your Events</p>
          </div>
          <div className="relative flex items-center justify-center bg-neutral-300 rounded-md p-[3px]">
            <div className="relative flex text-center rounded-md w-44 font-semibold text-sm">
              <div
                className={`absolute top-0 left-0 h-full w-1/2 bg-white rounded-md transition-transform duration-200`}
                style={{
                  transform: isUpcoming ? "translateX(0%)" : "translateX(100%)",
                }}
              ></div>
              <button
                onClick={() => setIsUpcoming(true)}
                className={`w-1/2 py-2 rounded-md z-10 ${isUpcoming ? "text-black font-bold" : "text-gray-600"}`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setIsUpcoming(false)}
                className={`w-1/2 py-2 rounded-md z-10 ${isUpcoming ? "text-gray-600" : "text-black font-bold"}`}
              >
                Past
              </button>
            </div>
          </div>
        </div>
        <EventModalUpcomingList events={displayedEvents} upcoming={isUpcoming}           onRemoveEvent={handleUnRSVP}
/>
      </div>
    </div>
  );
}

export default EventModal;

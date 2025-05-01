import { useState, useMemo } from "react";
import EventModalUpcomingList from "./EventModalUpcomingList";
import { FiChevronsRight } from "react-icons/fi";

function EventModal({
  sidebarRef,
  isOpen = false,
  events = { upcoming: [], past: [] },
  onClose,
}) {
  const [isUpcoming, setIsUpcoming] = useState(true);

  // Cache the event list to avoid unnecessary re-renders
  const eventList = useMemo(() => {
    return isUpcoming ? events.upcoming : events.past;
  }, [events.upcoming, events.past, isUpcoming]);

  const handleEventClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${!isOpen && "pointer-events-none invisible"}`}
      onClick={onClose}
    >
      {/* Event Modal */}
      <div className="fixed top-0 right-0 z-[100] h-screen flex items-start justify-end p-4">
        <div
          ref={sidebarRef}
          className={`container z-[110] flex flex-col bg-[#F0EFEB] p-4 gap-5 w-96 h-[calc(100vh-2rem)] overflow-y-hidden rounded-lg border-black border-2 shadow-[3px_3px_0px_#000000] transform transition-all duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={handleEventClick}
        >
          <div className="flex items-center justify-between">
            <div>
              <FiChevronsRight
                className="cursor-pointer text-lg"
                onClick={() => onClose()}
              />
              <p className="text-2xl font-bold my-3">Your Events</p>
            </div>
            <div className="relative flex items-center justify-center bg-neutral-300 rounded-md p-[3px]">
              <div className="relative flex text-center rounded-md w-44 font-semibold text-sm">
                <div
                  className={`absolute top-0 left-0 h-full w-1/2 bg-white rounded-md transition-transform duration-200`}
                  style={{
                    transform: isUpcoming
                      ? "translateX(0%)"
                      : "translateX(100%)",
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
          <EventModalUpcomingList events={eventList} upcoming={isUpcoming} />
        </div>
      </div>
    </div>
  );
}

export default EventModal;

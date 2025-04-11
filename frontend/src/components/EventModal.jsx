import EventModalUpcomingList from "./EventModalUpcomingList";
import { FiChevronsRight } from "react-icons/fi";

function EventModal({ events, onClose }) {
  return (
    <div className="fixed top-0 right-0 z-50 h-screen flex items-start justify-end p-4">
      <div className="container flex flex-col items-start justify-start bg-[#F0EFEB] p-4 gap-5 w-96 h-[calc(100vh-2rem)] overflow-y-hidden rounded-lg border-black border-2 shadow-[3px_3px_0px_#000000]">
        <div>
          {/* Icon Button */}
          <FiChevronsRight className="cursor-pointer text-lg" onClick={() => onClose()} />
          <p className="text-2xl font-bold my-3">Your Events</p>
        </div>
        {/* Card List */}
        <EventModalUpcomingList events={events} />
      </div>
    </div>
  );
}

export default EventModal;

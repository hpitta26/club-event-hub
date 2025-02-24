import EventSidebarCardList from "./EventSidebarCardList";
import { FiChevronsRight } from "react-icons/fi";

function EventSidebar({ onClose }) {
  return (
    <div className="fixed top-0 right-0 z-40 h-screen flex items-start justify-end p-4">
      <div className="container flex flex-col items-start justify-start bg-neutral-400 max-w-md p-4 gap-5 w-96 shadow-lg  h-[calc(100vh-2rem)] overflow-y-hidden">
        <div>
          {/* Icon Button */}
          <FiChevronsRight
            className="cursor-pointer text-lg"
            onClick={() => onClose()}
          />
          <p className="text-2xl font-bold mb-3">Your Events</p>
        </div>
        {/* Card List */}
        <EventSidebarCardList/>
      </div>
    </div>
  );
}

export default EventSidebar;

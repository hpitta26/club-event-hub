import React from "react";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import EventDetailsCard from "../components/EventDetailsCard";

// Temporary Page to visualize the EventCard component.
// http://localhost:5173/temp
function TempPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-950 p-10 min-h-screen pt-10">
      <EventDetailsCard />
    </div>
  );
}

export default TempPage;

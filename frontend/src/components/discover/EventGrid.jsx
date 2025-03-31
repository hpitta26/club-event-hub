import React from "react";
import EventCard from "../EventCard";
import NewEventCard from "../newEventCard";

const EventGrid = ({ events }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7">
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="flex">
            <NewEventCard
              title={event.title}
              date={event.start_time}
              host={event.club.club_name}
              location={event.location}
              attendees={event.rsvps.length}
              capacity={event.capacity}
              coverImage={event.coverImage}
              hostLogo={event.hostLogo}
              id={event.id}
              description={event.description}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No events available.
        </p>
      )}
    </div>
  );
};

export default EventGrid;

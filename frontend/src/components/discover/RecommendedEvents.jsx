import React from "react";
import EventCard from "../EventCard.jsx";

const RecommendedEvents = ({ events }) => {
  return (
      <div>
          <h1 className="text-lg font-bold mb-4">Recommended Events</h1>
          <div className="flex overflow-x-auto gap-x-4 h-72 snap-x">
              {events.map((event) => (
              <div key={event.id} className="snap-start pt-1">
                  <EventCard
                      id={event.id}
                      title={event.title}
                      description={event.description}
                      date={event.start_time}
                      host={event.host}
                      location={event.location}
                      attendees={event.attending}
                      capacity={event.capacity - event.attending}
                      tags={event.tags}
                      // coverImage={event.coverImage}
                      // hostLogo={event.hostLogo}
                      is_rsvped={event.is_rsvped}
                  />
              </div>
              )
              )}
          </div>
      </div>
  );
};

export default RecommendedEvents;

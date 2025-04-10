import React from "react";
import NewEventCard from "../newEventCard";

const RecommendedEvents = ({ events }) => {
  return (
      <div className="flex overflow-x-auto gap-x-5 ">
          {events.length > 0 &&
              events.map((event) => (
                      <div key={event.id}>
                          <NewEventCard
                              id={event.id}
                              title={event.title}
                              description={event.description}
                              date={event.start_time}
                              host={event.host}
                              location={event.location}
                              attendees={event.attending}
                              capacity={event.capacity - event.attending}
                              // coverImage={event.coverImage}
                              // hostLogo={event.hostLogo}
                              is_rsvped={event.is_rsvped}
                          />
                      </div>
                  )
              )}
      </div>

  );
};

export default RecommendedEvents;

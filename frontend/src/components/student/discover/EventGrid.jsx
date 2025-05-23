import React from "react";
import EventCard from "../EventCard";
import PropTypes from 'prop-types';

const EventGrid = ({ events,onRsvpUpdate }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7">
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="flex">
            <EventCard
              id={event.id}
              title={event.title}
              description={event.description}
              date={event.start_time}
              host={event.host}
              location={event.location}
              attendees={event.attending}
              capacity={event.capacity - event.attending}
              profilebanner={event.profilebanner}
              tags={event.tags}
              // coverImage={event.coverImage}
              // hostLogo={event.hostLogo}
              is_rsvped={event.is_rsvped}
              onRsvpUpdate={onRsvpUpdate}
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

EventGrid.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            start_time: PropTypes.string.isRequired,
            host: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            attending: PropTypes.number.isRequired,
            capacity: PropTypes.number.isRequired,
            coverImage: PropTypes.string.isRequired,
            hostLogo: PropTypes.string.isRequired,
            is_rsvped: PropTypes.bool.isRequired
        })
    ).isRequired,
};

import React from "react";
import EventCard from "../EventCard";
const EventGrid = ({ events }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {events.length > 0 ? (
                events.map((event) => (
                    <div key={event.id} className="flex">
                        <EventCard
                            title={event.name}
                            date={event.date}
                            host={event.host}
                            location={event.location}
                            attendees={event.attendees}
                            capacity={event.capacity}
                            coverImage={event.coverImage}
                            hostLogo={event.hostLogo}
                        />
                    </div>
                ))
            ) : (
                <p className="text-gray-500 col-span-full text-center">No events available.</p>
            )}
        </div>
    );
};

export default EventGrid;

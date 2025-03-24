// import { useEffect, useState } from "react";
// import backend from "../components/backend";
// import EventCard from "../components/EventCard";

// function ClubEvents() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("upcoming"); // "upcoming" or "past"

//   useEffect(() => {
//     async function fetchEvents() {
//       try {
//         const response = await backend.get("/events/");
//         setEvents(response.data);
//         console.log("Fetched Events:", response.data); // Debugging fetched events
//       } catch (err) {
//         console.error("Error fetching events:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchEvents();
//   }, []);

//   // Filter upcoming or past events based on current date
//   const currentDate = new Date();
//   const filteredEvents = events.filter((event) => {
//     const eventDate = new Date(event.start_time);
//     return filter === "upcoming" ? eventDate >= currentDate : eventDate < currentDate;
//   });

//   // Group filtered events by date
//   const groupedEvents = filteredEvents.reduce((acc, event) => {
//     const eventDate = new Date(event.start_time).toDateString();
//     if (!acc[eventDate]) acc[eventDate] = [];
//     acc[eventDate].push(event);
//     return acc;
//   }, {});

//   return (
//     <div className="min-h-screen p-10 flex flex-col items-center">
//       {/* Header Section */}
//       <div className="w-full max-w-6xl relative mt-6">
//         <h1 className="text-3xl font-bold text-center mb-6">Upcoming Events</h1>

//         {/* Toggle buttons positioned on the right */}
//         <div className="absolute top-0 right-0 flex space-x-2">
//           <button
//             className={`px-4 py-2 rounded-md ${
//               filter === "upcoming" ? "bg-gray-800 text-white" : "bg-gray-300"
//             }`}
//             onClick={() => setFilter("upcoming")}
//           >
//             Upcoming
//           </button>
//           <button
//             className={`px-4 py-2 rounded-md ${
//               filter === "past" ? "bg-gray-800 text-white" : "bg-gray-300"
//             }`}
//             onClick={() => setFilter("past")}
//           >
//             Past
//           </button>
//         </div>
//       </div>

//       {/* Events Section */}
//       {loading ? (
//         <p className="text-center">Loading events...</p>
//       ) : filteredEvents.length > 0 ? (
//         <div className="w-full max-w-6xl space-y-2">
//           {Object.entries(groupedEvents).map(([date, eventsArray]) => (
//             <div key={date} className="w-full">
//               <h2 className="text-2xl font-semibold text-center mb-4">{date}</h2>
              
//               {/* Grid Layout for Events */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center">
//                 {eventsArray.map((event) => (
//                   <EventCard
//                     key={event.id}
//                     title={event.title}
//                     date={event.start_time}
//                     host={event.club?.club_name || "Unknown"}
//                     location={event.location}
//                     attendees={event.attendees_count}
//                     capacity={event.capacity}
//                     coverImage={event.cover_image}
//                     hostLogo={event.host_logo}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center">No events available.</p>
//       )}
//     </div>
//   );
// }

// export default ClubEvents;
import { useEffect, useState } from "react";
import backend from "../components/backend";
import EventCard from "../components/EventCard";

function ClubEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await backend.get("/events/");
        setEvents(response.data);
        console.log("Fetched Events:", response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const currentDate = new Date();
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start_time);
    return filter === "upcoming" ? eventDate >= currentDate : eventDate < currentDate;
  });

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const eventDate = new Date(event.start_time);
    const dateKey = eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const dayName = eventDate.toLocaleDateString("en-US", { weekday: "long" });

    if (!acc[dateKey]) acc[dateKey] = { dayName, events: [] };
    acc[dateKey].events.push(event);
    return acc;
  }, {});

  return (
    <div className="min-h-screen p-10 flex flex-col items-center bg-gray-100">
      {/* Header Section */}
      <div className="w-full max-w-5xl relative mb-6">
        <h1 className="text-3xl font-bold text-left">Events</h1>

        {/* Toggle buttons positioned on the right */}
        <div className="absolute top-0 right-0 flex space-x-2 bg-white rounded-full shadow-md p-1">
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-full ${
              filter === "upcoming" ? "bg-gray-900 text-white" : "text-gray-600"
            }`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-full ${
              filter === "past" ? "bg-gray-900 text-white" : "text-gray-600"
            }`}
            onClick={() => setFilter("past")}
          >
            Past
          </button>
        </div>
      </div>

      {/* Events Section */}
      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : filteredEvents.length > 0 ? (
        <div className="w-full max-w-5xl flex">
          {/* Vertical Timeline */}
          <div className="relative w-10 flex flex-col items-center">
            {/* Timeline Vertical Line */}
            <div className="absolute top-0 bottom-0 w-1 bg-gray-300 rounded-full"></div>

            {/* Timeline Dots for Each Date */}
            {Object.entries(groupedEvents).map((index) => (
              <div key={index} className="relative flex items-center justify-center h-20">
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
              </div>
            ))}
          </div>

          {/* Event Cards Section */}
          <div className="flex-grow">
            {Object.entries(groupedEvents).map(([date, { dayName, events }], index) => (
              <div key={index} className="mb-6">
                {/* Date Label */}
                <div className="mb-4">
                  <p className="text-lg font-semibold">{date}</p>
                  <p className="text-gray-500 text-sm">{dayName}</p>
                </div>

                {/* Event Cards */}
                <div className="space-y-6">
                  {events.map((event) => (
                    <EventCard
                     key={event.id}
                     title={event.title}
                     date={event.start_time}
                     host={event.club?.club_name || "Unknown"}
                     location={event.location}
                     attendees={event.attendees_count}
                     capacity={event.capacity}
                     coverImage={event.cover_image}
                     hostLogo={event.host_logo}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">No events available.</p>
      )}
    </div>
  );
}

export default ClubEvents;


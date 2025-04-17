import { useEffect, useState } from "react";
import backend from "../components/backend";
import EventListCard from "../components/EventListCard";

function ClubEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");
  const [importing, setImporting] = useState(false);
  const [clubName, setClubName] = useState("");
  const [importError, setImportError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const user_res = await backend.get("/clubs/");
        setClubName(user_res.data["club_name"]);

        const event_res = await backend.get("/events/");
        setEvents(event_res.data);
      } catch (err) {
        console.log("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleImportEvents = async () => {
    if (!clubName) {
      setImportError("Please enter a valid club name.");
      return;
    }

    setImporting(true);
    setImportError("");
    try {
      const response = await backend.post("/import-events/");
      const imported = response.data.events;
      
      console.log("Fetched imported events:", imported);

      // Make sure imported is an array before using filter
      if (Array.isArray(imported)) {
        // Merge imported events into existing events (avoid duplicates)
        setEvents((prev) => {
          const existingIds = new Set(prev.map((e) => e.id));
          const merged = [...prev, ...imported.filter((e) => !existingIds.has(e.id))];
          return merged;
        });
      } else {
        throw new Error("Imported data is not an array.");
      }

    } catch (err) {
      console.error("Error importing events:", err);
      setImportError("Error importing events. Please make sure the club name is correct.");
    } finally {
      setImporting(false);
    }
  };

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
    <div className="min-h-screen pt-20 flex flex-col items-center">
      <div className="w-[60%] max-w-5xl relative mb-6 mt-6">
        <h1 className="text-4xl font-bold text-center">Events</h1>

        {/* Filter Buttons */}
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

        {/* Import Events */}
        <div className="mt-6">
          <p className="text-lg text-center">Want to import your Luma Events?</p>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              onClick={handleImportEvents}
              disabled={importing}
            >
              {importing ? "Importing..." : "Import Events"}
            </button>
          </div>
          {importError && <p className="text-red-500 mt-2 text-center">{importError}</p>}
        </div>
      </div>

      {/* Events Display */}
      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : filteredEvents.length > 0 ? (
        <div className="w-[30%] max-w-5xl flex">
          {/* Timeline */}
          <div className="relative w-10 flex flex-col items-center">
            <div className="absolute top-0 bottom-0 w-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Event Cards */}
          <div className="flex-grow items-center">
            {Object.entries(groupedEvents).map(([date, { dayName, events }], index) => (
              <div key={index} className="mb-6">
                <div className="mb-4">
                  <p className="text-lg font-semibold">{date}</p>
                  <p className="text-gray-500 text-sm">{dayName}</p>
                </div>
                <div className="space-y-6">
                  {events.map((event) => (
                    <EventListCard
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

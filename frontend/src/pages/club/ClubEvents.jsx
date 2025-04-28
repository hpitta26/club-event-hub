import React, { useEffect, useState } from "react";
import backend from "../../middleware/backend";
import EventListCard from "../../components/club/EventListCard";
import EventModal from "../../components/student/EventModal.jsx";
import EditEventModal from "../../components/club/EditEventModal.jsx";

function ClubEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");
  const [importing, setImporting] = useState(false);
  const [clubName, setClubName] = useState("");
  const [importError, setImportError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false)

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

  const displayModal = () =>{
    setEditModalOpen(!editModalOpen);
  }

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
  <>
    {editModalOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[100]"/>

          {/* Event Modal */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center">
            <EditEventModal onClose={displayModal}/>
          </div>
        </>
    )}
    <div className="min-h-screen pt-20 flex flex-col items-center pb-20">
      <div className="w-[60%] max-w-5xl relative mb-6 mt-6">
        <h1 className="text-4xl font-bold text-center">Events</h1>

        {/* Upcoming/past Toggle */}
        <div className="absolute top-0 right-0 flex items-center justify-center bg-[#F0EFEB] rounded-md p-[3px] border border-black shadow-[2px_2px_0px_#000000]">
          <div className="relative flex text-center rounded-md w-44 font-semibold text-sm">
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-[#4D9FFD] rounded-md transition-transform duration-200`}
              style={{
                transform: filter === "upcoming" ? "translateX(0%)" : "translateX(100%)",
              }}
            ></div>
            <button
              onClick={() => setFilter("upcoming")}
              className={`w-1/2 py-2 rounded-md z-10 ${
                filter === "upcoming" ? "text-black font-bold" : "text-gray-600"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`w-1/2 py-2 rounded-md z-10 ${
                filter === "past" ? "text-black font-bold" : "text-gray-600"
              }`}
            >
              Past
            </button>
          </div>
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
        <div className="w-[40%] max-w-5xl flex">
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
                      image={event.profilebanner}
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
    </>
  );
}

export default ClubEvents;

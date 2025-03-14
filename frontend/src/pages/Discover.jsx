import React, { useState, useEffect } from "react";
import Sidebar from "../components/discover/sidebar";
import FilterBar from "../components/discover/FilterBar";
import EventGrid from "../components/discover/EventGrid";
import backend from "../components/backend";

const Discover = () => {
  const categories = ["All", "Programming", "Health", "Sports"];
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [allEvents, setAllEvents] = useState([
    {
      id: 1,
      name: "Code Camp",
      category: "Programming",
      rsvps: [],
      club: { club_name: "" },
    },
  ]); //dummy data on load

  useEffect(() => {
    backend
      .get("get-week-events/")
      .then((response) => setAllEvents(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  const filteredEvents =
    selectedFilter === "All"
      ? allEvents
      : allEvents.filter((event) => event.category === selectedFilter);

  return (
    <div className="min-h-screen bg-gray-200 flex pt-10">
      <div className="w-1/5 flex justify-center items-center">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 transition-all duration-300">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">Events This Week</h1>

        {/* Filters */}
        <FilterBar categories={categories} onFilterSelect={setSelectedFilter} />

        {/* Event Grid */}
        <EventGrid events={filteredEvents} />
      </main>
    </div>
  );
};

export default Discover;

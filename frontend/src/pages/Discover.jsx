import React, { useState, useEffect } from "react";
import Sidebar from "../components/discover/Sidebar";
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
    <div className="max-w-[1400px] mx-auto pt-10">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 mt-[84px] hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Title and Filters */}
          <div className="pt-6 px-6">
            <h1 className="text-2xl font-bold mb-4">Events This Week</h1>
            <FilterBar categories={categories} onFilterSelect={setSelectedFilter} />
          </div>
          {/* Event Grid */}
          <div className="overflow-y-auto h-[calc(100vh-150px)] p-6">
            <EventGrid events={filteredEvents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
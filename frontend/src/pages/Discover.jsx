import React, { useState, useEffect } from "react";
import backend from "../components/backend";
import NewSidebar from "../components/discover/NewSidebar";
import EventGrid from "../components/discover/EventGrid";
import NewFilterBar from "../components/discover/NewFilerBar";
import { useSidebar } from "../context/SidebarContext";

const Discover = () => {
  const categories = ["All", "Programming", "Health", "Sports"];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { isSidebarOpen } = useSidebar();

  const [allEvents, setAllEvents] = useState([{
        id: 0,
        title: "",
        description: "",
        start_time: "",
        host: "",
        location: "",
        attending: 0,
        capacity: 0,
        coverImage: "",
        hostLogo: "",
        is_rsvped: false,
        category: ""
    }]);

  useEffect(() => {
    async function fetch_events() {
        try {
            const response = await backend.get("get-week-events/");
            console.log(response);
            setAllEvents(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    fetch_events();
  }, []);

  const filteredEvents =
    selectedFilter === "All"
      ? allEvents
      : allEvents.filter((event) => event.category === selectedFilter);

  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh)]">
      <div className="flex h-full">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-1/4 hidden lg:block">
            <NewSidebar />
          </div>
        )}

        {/* Main Content Wrapper */}
        <div
          className={`${
            isSidebarOpen
              ? "flex-1 ml-0" // Sidebar is open, main content takes remaining space
              : "w-[75%] mx-auto" // Sidebar is closed, main content is centered
          }`}
        >
          <div className="pt-[80px] h-full flex flex-col">
            {/* Title and Filters */}
            <div className="pt-6 px-6">
              <h1 className="text-2xl font-bold mb-4">Events This Week</h1>
              <NewFilterBar categories={categories} onFilterSelect={setSelectedFilter} />
            </div>
            {/* Event Grid */}
            <div className="overflow-y-auto flex-1 p-6">
              <EventGrid events={filteredEvents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
import React, { useState } from "react";
import Sidebar from "../components/discover/sidebar";
import FilterBar from "../components/discover/FilterBar";
import EventGrid from "../components/discover/EventGrid";

const Discover = () => {
    const categories = ["All", "Programming", "Health", "Sports"];
    const [selectedFilter, setSelectedFilter] = useState("All");

    const allEvents = [
        { id: 1, name: "Code Camp", category: "Programming" },
        { id: 2, name: "Yoga Session", category: "Health" },
        { id: 3, name: "Basketball League", category: "Sports" },
        { id: 4, name: "AI Workshop", category: "Programming" },
        { id: 5, name: "Nutrition Talk", category: "Health" },
        { id: 6, name: "Nutrition Talk", category: "Health" },
        { id: 7, name: "Nutrition Talk", category: "Health" },
        { id: 8, name: "Nutrition Talk", category: "Health" },
    ];

    // Apply filter logic
    const filteredEvents =
        selectedFilter === "All" ? allEvents : allEvents.filter(event => event.category === selectedFilter);

    return (
        <div className="min-h-screen bg-gray-200 flex pt-10">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6">
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

import React, { useState, useEffect, useContext } from "react";
import backend from "../components/backend";
import DiscoverSidebar from "../components/discover/DiscoverSidebar";
import EventGrid from "../components/discover/EventGrid";
import Filterbar from "../components/discover/FilterBar";
import { useSidebar } from "../context/SidebarContext";
import RecommendedEvents from "../components/discover/RecommendedEvents.jsx";
import {UserContext} from "../context/UserContext.jsx";

const Discover = () => {
  const categories = ["All", "Career", "Culture", "Fitness", "Medical", "Politics", "Social", "Technology", "Volunteer", "Wellness"];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { isSidebarOpen, toggleMobileSidebar, setPage } = useSidebar();
  const [filteredEvents, setFilteredEvents] = useState([])
  const [recommendedEvents, setRecommendedEvents] = useState([])
  const {userContext} = useContext(UserContext)

  const [allEvents, setAllEvents] = useState([{
        id: 0,
        title: "",
        description: "",
        start_time: "",
        host: "",
        location: "",
        attending: 0,
        capacity: 0,
        tags:[],
        profilebanner: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=250",
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
            console.log("API Response:", response.data);

        } catch (err) {
            console.log(err);
        }
    }
    fetch_events();
    
    // Set the current page when the component mounts
    setPage("discover");
  }, [setPage]);

  useEffect(() => {
    if (selectedFilter !== "All") {
      backend
          .get(`filter-events/${selectedFilter}/`)
          .then((response)=>{
            const normalized_host = response.data.data.map((event) => ({
            ...event,
            host: event.club?.club_name || "Unknown Host",
            }));
          setFilteredEvents(normalized_host)})
    }
    else {
      setFilteredEvents(allEvents)
    }
  }, [allEvents, selectedFilter]);

  // Log when mobile button is clicked
  const handleMobileToggle = () => {
    console.log("Mobile toggle clicked");
    toggleMobileSidebar();
  };

  useEffect(() => {
      if (userContext) {
        backend.get("collaborative-filter/")
          .then((response) => {
            const normalized_host = response.data.map((event) => ({
              ...event,
              host: event.club?.club_name || "Unknown Host",
            }));
            setRecommendedEvents(normalized_host);
          });
      }
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto min-h-screen">
      <div className="flex flex-col h-full">
        {/* Desktop Sidebar */}
        {isSidebarOpen && (
          <div className="w-[300px] hidden lg:block">
            <DiscoverSidebar />
          </div>
        )}
        
        {/* Mobile Sidebar Toggle Button - Make sure this is visible */}
        <div className="fixed bottom-4 right-4 z-2 lg:hidden">
          <button 
            className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
            onClick={handleMobileToggle}
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Main Content Wrapper */}
        <div
          className={`w-full ${
            isSidebarOpen
              ? "lg:w-3/4 lg:ml-auto" // Sidebar is open on desktop
              : "w-full lg:w-3/4 lg:mx-auto" // Sidebar is closed
          }`}
        >
          <div className="pt-[60px] lg:pt-[80px] h-full flex flex-col">
            {/* Title and Filters */}
            <div className="pt-6 px-6 pl-10">
              <h1 className="text-2xl font-bold mb-4">Discover Events</h1>
              <Filterbar categories={categories} onFilterSelect={setSelectedFilter} />
            </div>
            {/* Event Grid */}
            <div className="overflow-y-auto flex-1 p-6 px-10 pr-14">
                {recommendedEvents.length>3 && <RecommendedEvents events={recommendedEvents}/>}
                      {selectedFilter === "All"
                          ? <h1 className="text-lg font-bold mb-4">Events This Week</h1>
                          : <h1 className="text-lg font-bold mb-4">{selectedFilter} Events</h1>
                      }
                <EventGrid events={filteredEvents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
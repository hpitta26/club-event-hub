import React, { useState, useEffect, useContext } from "react";
import backend from "../components/backend";
import DiscoverSidebar from "../components/discover/DiscoverSidebar";
import EventGrid from "../components/discover/EventGrid";
import Filterbar from "../components/discover/FilterBar";
import { useSidebar } from "../context/SidebarContext";
import RecommendedEvents from "../components/discover/RecommendedEvents.jsx";
import {UserContext} from "../context/UserContext.jsx";

const Discover = () => {
  const categories = ["All", "Career", "Culture","Fitness", "Medical", "Politics", "Social", "Technology","Volunteer", "Wellness"];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { isSidebarOpen } = useSidebar();
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
  }, []);

  useEffect(() => {
    if(selectedFilter!=="All"){
      backend
          .get(`filter-events/${selectedFilter}/`)
          .then((response)=>{
            const normalized_host = response.data.data.map((event) => ({
            ...event,
            host: event.club?.club_name || "Unknown Host",
            }));
          setFilteredEvents(normalized_host)})
    }
    else{
      setFilteredEvents(allEvents)
    }
  }, [allEvents,selectedFilter]);

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
    <div className="max-w-[1400px] mx-auto h-[calc(100vh)]">
      <div className="flex h-full">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-[300px] hidden lg:block">
            <DiscoverSidebar />
          </div>
        )}

        {/* Main Content Wrapper */}
        <div
          className={`${
            isSidebarOpen
              ? "flex-1 min-w-0 ml-0" // Sidebar is open, main content takes remaining space
              : "w-[75%] mx-auto" // Sidebar is closed, main content is centered
          }`}
        >
          <div className="pt-[80px] h-full flex flex-col">
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
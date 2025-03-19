import React from "react";
import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg";
import SidebarCard from "./SidebarCard";

const Sidebar = () => {
  const newEvents = [
    { id: 1, title: "Code Camp", date: "Aug 20 - 5:00 PM", host: "CodeHub", image: dummyEventCardCover,},
    { id: 2, title: "Yoga Session", date: "Aug 21 - 6:00 PM", host: "Wellness Club", image: dummyEventCardCover,},
    { id: 3, title: "Basketball League", date: "Aug 22 - 7:00 PM", host: "Sports Society", image: dummyEventCardCover,},
  ];

  const featuredEvents = [
    { id: 4, title: "AI Workshop", date: "Aug 23 - 4:00 PM", host: "Tech Innovators", image: dummyEventCardCover,}, 
    { id: 5, title: "Nutrition Talk", date: "Aug 24 - 5:30 PM", host: "Healthy Living", image: dummyEventCardCover,},
  ];

  return (
    <div className="p-4 flex flex-col items-center">
      {/* New Events Section */}
      <div>
        <h2 className="font-semibold text-lg text-black-300 mb-3 tracking-wide self-start">
          New
        </h2>
        <div className="space-y-3">
          {newEvents.map((club) => (
            <SidebarCard key={club.id} />
          ))}
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="mt-8">
        <h2 className="font-semibold text-lg text-black mb-3 tracking-wide">
          Featured
        </h2>
        <div className="space-y-3">
          {featuredEvents.map((club) => (
            <SidebarCard key={club.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
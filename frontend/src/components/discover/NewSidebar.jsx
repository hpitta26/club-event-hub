import React from "react";
import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg";
import NewSidebarCard from "./NewSidebarCard";

const NewSidebar = () => {
  const newEvents = [
    { id: 1, title: "Code Camp", date: "Aug 20 - 5:00 PM", host: "CodeHub", image: dummyEventCardCover },
    { id: 2, title: "Yoga Session", date: "Aug 21 - 6:00 PM", host: "Wellness Club", image: dummyEventCardCover },
    { id: 3, title: "Basketball League", date: "Aug 22 - 7:00 PM", host: "Sports Society", image: dummyEventCardCover },
  ];

  const featuredEvents = [
    { id: 4, title: "AI Workshop", date: "Aug 23 - 4:00 PM", host: "Tech Innovators", image: dummyEventCardCover },
    { id: 5, title: "Nutrition Talk", date: "Aug 24 - 5:30 PM", host: "Healthy Living", image: dummyEventCardCover },
  ];

  return (
    <div className="absolute w-[278px] h-[calc(100vh-80px)] top-[80px] left-0 bg-[rgba(253,78,183,0.8)] border border-black shadow-[4px_4px_0px_#000000] rounded-tr-[10px] rounded-br-[10px] p-4">
      {/* New Events Section */}
      <div className="flex flex-col items-center">
        <div>
          <h2 className="font-normal text-[26px] leading-[31px] text-black mb-2">New</h2>
          <div className="flex flex-col gap-3">
            {newEvents.map((event) => (
              <NewSidebarCard
                key={event.id}
                name={event.title}
                image={event.image}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="flex flex-col items-center">
        <div className="mt-8">
          <h2 className="font-normal text-[26px] leading-[31px] text-black mb-2">Featured</h2>
          <div className="flex flex-col gap-3">
            {featuredEvents.map((event) => (
              <NewSidebarCard
                key={event.id}
                name={event.title}
                image={event.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSidebar;
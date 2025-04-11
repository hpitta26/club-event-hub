import React from "react";

const NotificationDropDown = ({ isOpen, onClose }) => {
  // Hardcoded notifications based on the screenshot
  const notifications = [
    {
      id: 1,
      source: "INIT",
      sourceLogo: "/src/assets/dummyInitLogo.png",
      message: "Intro to Web Starts in an Hour",
      time: "10 minutes ago",
      isNew: true,
    },
    {
      id: 2,
      source: "INIT",
      sourceLogo: "/src/assets/dummyInitLogo.png",
      message: "Intro to Web Starts in Tomorrow",
      time: "4/20/2025",
      isNew: false,
    },
    {
      id: 3,
      source: "INIT",
      sourceLogo: "/src/assets/dummyInitLogo.png",
      message: "Check out this event: Intro to Web",
      time: "1/1/2025",
      isNew: false,
    },
    {
      id: 4,
      source: "GatherU",
      sourceLogo: "/src/assets/icons/GatherUIcon.svg",
      message: "We Think you might like this club: INIT",
      time: "2/14/2025",
      isNew: false,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-[65px] w-[370px] bg-[#FFFAFD] rounded-md border-[1.5px] border-black shadow-[2px_2px_0px_#000000] z-50">
      <div className="p-2">
        <h2 className="text-2xl font-semibold px-4 py-2">Notifications</h2>
        <div className="overflow-y-auto max-h-[400px]">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="flex items-center px-4 py-3 cursor-pointer border-b last:border-b-0 border-gray-300 bg-[#FFFAFD] hover:bg-blue-100 rounded-xl transition-colors duration-200"
            >
              <div className="relative">
                <img
                  src={notification.sourceLogo} 
                  alt={notification.source} 
                  className="w-12 h-12 rounded-full object-cover mr-4 border-[1.5px] border-black"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-semibold">From {notification.source}</p>
                  <p className="text-gray-600 text-sm">{notification.time}</p>
                </div>
                <p className="text-sm text-gray-800">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationDropDown;
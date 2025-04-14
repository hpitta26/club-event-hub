import React, { createContext, useState, useContext } from "react";

// Create the context outside of any component
const SidebarContext = createContext();

// Define the hook outside of the provider component
export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("discover"); // Default to discover page
  
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  
  const toggleMobileSidebar = () => {
    console.log("Toggling mobile sidebar, current state:", isMobileSidebarOpen);
    setIsMobileSidebarOpen((prev) => !prev);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsMobileSidebarOpen(false);
  };
  
  const setPage = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <SidebarContext.Provider 
      value={{ 
        isSidebarOpen, 
        toggleSidebar, 
        closeSidebar,
        isMobileSidebarOpen, 
        toggleMobileSidebar,
        currentPage,
        setPage
      }}
    >
      {children}
      
      {/* Mobile Sidebar Overlay - Only shows when mobile sidebar is open */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="h-full w-[75%] max-w-xs bg-white overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="font-bold text-lg">Menu</h2>
              <button 
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={toggleMobileSidebar}
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Mobile sidebar content area */}
            <div className=" bg-[rgba(253,78,183,0.8)] h-full">
              {currentPage === "discover" && (
                <div className="p-4">
                  <h2 className="font-normal text-[20px] text-black mb-2">New</h2>
                  <div className="flex flex-col gap-3 mb-6">
                    {/* This is where your SidebarCards would go */}
                    <div className="bg-white rounded-lg p-2 shadow-md border border-black">
                      Code Camp
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-md border border-black">
                      Yoga Session
                    </div>
                  </div>
                  
                  <h2 className="font-normal text-[20px] text-black mb-2">Recommended</h2>
                  <div className="flex flex-col gap-3">
                    <div className="bg-white rounded-lg p-2 shadow-md border border-black">
                      AI Workshop
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-md border border-black">
                      Nutrition Talk
                    </div>
                  </div>
                </div>
              )}
              
              {currentPage === "following" && (
                <div className="p-4">
                  <h2 className="font-normal text-[20px] text-black mb-2">Following</h2>
                  {/* Following sidebar content */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </SidebarContext.Provider>
  );
};
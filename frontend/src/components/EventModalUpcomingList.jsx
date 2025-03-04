import EventModalCard from "./EventModalCard";

{/* Custom Scroll Bar Styling */}
const customScrollbarStyle = {
  scrollbarWidth: "none",  
  scrollSnapType: "proximity",
  scrollBehavior: "smooth",
  overflowY: "scroll",
  msOverflowStyle: "none",  
  "&::WebkitScrollbar": {
    display: "none"  
  }
};

function EventModalUpcomingList() {
  const currentRSVPS = Array(40).fill({}); // Increased to 40 for demonstration

  return (
    <div className="h-full rounded-md" style={customScrollbarStyle}>
      <div className="flex flex-col gap-3">
        {/* Making a card for every RSVP */}
        {currentRSVPS.map((event, index) => (
          <div key={index}>
            <EventModalCard />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventModalUpcomingList;

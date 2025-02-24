import EventSidebarCard from "./EventSidebarCard";

{/* Custom Scroll Bar Styling */}
const customScrollbarStyle = {
  scrollbarWidth: "thin",
  scrollSnapType: "proximity",
  scrollBehavior: "smooth",
  scrollbarColor: "white #1e293b",
  overflowY: "auto"
};

function EventSidebarCardList() {
  const currentRSVPS = Array(10).fill({}); // Increased to 10 for demonstration

  return (
    <div className="h-full overflow-y-auto pr-3 rounded-md" style={customScrollbarStyle}>
      <div className="flex flex-col gap-3">
        {/* Making a card for every RSVP */}
        {currentRSVPS.map((event, index) => (
          <div key={index}>
            <EventSidebarCard />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventSidebarCardList;

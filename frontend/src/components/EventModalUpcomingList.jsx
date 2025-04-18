import EventModalCard from "./EventModalCard";

const customScrollbarStyle = {
  scrollbarWidth: "none",  
  scrollSnapType: "proximity",
  scrollBehavior: "smooth",
  overflowY: "scroll",
  msOverflowStyle: "none",  
};

function EventModalUpcomingList({ events = [], upcoming = false }) {

  return (
    <div className="w-full h-full rounded-md pr-1 pb-2" style={customScrollbarStyle}>
      <div className="flex flex-col gap-3">
        {events.map((event, index) => (
          <div key={index}>
            <EventModalCard title={event.title} date={event.start_time} host={event.host} profilebanner={event.profilebanner} upcoming={upcoming} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventModalUpcomingList;

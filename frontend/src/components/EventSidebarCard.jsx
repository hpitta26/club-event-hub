import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";

function EventSidebarCard() {
  {
    /* Handle length of title */
  }
  function handleTitleLength(title) {
    const maxLength = 29;

    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  }

  return (
    <div className="container flex gap-3 w-70 px-4 py-5 bg-slate-800 rounded-md">
      <img
        src={dummyEventCardCover}
        className="w-24 h-24 rounded-lg object-cover"
      />
      <div className="flex flex-col gap-1 justify-between">
        <div>
          {/* Card Date */}
          <p className="text-white text-xs"> Aug 13 - 6:30 PM</p>
          {/* Card Title */}
          <p className="text-white text-2xl font-bold leading-none">
            {handleTitleLength("Introduction to LLMs")}
          </p>
        </div>
        {/* Card Host */}
        <p className="text-white text-xs">Hosted by: INIT FIU</p>
      </div>
    </div>
  );
}

export default EventSidebarCard;

import PropTypes from "prop-types";

import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg";
import dummyInitLogo from "../../assets/dummyInitLogo.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

function EventCard({ event }) {
  function handleTitleLength(title) {
    const maxLength = 23;

    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  }

  return (
      <div className="container flex flex-col  bg-[#F5F5F5] w-72 h-95 px-4 py-5 rounded-3xl m-20"> {/* Take off m-20. Only used for testing. */}
        <div className="flex flex-col justify-start gap-1">
          {/*Event Cover*/}
          <div className="flex flex-col">
            <p className="absolute mx-3 my-2  bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded-md text-xs">
              {event.date}
            </p>
            <img
              src={dummyEventCardCover}
              alt=""
              className="rounded-lg w-full h-48 object-cover object-bottom"
            />
          </div>
          {/*Title*/}
          <p className="text-xl font-extrabold">
            {handleTitleLength(event.title)}
          </p>
          <div className="flex flex-row gap-1 items-center">
            {/*Host*/}
            <div className="w-4 h-4 rounded-full overflow-hidden">
              <img
                src={event.hostLogo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm">{event.host}</p>
          </div>
          {/*Location*/}
          <div className="flex flex-row gap-1 items-center">
            <FaLocationDot className="text-orange-400" />
            <p className="text-sm font-semibold">{event.location}</p>
          </div>
        </div>
        <div className="flex flex-row gap-1  items-center mt-8 justify-between">
          {/*People going*/}
          <div className="flex -space-x-3 items-center">
            {[...Array(4)].map((_, index) => (
              <FaCircleUser
                key={index}
                className="text-gray-600 w-7 h-7 ring-2 bg-white ring-white rounded-full"
              />
            ))}

            <div className="w-8 h-6 px-4 bg-[#D0FDA0] text-black  rounded-full ring-2 ring-white  flex items-center justify-center text-center">
              <p className="text-[8px]  font-bold text-center">
                <span className="font-black">+</span>
                {event.peopleAttending}
              </p>
            </div>
          </div>

          {/*Capacity*/}
          <div className="flex flex-row gap-1 items-center">
            <IoMdPerson className="text-2xl" />
            <p className="text-xs font-bold">{event.capacity}</p>
          </div>
        </div>
      </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    capacity: PropTypes.string.isRequired,
    peopleAttending: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    date: PropTypes.string.isRequired,
    hostLogo: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
};

EventCard.defaultProps = {
  event: {
    title: "Introduction to LLMs",
    host: "INIT FIU",
    location: "PG6 116",
    capacity: "250-300",
    peopleAttending: "191",
    date: "Aug 13 - 6:30 PM",
    hostLogo: dummyInitLogo,
    cover: dummyEventCardCover,
  },
};

export default EventCard;

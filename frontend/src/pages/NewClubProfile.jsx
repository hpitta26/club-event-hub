import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { RiTwitterXFill } from "react-icons/ri";
import backend from "../components/backend.jsx";
import dummyInitLogo from "../assets/dummyInitLogo.png";
import ClubProfileCard from "../components/ClubProfileCard.jsx";

function NewClubProfile() {
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([])
  const [weeklyEvents, setWeeklyEvents] = useState([])

  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const slug = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    backend
      .get(`/clubs/slug/${slug.clubSlug}/`)
      .then((response) => {
        setClub(response.data);
        setPageData(response.data)
        setLoading(false);
      })
      .catch(() => {
        navigate("/*");
      });
  }, [slug]);

  function setPageData(data){
    backend.get(`/get-club-events/${data.user_id}/`)
        .then((eventData)=>{
          setEvents(eventData.data);
        })
    backend.get(`/get-weekly-club-events/${data.user_id}/`)
        .then((weeklyEventData)=>{
          setWeeklyEvents(weeklyEventData.data);
        })
    backend.get(`/check-user-following/${data.user_id}/`)
        .then((followingData)=>{
          setIsFollowing(followingData.data);
        })
    }

    function handleFollow(clubID){
        backend.patch(`/follow-club/${clubID}/`);
        setIsFollowing(true);
    }

    function handleUnfollow(clubID){
        backend.delete(`/unfollow-club/${clubID}/`);
        setIsFollowing(false);
    }
  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center pt-10">
        <h1 className="text-white text-2xl">Loading ...</h1>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center pb-20 pt-[120px]">
      {/* Top Section */}
      <div className="relative w-full max-w-[860px]">
        {/* Banner */}
        <div className="w-full h-[194px] bg-cover bg-center border border-black rounded-[16px] overflow-hidden">
          <img
            src={club.banner || dummyInitLogo}
            alt="Club Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Club Logo */}
        <div className="absolute w-[85px] h-[85px] top-[150px] left-[20px] bg-cover bg-center border border-black rounded-full overflow-hidden">
          <img
            src={club.logo || dummyInitLogo}
            alt="Club Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {!isFollowing ?
        /* Follow Button */
        <div className="absolute top-[205px] right-5">
          <button
            className="flex items-center justify-center w-[78px] h-[32px] bg-[#FD4DB7] text-black text-[16px] font-['Pramukh Rounded'] border-[1.5px] border-black rounded-[4px] hover:bg-pink-400"
            onClick={() => handleFollow(club.user_id)}
          >
            Follow
          </button>
        </div>
            :
        /* Unfollow Button */
        <div className="absolute top-[205px] right-5">
          <button
            className="flex items-center justify-center w-[78px] h-[32px] bg-blue-500 text-black text-[16px] font-['Pramukh Rounded'] border-[1.5px] border-black rounded-[4px] hover:bg-blue-400"
            onClick={() => handleUnfollow(club.user_id)}
          >
            Unfollow
          </button>
        </div>
        }
      </div>

      {/* Club Info */}
      <div className="w-full max-w-[860px] px-6 mt-6 space-y-4">
        {/* Club Name */}
        <div className="flex flex-col w-3/4 mt-8">
            <h1 className="font-inter text-black font-bold text-[42px] tracking-[0.04em]">{club.club_name}</h1>
            <p className="text-[16px] font-semibold text-[#535862] leading-[19px]">{club.description}</p>
        </div>

        {/* Followers and Following */}
        <div className="flex items-center space-x-[100px]">
          <p className="text-[16px] font-normal font-['Pramukh Rounded'] text-black leading-[19px]">
            {club.followers || 0} Followers
          </p>

          <div className="flex items-center space-x-3">
          <button onClick={() => window.open(club.instagram, "_blank")}>
            <FaInstagram className="text-[#535862] w-6 h-6 hover:text-gray-400" />
          </button>
          <button onClick={() => window.open(club.twitter, "_blank")}>
            <RiTwitterXFill className="text-[#535862] w-6 h-6 hover:text-gray-400" />
          </button>
          <button onClick={() => window.open(club.linkedin, "_blank")}>
            <FaLinkedin className="text-[#535862] w-6 h-6 hover:text-gray-400" />
          </button>
          <button onClick={() => window.open(club.website, "_blank")}>
            <HiOutlineGlobeAlt className="text-[#535862] w-6 h-6 hover:text-gray-400" />
          </button>
        </div>
        </div>

        {/* Social Media Links */}
        
      </div>

      {/* Bottom Section (Events) */}
      <div className="w-full max-w-[860px] mt-10">
        <div className="mx-2 mt-4">
          <h3 className="text-black font-['Pramukh Rounded'] font-semibold text-3xl">Events</h3>
        </div>
        <div className="mx-2 mt-4">
          <h5 className="text-black">This Week</h5>
        </div>
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap no-scrollbar">
          <div className="inline-flex gap-4 m-2">
            {weeklyEvents.map((weeklyEvent)=>(
              <ClubProfileCard
                  title={weeklyEvent.title}
                  date={weeklyEvent.start_time}
                  host={weeklyEvent.club.club_name}
                  location={weeklyEvent.location}
                  attendees={weeklyEvent.rsvps.length}
                  capacity={weeklyEvent.capacity}
              />
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="mx-2 mt-4">
            <h5 className="text-black">Upcoming</h5>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap no-scrollbar">
          <div className="inline-flex gap-4 m-2">
            {events.map((event)=>(
              <ClubProfileCard
                  title={event.title}
                  date={event.start_time}
                  host={event.club.club_name}
                  location={event.location}
                  attendees={event.rsvps.length}
                  capacity={event.capacity}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewClubProfile;

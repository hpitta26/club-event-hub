import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentOrClubModal from "../components/StudentOrClubModal";
import EventCard from "../components/EventCard";
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";
import dummyInitLogo from "../assets/dummyInitLogo.png";
import gatherULogo from '../assets/icons/GatherUIcon.png';
import calendarLogo from '../assets/icons/calender.png';
import connectLogo from '../assets/icons/connect.png';
import awardLogo from '../assets/icons/award.png';
import bookLogo from '../assets/icons/book.webp';


const Landing = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  
  return (
    <div className="min-h-screen overflow-y-auto">
      {/* Hero Section with Logo */}
      <section className="flex flex-col justify-center items-center text-center pt-[10rem] md:pt-28 pb-8 md:pb-16 px-4">
        <div className="flex flex-col md:flex-row items-center justify-center mb-4 md:mb-6">
            <h1 className="text-4xl md:text-6xl font-black text-black">Welcome to</h1>
            <img 
                src={gatherULogo} 
                alt="GatherU Logo" 
                className="h-16 md:h-24 mt-2 md:-mt-7 md:ml-4"
            />
        </div>

        {/* Subheading with less bold font */}
        <div className="mt-2 md:mt-4">
          <h1 className="text-black font-medium text-xl md:text-4xl px-4 py-2 pt-0 rounded-xl inline-block">
            The Hub for University Clubs
          </h1>
        </div>
      </section>
      
      <section className="mt-4 md:mt-8 px-4 md:px-6 text-center">
        <div className="w-full max-w-3xl mx-auto">
          
          <div className="hidden md:block relative h-[22rem] pb-[22rem]">
            <div className="absolute left-2 transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-10 hover:z-30">
              <EventCard
                title="Intro To Product..."
                date="2025-08-25T21:00:00"
                host="McDonalds"
                location="FIU, PG6 116"
                attendees={79}
                capacity={100}
                profilebanner="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&h=250"
                hostLogo={dummyInitLogo}
                points={15}
                show_model={false}
              />
            </div>            
            <div className="absolute z-20 left-1/2 transform -translate-x-1/2">
              <EventCard
                title="AI Beginner Workshop"
                date="2025-08-25T21:00:00"
                host="Spring"
                location="FIU, PG6 116"
                attendees={79}
                capacity={100}
                profilebanner={"https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=250"}
                hostLogo={dummyInitLogo}
                points={25}
                show_model={false}
              />
            </div>
            
            <div className="absolute right-2 transform rotate-6 hover:rotate-0 transition-transform duration-300 z-10 hover:z-30">
              <EventCard
                title="Miami AI Hub..."
                date="2025-03-19T18:00:00"
                host="Beats"
                location="The Lab Miami"
                attendees={79}
                capacity={100}
                profilebanner={"https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&h=250"}
                hostLogo={dummyInitLogo}
                points={10}
                show_model={false}
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="flex justify-center mt-1 md:mt-1">
        <div className="flex flex-col gap-4 md:gap-6 max-w-xl mx-auto w-full px-4 md:px-8">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full text-xl md:text-2xl py-3 md:py-4 bg-[#FD4EB7] hover:bg-[#ff23a7] text-black border-2 border-black rounded-lg shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] transition-all duration-200"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full text-xl md:text-2xl py-3 md:py-4 bg-[#4D9FFD] hover:bg-[#4287ff] text-black border-2 border-black rounded-lg shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] transition-all duration-200"
          >
            Login
          </button>
        </div>
      </section>
      
      {/* Why Join Section */}
      <section className="border-t-2 border-black mt-[14rem] md:mt-[9rem] pt-6 md:pt-10 pb-8 md:pb-12 bg-white">
        <h1 className="mt-6 md:mt-10 text-3xl md:text-4xl font-bold text-center">Why join GatherU?</h1>

        {/* Mobile: Stack cards vertically */}
        <div className="flex flex-col md:hidden gap-6 px-4 mt-6">
          <div className="border-black border-2 shadow-[2px_2px_0px_#000000] rounded-lg hover:shadow-[5px_5px_0_#000] transition-all duration-200 w-full p-4 bg-blue-50">
            <div className="flex items-center gap-3">
              <img className="h-10 p-1 bg-[#4D9FFD] border-black border-2 rounded-full" src={calendarLogo} alt="Calendar"/>
              <h1 className="text-xl font-bold">Discover Events</h1>
            </div>
            <p className="mt-2 font-light">Find and join exciting university events tailored to your interests</p>
          </div>
          
          <div className="border-black border-2 shadow-[2px_2px_0px_#000000] rounded-lg hover:shadow-[5px_5px_0_#000] transition-all duration-200 w-full p-4 bg-[#f7e6e6]">
            <div className="flex items-center gap-3">
              <img className="h-10 p-1 bg-[#FD4EB7] border-black border-2 rounded-full" src={connectLogo} alt="Connect"/>
              <h1 className="text-xl font-bold">Build Community</h1>
            </div>
            <p className="mt-2 font-light">Connect with peers who share your passions and build your network</p>
          </div>
          
          <div className=" border-black border-2 shadow-[2px_2px_0px_#000000] rounded-lg hover:shadow-[5px_5px_0_#000] transition-all duration-200 w-full p-4 bg-[#f7f7cd] ">
            <div className="flex items-center gap-3">
              <img className="h-10 p-1 bg-[#FDD74D] border-black border-2 rounded-full" src={awardLogo} alt="Award"/>
              <h1 className="text-xl font-bold">Earn Points</h1>
            </div>
            <p className="mt-2 font-light">Attend events to earn points and climb the leaderboard</p>
          </div>
        </div>

        {/* Desktop: Horizontal cards */}
        <div className="hidden md:flex justify-between gap-4 px-8 mt-10">
          <div className="border-black border-2 shadow-[2px_2px_0px_#000000] rounded-lg hover:shadow-[5px_5px_0_#000] transition-all duration-200 w-full h-60 bg-blue-50">
            <img className="h-12 p-1 bg-[#4D9FFD] ml-10 mt-5 border-black border-2 rounded-full" src={calendarLogo} alt="Calendar"/>
            <h1 className="text-2xl font-bold ml-10 mt-5">Discover Events</h1>
            <p className="ml-10 mt-2 font-light">Find and join exciting university events tailored to your interests</p>
          </div>
          
          <div className="border-black border-2 shadow-[2px_2px_0px_#000000] rounded-lg hover:shadow-[5px_5px_0_#000] transition-all duration-200 w-full h-60 bg-[#f7e6e6]">
            <img className="h-12 p-1 bg-[#FD4EB7] ml-10 mt-5 border-black border-2 rounded-full" src={connectLogo} alt="Connect"/>
            <h1 className="text-2xl font-bold ml-10 mt-5">Build Community</h1>
            <p className="ml-10 mt-2 font-light">Connect with peers who share your passions and build your network</p>
          </div>
          
          <div className="border-black border-2 shadow-[2px_2px_0px_#000000] rounded-lg hover:shadow-[5px_5px_0_#000] transition-all duration-200 w-full h-60 bg-[#f7f7cd]">
            <img className="h-12 p-1 bg-[#FDD74D] ml-10 mt-5 border-black border-2 rounded-full" src={awardLogo} alt="Award"/>
            <h1 className="text-2xl font-bold ml-10 mt-5">Earn Points</h1>
            <p className="ml-10 mt-2 font-light">Attend events to earn points and climb the leaderboard</p>
          </div>
        </div>
      </section>

      {/* Points System Section */}
      <section className="flex justify-center pb-10 border-t-2 border-black pt-6 md:pt-10 bg-white">
        <div className="flex flex-col justify-center gap-4 p-4 md:p-5 border-black border-2 shadow-[2px_2px_0px_#000000] rounded-lg hover:shadow-[5px_5px_0_#000] transition-all duration-200 w-full mx-4 md:w-4/5 lg:w-3/4 xl:w-[70rem] bg-[#f7e6e6]">
          <div className="flex gap-3 md:gap-4 flex-col">
            <div className="flex items-center gap-2">
              <img className="h-8 md:h-10 p-1 bg-[#FDD74D] border-black border-2 rounded-full" src={awardLogo} alt="Award"/>
              <h1 className="text-2xl md:text-3xl font-bold">Points System</h1>
            </div>

            <p className="font-semibold text-sm md:text-base">Earn points by attending events and engaging with the community:</p>
          </div>
          
          <div className="flex flex-col gap-3 md:gap-4">
            
            <div className="border-black bg-white md:py-3 w-full border-2 shadow-[2px_2px_0px_#000000] rounded-lg hover:shadow-[5px_5px_0_#000] transition-all duration-200 min-h-12">
              <div className="flex items-center pl-3 md:pl-5 gap-3 md:gap-4">
                <img className="h-8 md:h-10 p-1 bg-[#4D9FFD] border-black border-2 rounded-full" src={calendarLogo} alt="Calendar"/>
                <p className="font-bold text-sm md:text-base">
                  10-15 points for attending regular events
                </p>
              </div>
            </div>
            
            <div className="border-black md:py-3 bg-white w-full border-2 shadow-[2px_2px_0px_#000000] rounded-lg hover:shadow-[5px_5px_0_#000] transition-all duration-200 min-h-12">
              <div className="flex items-center pl-3 md:pl-5 gap-3 md:gap-4">
                <img className="h-8 md:h-10 p-1 bg-[#53c258] border-black border-2 rounded-full" src={bookLogo} alt="Book"/>
                <p className="font-bold text-sm md:text-base">
                  20-25 points for workshops and learning sessions
                </p>
              </div>
            </div>
            <div className="border-black md:py-3 bg-white w-full border-2 shadow-[2px_2px_0px_#000000] rounded-lg hover:shadow-[5px_5px_0_#000] transition-all duration-200 min-h-12">
              <div className="flex items-center pl-3 md:pl-5 gap-3 md:gap-4">
                <img className="h-8 md:h-10 p-1 bg-[#C9A0DC] border-black border-2 rounded-full" src={connectLogo} alt="Connect"/>
                <p className="font-bold text-sm md:text-base">
                  30+ points for participating in hackathons and competitions
                </p>
              </div>
            </div>
            
            <div className="border-black py-4 md:py-3 mb-0 w-full border-2 shadow-[2px_2px_0px_#000000] bg-[#FD4EB7] rounded-lg  cursor-pointer hover:shadow-[5px_5px_0_#000] transition-all duration-200 min-h-12 "
              onClick={() => navigate("/leaderboard")}
            >
              <div className="flex justify-center items-center bg-[#FD4EB7] px-2 md:px-0">
                <p className="text-white font-bold text-center text-lg md:text-2xl">
                  Climb the leaderboard and unlock exclusive benefits!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modal should be rendered at the root level */}
      <StudentOrClubModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Landing;
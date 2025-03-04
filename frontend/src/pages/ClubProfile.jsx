import dummyInitLogo from "../assets/dummyInitLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import backend from "../components/backend.jsx";
import EventCard from "../components/EventCard.jsx";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import DummyEventCard from "../components/DummyEventCard.jsx";


function ClubProfile () {

    const [club, setClub] = useState(null);
    const [loading,setLoading] = useState(true);
    const slug = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        backend
            //useParams() extracts the URL parameter as an object so slug.clubSlug gets the clubSlug field of the object
            .get(`/clubs/slug/${slug.clubSlug}`)
            .then((response) => {
                setClub(response.data);
                setLoading(false);
        })
            .catch(() => {
            navigate('/*');
        })
    },[slug])

    if(loading) {
        return (
            <section className="min-h-screen bg-stone-900 flex justify-center items-center">
                <h1 className="text-white text-2xl">Loading ...</h1>
            </section>
        )
    }

    return (
        <section className="min-h-screen bg-stone-900 flex flex-col items-center pb-20">
            <div className="bg-[#D9D9D9] min-h-56 w-full max-w-[860px]"></div>
            <div className="w-full space-y-5 p-6 max-w-[860px]">
                <div className="flex items-end justify-between">
                    <img src={dummyInitLogo} alt="dummy picture" className="rounded-full h-32 -mt-32"/>
                    <button 
                        className="bg-blue-600 text-white hover:bg-blue-500 rounded-md max-w-md h-10 w-2/12"
                        onClick={() => console.log("clicked")}
                    >
                        Follow
                    </button>

                </div>
                <div className="flex flex-col w-3/4">
                    <h1 className="font-inter text-white font-bold text-[42px]">{club.club_name}</h1>
                    <p className="font-inter text-gray-400 font-semibold mt-1">{club.description}</p>
                </div>
                <div>
                    <button onClick={() => console.log("Instagram")}>
                        <FaInstagram className="text-gray-400 size-6 hover:text-gray-200 mr-2"/>
                    </button>
                    <button onClick={() => console.log("X")}>
                        <RiTwitterXFill className="text-gray-400 size-6 hover:text-gray-200 mr-2"/>
                    </button>
                    <button onClick={() => console.log("LinkedIn")}>
                        <FaLinkedin className="text-gray-400 hover:text-gray-200 size-6"/>
                    </button>
                </div>

            </div>

            <div className="w-full max-w-[860px]">
                <div className="m-4">
                    <h3 className="text-white font-inter font-semibold text-3xl">Events</h3>
                </div>
                <div className="m-4">
                    <h5 className="text-white">This Week</h5>
                </div>
                <div className="flex gap-4 overflow-x-auto whitespace-nowrap no-scrollbar">
                    <div className="inline-flex gap-4 m-2">
                        <DummyEventCard/>
                        <DummyEventCard/>
                        <DummyEventCard/>
                        <DummyEventCard/>
                        <DummyEventCard/>
                        <DummyEventCard/>
                    </div>
                </div>
                <div className="flex items-end justify-between">
                    <div className="m-4">
                        <h5 className="text-white">Upcoming</h5>
                    </div>
                    <button className="bg-stone-900 text-white hover:text-pink-500 my-2 mr-2 rounded-md h-10"
                            onClick={() => console.log("See All")}>See All
                    </button>
                </div>
                <div className="flex gap-4 overflow-x-auto whitespace-nowrap no-scrollbar">
                    <div className="inline-flex gap-4 m-2">
                        <DummyEventCard/>
                        <DummyEventCard/>
                        <DummyEventCard/>
                        <DummyEventCard/>
                        <DummyEventCard/>
                        <DummyEventCard/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ClubProfile;

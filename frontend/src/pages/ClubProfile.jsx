import dummyInitLogo from "../assets/dummyInitLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import backend from "../components/backend.jsx";
import EventCard from "../components/EventCard.jsx";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";
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
            navigate("/*");
        })
    },[slug])

    if(loading) {
        return (
            <section className='min-h-screen bg-stone-900 flex justify-center items-center'>
                <h1 className="text-white text-2xl">Loading ...</h1>
            </section>
        )
    }

return (
    <section className="min-h-screen bg-stone-900 flex flex-col items-center">
        <div className="bg-stone-500 min-h-40 w-full"></div>
        <div className="w-full max-w-4xl space-y-5 p-6">
            <div className="flex items-end justify-between">
                <img src={dummyInitLogo} alt="dummy picture" className="rounded-full h-32 mt-6 -mt-28"/>
                <button className="bg-blue-600 text-white hover:bg-blue-500 rounded-md max-w-md h-10 w-2/12 "
                        onClick={() => console.log("clicked")}>Follow
                </button>

            </div>
            <div>
                <h1 className="text-white text-4xl mt-3">{club.club_name}</h1>
            </div>
            <div>
                <h5 className="text-gray-400 w-3/4 ">{club.description}</h5>
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

        <div className="w-full max-w-4xl ">
            <div className="m-4">
                <h3 className="text-white text-3xl">Events</h3>
            </div>
            <div className="m-4">
                <h5 className="text-white">This Week</h5>
            </div>
            <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
                <div className="inline-flex gap-4 ml-4">
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
                <button className="bg-stone-900 text-white hover:bg-stone-700  m-2 rounded-md max-w-md h-10 w-2/12 "
                        onClick={() => console.log("See All")}>See All
                </button>
            </div>
            <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
                <div className="inline-flex gap-4 ml-4">
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

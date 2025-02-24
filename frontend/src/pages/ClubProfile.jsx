import dummyInitLogo from "../assets/dummyInitLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import backend from "../components/backend.jsx";
import EventCard from "../components/EventCard.jsx";
function ClubProfile () {

    const [club, setClub] = useState(null);
    const[loading,setLoading] = useState(true);
    const clubId = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        backend
            //useParams() extracts the URL parameter as an object so clubId.clubId gets the clubId field of the object
            .get(`/clubs/${clubId.clubId}/`)
            .then((response) => {
                setClub(response.data);
                setLoading(false);
        })
            .catch(() => {
            navigate("/*");
        })
    },[clubId])

    if(loading) {
        return (
            <section className='min-h-screen bg-stone-900 flex justify-center items-center'>
                <h1 className="text-white text-2xl">Loading ...</h1>
            </section>
        )
    }

return (
    <section className="min-h-screen bg-stone-900 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-5">
            <div>
                <img src={dummyInitLogo} alt="dummy picture" className="rounded h-32 mt-6"/>
            </div>
            <div className="flex justify-between">
                    <h1 className="text-white text-4xl mt-3">{club.name}</h1>
                    <button className="bg-blue-600 text-white hover:bg-blue-500 rounded-md max-w-md h-10 w-2/12" onClick={()=>console.log("clicked")}>Follow</button>
            </div>
            <div>
                <h5 className="text-gray-400 w-3/4 ">{club.description}</h5>
            </div>
        </div>
        <hr className="w-full border-gray-600 my-5"/>

        <div className="w-full flex flex-col items-center">
            <div className="m-4">
                <h3 className="text-white text-3xl">Upcoming Events</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4 w-full">
                <EventCard/>
                <EventCard/>
                <EventCard/>
            </div>

            <div className="m-4">
                <h3 className="text-white text-3xl">Passed Events</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4 w-full">
                <EventCard/>
                <EventCard/>
                <EventCard/>
            </div>
        </div>
    </section>
);
}

export default ClubProfile;
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
            <section className='min-h-screen bg-stone-900 flex justify-center items-center'>
                <div className='grid place-items-center space-y-5'>
                    {/* Used to navigate to the "Create Event" screen for clubs,
                        cannot be accessible to students so it's commented out for now
                    <div className="ml-auto mt-10 mr-10 ">
                        <button
                            type="submit"
                            className='bg-blue-600 w-full max-w-md py-2 text-white hover:bg-blue-500 rounded-md'
                            onClick={() => navigate(`/create-event/${club.id}`)}
                        >Create Event
                        </button>
                    </div>*/}
                    <div>
                        <h1 className="text-white text-4xl mt-3">{club.name}</h1>
                    </div>
                    <div>
                        <img src={dummyInitLogo} alt="dummy picture" className="rounded h-52"/>
                    </div>
                    <div>
                        <h5 className="text-white text-2xl m-2 w-3/4 mx-auto text-center ">{club.description}</h5>
                    </div>
                    <hr/>
                    <div className="mt-3">
                        <h3 className="text-white text-3xl "> Upcoming Events</h3>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 w-full">
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-white text-3xl "> Passed Events</h3>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 w-full">
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                    </div>

                </div>
            </section>
    )
}
export default ClubProfile;
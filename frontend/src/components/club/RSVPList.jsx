import React, { useState, useEffect } from 'react';
import backend from "../../middleware/backend";

const RSVPList = ({eventId}) => {
    const [rsvpList,setRsvpList] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {

        if (!eventId){
            setError("No event ID was provided");
            setLoading(false);
            return;
        }
        backend.get(`events/${eventId}/rsvps/`)
        .then(response => {
            setRsvpList(response.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching RSVP list",err);
            setError("Failed to load RSVP list");
            setLoading(false);
        });
    }, [eventId]);

    if (loading) return <p>Loading RSVP list...</p>;
    if (error) return <p>{error}</p>

    return (
        <div className='rsvp-list'>
            <h2> RSVP List</h2>
            {rsvpList.length === 0 ? (
                <p>No RSVPs for this event yet.</p>
            ):(
                <ul>
                    {rsvpList.map(student => (
                        <li key = {student.user_id}>
                            <div className="student-card">
                                {student.user && student.user.profile_picture ? (
                                    <img 
                                        src={student.user.profile_picture} 
                                        alt={`${student.first_name}'s profile`} 
                                        className="profile-picture"
                                    />
                                ) : (
                                    <div className="profile-picture-placeholder">
                                        {student.first_name[0]}{student.last_name[0]}
                                    </div>
                                )}
                                <div className="student-info">
                                    <span className="student-name">{student.first_name} {student.last_name}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )
        };
        </div>
    );
};
export default RSVPList
import React from 'react'
import EventCard from '../components/EventCard'
import EventModal from '../components/EventModal'
import EventDetailsCard from '../components/EventDetailsCard'


// Temporary Page to visualize the EventCard component.
// http://localhost:5173/temp
function TempPage() {
  return (
    <div className='flex flex-col items-center justify-center bg-slate-950 p-10 min-h-screen pt-10'>
<EventDetailsCard
        title="Intro To LLMs"
        club="INIT FIU"
        day="Tuesday, March 19th"
        time="6:00 PM - 8:00 PM EST"
        description="Join us for an introductory workshop on Large Language Models (LLMs). Learn about the fundamentals of LLMs, their applications, and get hands-on experience with popular models. Perfect for beginners and intermediate developers interested in AI."
        universityName="Florida International University"
        roomLocation="PG 6 - 106"
        attendees={191}

/>
    </div>
  )
}

export default TempPage

import React from 'react'
import EventCard from '../components/EventCard'
import EventModal from '../components/EventModal'


// Temporary Page to visualize the EventCard component.

function TempPage() {
  return (
    <div className='flex flex-col items-center justify-center bg-slate-950 p-10 min-h-screen'>
      <EventCard />
      <EventModal/>
    </div>
  )
}

export default TempPage

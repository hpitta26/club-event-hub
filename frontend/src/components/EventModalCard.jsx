import { useState } from "react"
import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";
import { truncate } from "../utils/truncate";
import { dateFormat } from "../utils/dates";
import SurveyModal from "./SurveyModal";
import { FcSurvey } from "react-icons/fc";
import { LuAward } from "react-icons/lu";
import { RiSurveyLine } from "react-icons/ri";
function EventModalCard({ 
  title = "Untitled Event", 
  date = "TBD", 
  host = "Unknown Host", 
  image = dummyEventCardCover,
  upcoming = false,
}) {

    const [isSurveyOpen, setIsSurveyOpen] = useState(false)
    const openSurvey = () => {
        setIsSurveyOpen(true)
    }
    const closeSurvey = () => {
        setIsSurveyOpen(false)
    }
    

    return (
        <div className="container flex gap-3 w-full px-0 py-0 bg-white rounded-xl hover:bg-[#f7f7f5] transition border-[1.5px] border-black shadow-[2px_2px_0px_#000000]">
            <div className="relative w-24 h-auto p-0 aspect-square flex-shrink-0 rounded-l-xl overflow-hidden border-r-2 border-black">
                {/* Spirit Points Badge */}
                { upcoming ? 
                    <div className="absolute top-1 left-1 bg-yellow-100 text-black text-[10px] px-1.5 py-px rounded-[3px] border-solid border border-black flex items-center gap-1">
                        <LuAward className="h-3 w-3" />
                        20
                    </div>
                    :
                    <></>
                }
                <img 
                    src={dummyEventCardCover} 
                    alt="Event" 
                    className="w-full h-full object-cover" 
                /> {/* Event Image */}
            </div>
            <div className="ml-2 flex flex-col gap-1 justify-center flex-grow py-2">
                {/* Event Title */}
                <p className="text-black text-lg font-bold leading-tight">
                    {truncate(title, 29)} 
                </p>               
                {/* Event Date */}
                <p className="text-black font-semibold text-xs mt-1">
                    {dateFormat(date)}
                </p>
                {/* Event Host */}
                <p className="text-black font-semibold text-xs">
                    Hosted by: {host}
                </p>
            </div>
            { !upcoming ? 
                <div className="flex items-end justify-center p-2 mr-2 mb-2 self-end">
                    <div className="flex items-center bg-blue-400 rounded-md py-1 px-2 cursor-pointer border-2 border-black rounded-lg hover:shadow-[2px_2px_0_#000] transition-all duration-200" onClick={openSurvey}> 
                        <FcSurvey size={20} className="mr-1"/>
                        <div className="font-bold text-white text-sm">Survey</div>
                    </div>
                </div>
                :
                <></>
            }

            <SurveyModal
                isOpen={isSurveyOpen}
                onClose={closeSurvey}
                eventName={'Art Event 2'}
                eventDate={'eventDate eventTime'}
                eventHost={'GatherU'}
            />

            
        </div>
    );
};

export default EventModalCard;  
import { useState } from "react"
import dummyEventCardCover from "../../assets/dummyEventCardCover.jpg";
import { truncate } from "../../utils/truncate";
import { dateFormat } from "../../utils/dates";
import SurveyModal from "./SurveyModal";
import { FcSurvey } from "react-icons/fc";
import { LuAward } from "react-icons/lu";
import {FiX} from "react-icons/fi";

function EventModalCard({ 
  title = "Untitled Event", 
  date = "TBD", 
  host = "Unknown Host", 
  profilebanner = "",
  upcoming = false,
  onClose
}) {

    const [isSurveyOpen, setIsSurveyOpen] = useState(false)
    const openSurvey = () => {
        setIsSurveyOpen(true)
    }
    const closeSurvey = () => {
        setIsSurveyOpen(false)
    }


    return (
        <div className="container flex gap-3 w-full px-4 py-4 bg-white rounded-xl hover:bg-[#f7f7f5] transition border-[1.5px] border-black shadow-[2px_2px_0px_#000000]">
            <div className="relative w-[104px] h-[104px] flex-shrink-0 rounded-lg overflow-hidden border-2 border-black">
                {/* Spirit Points Badge */}
                { upcoming ? 
                    <div className="absolute top-1 left-1 bg-yellow-100 text-black text-[10px] px-1.5 py-px rounded-[3px] border-solid border border-black flex items-center gap-1">
                        <LuAward className="h-3 w-3" />
                        20
                    </div>
                    :
                    <></>
                }
                <img src={profilebanner || dummyEventCardCover} alt="Event" className="w-full h-full object-cover" /> {/* Event Image */}
            </div>
            <div className="ml-1 flex flex-col gap-3 justify-center">
                {/* Event Date */}
                <p className="text-black font-semibold text-xs">
                    {dateFormat(date)}
                </p>
                {/* Event Title */}
                <p className="text-black text-sm font-bold leading-none">
                    {truncate(title, 12)} 
                </p>
                {/* Event Host */}
                <p className="text-black font-semibold text-xs">
                    Hosted by: {host}
                </p>
            </div>
            { !upcoming ?
                <div className="flex items-center">
                    <div className="bg-green-400 rounded-md py-1 px-1 cursor-pointer border-[1.5px] border-black" onClick={openSurvey}>
                        <FcSurvey className="w-12 h-12" />
                    </div>
                </div>
                :
                 <div className="flex items-center text-center">
                     <div className="bg-blue-500 rounded-md py-1 px-1 cursor-pointer border-[1.5px] border-black"
                          onClick={onClose}>
                          <FiX/>
                     </div>
                 </div>

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

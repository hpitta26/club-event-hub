import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";

function DummyEventCard (){
    return (
        <div
            className="container flex flex-col items-center bg-[#D9D9D9] w-[190px] h-[215px] px-4 pt-5 rounded-[20px]">
            <img src={dummyEventCardCover} alt=""
                 className="rounded-lg w-full h-38 object-cover object-bottom"/>
            <p className="m-4">Some Event</p>
        </div>

    )
}
export default DummyEventCard;
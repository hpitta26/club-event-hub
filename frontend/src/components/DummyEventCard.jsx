import dummyEventCardCover from "../assets/dummyEventCardCover.jpg";

function DummyEventCard (){
    return (
        <div
            className="container flex flex-col items-center p-28 bg-[#F5F5F5] w-72 h-95 px-4 py-5 rounded-3xl">
            <img src={dummyEventCardCover} alt=""
                 className="rounded-lg w-full h-48 object-cover object-bottom"/>
            <p className="m-8">Event Card Placeholder</p>
        </div>

    )
}
export default DummyEventCard;
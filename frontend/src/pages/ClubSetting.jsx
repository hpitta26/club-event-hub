import dummyInitLogo from "../assets/dummyInitLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import backend from "../components/backend.jsx";
import EventCard from "../components/EventCard.jsx";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import DummyEventCard from "../components/DummyEventCard.jsx";

function ClubSetting() {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const slug = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  useEffect(() => {
    backend
      //useParams() extracts the URL parameter as an object so slug.clubSlug gets the clubSlug field of the object
      .get(`clubs/`)
      .then((response) => {
        setClub(response.data);
        console.log("response")
        console.log(response.data)
        console.log(club)
        setLoading(false);
      })
      .catch(() => {
        navigate("/*");
      });
  }, [slug]);

  if (loading) {
    return (
      <section className="min-h-screen bg-stone-900 flex justify-center items-center">
        <h1 className="text-white text-2xl">Loading ...</h1>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex justify-center items-center ">
      <div className="flex-col w-2/4">
        <div>
          <div className="rounded-2xl">
            <label
              htmlFor="bannerUpload"
              className="block relative cursor-pointer"
            >
              <div className="bg-stone-500 h-20 w-full hover:opacity-50 rounded-2xl "></div>
            </label>
            <input
              type="file"
              id="bannerUpload"
              className="hidden"
              // onChange={handleProfileUpload}
              accept="image/*"
            />
          </div>
        </div>

        <div className="flex mt-6">
          <div className="">
            <div className="w-full max-w-4xl ">
              <div className="">
                <div>
                  <label htmlFor="profileUpload" className="block relative">
                    <img
                      src={dummyInitLogo}
                      alt="dummy picture"
                      className="rounded-full h-24 hover:cursor-pointer hover:opacity-50"
                    />
                  </label>
                  <input
                    type="file"
                    id="profileUpload"
                    className="hidden"
                    // onChange={handleBannerUpload}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-col pl-6 pt-4">
            <h2 className="text-xl font-semibold">
              {club?.club_name || "Club Name"}
            </h2>
            <p className="text-gray-600">{club?.user?.email || "club@example.com"}</p>
          </div>
        </div>

        <div className="flex mt-6">
          <div className="w-1/2">
            <div className="flex flex-col mt-1">
              <label>Twitter</label>
              <input
                name="twitter"
                // onChange={handleLinkChange}
                className=" text-black bg-[#A6A6A6] outline-none pl-1"
                // value={formData.social_media_handles.twitter}
              ></input>
            </div>
            <div className="flex flex-col mt-3">
              <label>Instagram</label>
              <input
                name="instagram"
                // onChange={handleLinkChange}
                className=" text-black bg-[#A6A6A6] outline-none pl-1"
                // value={formData.social_media_handles.instagram}
              ></input>
            </div>
            <div className="flex flex-col mt-3">
              <label>linkedIn</label>
              <input
                name="linkedIn"
                // onChange={handleLinkChange}
                className=" text-black bg-[#A6A6A6] outline-none pl-1"
                // value={formData.social_media_handles.linkedIn}
              ></input>
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex-col pl-12">
              <label>Bio</label>

              <textarea
                name="description"
                // onChange={handleChange}
                className=" text-black bg-[#A6A6A6] outline-none p-2 rounded-md resize-none h-40 w-full"
                // value={formData.description}
              ></textarea>
            </div>
          </div>
        </div>

        <div>
          <button
            className="bg-[#f12fad] text-black mt-6 p-2 hover:opacity-60"
            // onClick={updateClubInfo}
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}
// }

export default ClubSetting;

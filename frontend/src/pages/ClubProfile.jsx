import dummyInitLogo from "../assets/dummyInitLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import backend from "../components/backend.jsx";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { UserContext } from "../context/UserContext.jsx";
import DummyEventCard from "../components/DummyEventCard.jsx";

function ClubProfile() {
  // const userContext = useContext(UserContext);

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const slug = useParams();
  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    backend
      //useParams() extracts the URL parameter as an object so slug.clubSlug gets the clubSlug field of the object
      .get(`/clubs/slug/${slug.clubSlug}/`)
      .then((response) => {
        setClub(response.data);
        setPageData(response.data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/*");
      });
  }, [slug]);

  function setPageData(data) {
    backend
      .get(`/check-user-following/${data.user_id}/`)
      .then((followingData) => {
        setIsFollowing(followingData.data);
        console.log(isFollowing);
      });
  }

  function handleFollow(clubID) {
    backend.patch(`/follow-club/${clubID}/`);
    setIsFollowing(true);
  }
  if (loading) {
    return (
      <section className="min-h-screen bg-stone-900 flex justify-center items-center pt-10">
        <h1 className="text-white text-2xl">Loading ...</h1>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-stone-900 flex flex-col items-center pb-20 pt-10">
      <div className="bg-[#D9D9D9] min-h-56 w-full max-w-[860px]"></div>
      <div className="w-full space-y-5 p-6 max-w-[860px]">
        <div className="flex items-end justify-between">
          <img
            src={dummyInitLogo}
            alt="dummy picture"
            className="rounded-full h-32 -mt-32"
          />
          <button
            className="bg-blue-600 text-white hover:bg-blue-500 rounded-md max-w-md h-10 w-2/12"
            onClick={() => handleFollow()}
          >
            Follow
          </button>
        </div>
        <div className="flex flex-col w-3/4">
          <h1 className="font-inter text-white font-bold text-[42px]">
            {club.club_name}
          </h1>
          <p className="font-inter text-gray-400 font-semibold mt-1">
            {club.description}
          </p>
        </div>
        <div>
          <button onClick={() => console.log("Instagram")}>
            <FaInstagram className="text-gray-400 size-6 hover:text-gray-200 mr-2" />
          </button>
          <button onClick={() => console.log("X")}>
            <RiTwitterXFill className="text-gray-400 size-6 hover:text-gray-200 mr-2" />
          </button>
          <button onClick={() => console.log("LinkedIn")}>
            <FaLinkedin className="text-gray-400 hover:text-gray-200 size-6" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl ">
        <div className="m-4">
          <h3 className="text-white text-3xl">Events</h3>
        </div>
        <div className="m-4">
          <h5 className="text-white">This Week</h5>
        </div>
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
          <div className="inline-flex gap-4 m-2">
            <DummyEventCard />
            <DummyEventCard />
            <DummyEventCard />
            <DummyEventCard />
            <DummyEventCard />
            <DummyEventCard />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="m-4">
            <h5 className="text-white">Upcoming</h5>
          </div>
          <button
            className="bg-stone-900 text-white hover:bg-stone-700  m-2 rounded-md max-w-md h-10 w-2/12 "
            onClick={() => console.log("See All")}
          >
            See All
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
          <div className="inline-flex gap-4 m-2">
            <DummyEventCard />
            <DummyEventCard />
            <DummyEventCard />
            <DummyEventCard />
            <DummyEventCard />
            <DummyEventCard />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-stone-900 rounded-xl text-white w-[80vw] max-w-4xl ">
            <div>
              <div>
                <label
                  htmlFor="bannerUpload"
                  className="block relative cursor-pointer"
                >
                  <div className="bg-stone-500 h-20 w-full hover:opacity-50"></div>
                </label>
                <input
                  type="file"
                  id="bannerUpload"
                  className="hidden"
                  onChange={handleProfileUpload}
                  accept="image/*"
                />
              </div>

              <div className="w-full max-w-4xl space-y-5 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <label
                      htmlFor="profileUpload"
                      className="block relative cursor-pointer"
                    >
                      <img
                        src={dummyInitLogo}
                        alt="dummy picture"
                        className="rounded-full h-24 -mt-12 hover:opacity-50"
                      />
                    </label>
                    <input
                      type="file"
                      id="profileUpload"
                      className="hidden"
                      onChange={handleBannerUpload}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* <h1 className="text-4xl">
                    Edit Profile
                </h1>   */}

              <div className="flex flex-col">
                <label>Bio</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  className=" text-black bg-[#A6A6A6] outline-none p-2 rounded-md resize-none h-30 "
                  value={formData.description}
                ></textarea>
              </div>

              <h1 className="text-2xl mt-3">Social Medias</h1>

              <div className="flex flex-col mt-1">
                <label>Twitter</label>
                <input
                  name="twitter"
                  onChange={handleLinkChange}
                  className=" text-black bg-[#A6A6A6] outline-none pl-1"
                  value={formData.social_media_handles.twitter}
                ></input>
              </div>

              <div className="flex flex-col mt-3">
                <label>Instagram</label>
                <input
                  name="instagram"
                  onChange={handleLinkChange}
                  className=" text-black bg-[#A6A6A6] outline-none pl-1"
                  value={formData.social_media_handles.instagram}
                ></input>
              </div>

              <div className="flex flex-col mt-3">
                <label>linkedIn</label>
                <input
                  name="linkedIn"
                  onChange={handleLinkChange}
                  className=" text-black bg-[#A6A6A6] outline-none pl-1"
                  value={formData.social_media_handles.linkedIn}
                ></input>
              </div>

              <div className="">
                <button
                  className="bg-[#D9D9D9] text-black mt-6 p-2 hover:opacity-60"
                  onClick={updateClubInfo}
                >
                  Save Changes
                </button>

                <button
                  className="bg-[#D9D9D9] text-black mt-6 p-2 hover:opacity-60"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
// }

export default ClubProfile;

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import backend from "../components/backend.jsx";
import { MdOutlineFileUpload } from "react-icons/md";

function ClubSetting() {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const slug = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileBanner, setProfileBanner] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    social_media_handles: {
      twitter: "",
      instagram: "",
      linkedIn: "",
    },
    club_picture: null,
    club_banner: null,
  });

  useEffect(() => {
    backend
      //useParams() extracts the URL parameter as an object so slug.clubSlug gets the clubSlug field of the object
      .get(`clubs/`)
      .then((response) => {
        setClub(response.data);
        console.log("response");
        console.log(response.data);
        console.log(club);
        setLoading(false);
      })
      .catch(() => {
        navigate("/*");
      });

    async function fetchClubProfilePic() {
      try {
        // This is based on the URLs defined in urls.py
        const response = await backend.get("club-profile-image/");
        setProfileImage(response.data.image_url);
        console.log("Profile image URL: ", response.data.image_url);
      } catch (error) {
        console.error("Error fetching profile image:", error);
        setProfileImage(null);
      }
    }

    async function fetchClubProfileBanner() {
      try {
        const response = await backend.get("club-banner-image/");
        setProfileBanner(response.data.image_url);
      } catch (error) {
        console.error("Error fetching Banner image:", error);
        setProfileBanner(null);
      }
    }

    fetchClubProfileBanner();
    fetchClubProfilePic();
  }, [slug]);

  const handleBannerSubmit = async (e) => {
    if (formData.club_banner !== null) {
      const uploadData = new FormData();
      uploadData.append("banner_image_url", formData.club_banner);
      console.log("file that will be submitted", uploadData.get('banner_image_url'))
      try {
        const response = await backend.post("club-banner-image/", uploadData, {
          headers: {}
        });
        console.log("Profile image updated successfully:", response.data);
      } catch (error) {
        console.error("Error uploading banner image:", error);
      }
    }
  };

  const handleProfileSubmit = async (e) => {
    if (formData.club_picture !== null){
      const uploadData = new FormData();
      uploadData.append("profile_image_url", formData.club_picture);
      console.log("file that will be submitted", uploadData.get('profile_image_url'))
      try {
        const response = await backend.post("club-profile-image/", uploadData, {
          headers: {}
        });
        console.log("Profile image updated with: ", response.image_url)
      }
      catch(error) {
        console.error("Erorr with profile upload: ", error)
      }
    }
  }

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, club_picture: file }));
    console.log("uploaded Profile pic:", file);
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, club_banner: file }));
    console.log("uploaded banner pic:", file);
  };


  const handleText = async(e) =>{

    var updatedFormInfo = new FormData()
    updatedFormInfo.append("description", formData.description)
    updatedFormInfo.append("social_media_handles", JSON.stringify(formData.social_media_handles))
    console.log("updatedFormInfo", updatedFormInfo)
    console.log("Form data", formData)
    try{
    const response = await backend.patch(
      `clubs/`, updatedFormInfo,
        {
          headers: { 'Content-Type': "multipart/form-data" },
        })  
        console.log("Bruh", JSON.stringify(response))
    
    }
    catch(error){
      console.error("Error with profile upload: ", error)
    }   
  }


  function handleSubmit() {
    handleText();
    handleProfileSubmit();
    handleBannerSubmit();
    // window.location.reload();
  }

  const handleLinkChange = (e) =>{
    const {name, value} = e.target
    setFormData((prevData) => ({
      ...prevData, social_media_handles:{
        ...prevData.social_media_handles,
        [name]: value,
      }
    }))
  }

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ 
      ...prev, [e.target.name]: e.target.value 
    }));
  };


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
              <div className="bg-stone-500 h-[140px] w-full hover:opacity-50 rounded-3xl relative">
                <img
                  src={profileBanner}
                  alt="dummy banner"
                  className="w-full h-full rounded-3xl object-cover"
                ></img>
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl flex justify-center items-center text-white">
                  <MdOutlineFileUpload className="text-white w-6 h-6" /> Upload Banner
                </div>
              </div>
            </label>
            <input
              type="file"
              id="bannerUpload"
              className="hidden"
              onChange={handleBannerUpload}
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
                      src={profileImage}
                      alt="dummy picture"
                      className="rounded-full h-24 w-24 hover:cursor-pointer hover:opacity-50 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex justify-center items-center text-white">
                      <MdOutlineFileUpload className="text-white w-6 h-6" />
                    </div>
                  </label>
                  <input
                    type="file"
                    id="profileUpload"
                    className="hidden"
                    onChange={handleProfileUpload}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-col pl-6 pt-4">
            <h2 className="text-xl font-semibold font-['Pramukh Rounded'] font-semibold">
              {club?.club_name || "Club Name"}
            </h2>
            <p className="text-gray-600 font-['Pramukh Rounded'] font-semibold">
              {club?.user?.email || "club@example.com"}
            </p>
          </div>
        </div>

        <div className="flex mt-6">
          <div className="w-1/2">
            <div className="flex flex-col mt-1">
              <label className="font-['Pramukh Rounded'] font-semibold">Twitter</label>
              <input
                name="twitter"
                onChange={handleLinkChange}
                className=" text-black bg-[#D9D2D6]  p-2 placeholder-gray-600 rounded-md border-[1.5px] border-black pl-1 "
                value={formData.social_media_handles.twitter}
              ></input>
            </div>
            <div className="flex flex-col mt-3">
              <label className="font-['Pramukh Rounded'] font-semibold">Instagram</label>
              <input
                name="instagram"
                onChange={handleLinkChange}
                className="text-black bg-[#D9D2D6]  p-2 placeholder-gray-600 rounded-md border-[1.5px] border-black pl-1"
                value={formData.social_media_handles.instagram}
              ></input>
            </div>
            <div className="flex flex-col mt-3">
              <label className="font-['Pramukh Rounded'] font-semibold">linkedIn</label>
              <input
                name="linkedIn"
                onChange={handleLinkChange}
                className="text-black bg-[#D9D2D6]  p-2 placeholder-gray-600 rounded-md border-[1.5px] border-black pl-1"
                value={formData.social_media_handles.linkedIn}
              ></input>
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex-col pl-12">
              <label className="font-['Pramukh Rounded'] font-semibold">Bio</label>

              <textarea
                name="description"
                onChange={handleChange}
                className="  outline-none p-2 resize-none h-40 w-full text-black bg-[#D9D2D6] placeholder-gray-600 rounded-md border-[1.5px] border-black"
                value={formData.description}
              ></textarea>
            </div>
          </div>
        </div>

        <div>
          <button
            className="bg-[#FD4EB7] rounded-md border-black border-[1.5px] p-2 mt-6"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}

export default ClubSetting;

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import backend from "../components/backend.jsx";
import { MdOutlineFileUpload } from "react-icons/md";
import { UserContext } from "../context/UserContext.jsx";

function ClubSetting() {
  const [loading, setLoading] = useState(true);
  const slug = useParams();
  const navigate = useNavigate();
  const { updateProfilePic, updateBanner } = useContext(UserContext);
  const [formData, setFormData] = useState({
    club_name: "",
    email: "",
    description: "",
    social_media_handles: {
      twitter: "",
      instagram: "",
      linkedIn: "",
    },
    profile_picture: "",
    profile_picture_url: "",
    club_banner: "",
    club_banner_url: "",
  });

  useEffect(() => {
    backend
      //useParams() extracts the URL parameter as an object so slug.clubSlug gets the clubSlug field of the object
      .get(`clubs/`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/*");
      });
  }, [slug]);

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData((prev) => ({ ...prev, profile_picture: file, profile_picture_url: URL.createObjectURL(file) }));
        console.log("uploaded Profile pic:", file);
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData((prev) => ({ ...prev, club_banner: file, club_banner_url: URL.createObjectURL(file) }));
        console.log("uploaded banner pic:", file);
    }
  };




  async function handleSubmit() {
    console.log("Form data", formData)
    try{
        const payload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
        if (key === 'social_media_handles') {
            Object.entries(value).forEach(([subKey, subVal]) => {
                payload.append(`social_media_handles.${subKey}`, subVal);
            });
        } else if (value !== null && value !== "") {
            payload.append(key, value);
        }
        });

        const response = await backend.patch('/clubs/', payload,  {
            headers: { 'Content-Type': "multipart/form-data" }
        });

        console.log("TEST", response)
        console.log(response.data.user.profile_picture)
        console.log(response.data.club_banner)

        if (response.status === 200) {
            updateProfilePic(response.data.user.profile_picture);
            updateBanner(response.data.club_banner);
        }
    } catch(error){
      console.error("Error with profile upload: ", error)
    }   
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
                  src={formData.club_banner_url}
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
                      src={formData.profile_picture_url}
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
              {formData.club_name || "Club Name"}
            </h2>
            <p className="text-gray-600 font-['Pramukh Rounded'] font-semibold">
              {formData.email || "club@example.com"}
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
                value={formData.social_media_handles?.twitter || ""}
              ></input>
            </div>
            <div className="flex flex-col mt-3">
              <label className="font-['Pramukh Rounded'] font-semibold">Instagram</label>
              <input
                name="instagram"
                onChange={handleLinkChange}
                className="text-black bg-[#D9D2D6]  p-2 placeholder-gray-600 rounded-md border-[1.5px] border-black pl-1"
                value={formData.social_media_handles?.instagram || ""}
              ></input>
            </div>
            <div className="flex flex-col mt-3">
              <label className="font-['Pramukh Rounded'] font-semibold">linkedIn</label>
              <input
                name="linkedIn"
                onChange={handleLinkChange}
                className="text-black bg-[#D9D2D6]  p-2 placeholder-gray-600 rounded-md border-[1.5px] border-black pl-1"
                value={formData.social_media_handles?.linkedIn || ""}
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

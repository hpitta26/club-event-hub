// import dummyInitLogo from "../assets/dummyInitLogo.png";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import backend from "../components/backend.jsx";
// import EventCard from "../components/EventCard.jsx";
// import { FaInstagram } from "react-icons/fa";
// import { RiTwitterXFill } from "react-icons/ri";
// import { FaLinkedin } from "react-icons/fa";
// import DummyEventCard from "../components/DummyEventCard.jsx";

// function ClubProfile() {
//   const [club, setClub] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const slug = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(false);

//   //for the modal
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     description: "",
//     social_media_handles: {
//       twitter: "",
//       instagram: "",
//       linkedIn: "",
//     },
//     club_picture: null,
//     club_banner: null,
//   });

//   //   const openModal = () => setIsModalOpen(false);

//   function openModal() {
//     setIsModalOpen(true);
//     console.log("Model is opened");
//   }

//   function closeModal(){
//     setIsModalOpen(false);
//     console.log("Model is opened");
//   }
//   //   const openModal = () => setIsModalOpen(true);
//   //   const closeModal = () => setIsModalOpen(true);

//   useEffect(() => {
//     backend
//       //useParams() extracts the URL parameter as an object so slug.clubSlug gets the clubSlug field of the object
//       .get(`/clubs/slug/${slug.clubSlug}`)
//       .then((response) => {
//         setClub(response.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         navigate("/*");
//       });
//   }, [slug]);

//   if (loading) {
//     return (
//       <section className="min-h-screen bg-stone-900 flex justify-center items-center">
//         <h1 className="text-white text-2xl">Loading ...</h1>
//       </section>
//     );
//   }

//   const updateClubInfo = async (e) => {
//     // e.preventDefault();
//     try {
//       console.log(formData);
//       var updatedFormInfo = new FormData();
//       updatedFormInfo.append("description", formData.description);
//       updatedFormInfo.append(
//         "social_media_handles",
//         JSON.stringify(formData.social_media_handles)
//       );
//       if (formData.club_picture) {
//         updatedFormInfo.append("club_picture", formData.club_picture);
//       }
//       if (formData.club_banner) {
//         updatedFormInfo.append("club_banner", formData.club_banner);
//       }

//       // const requestBody = {
//       //   ...formData,
//       //   social_media_handles: JSON.stringify(formData.social_media_handles),
//       // };
//       const response = await backend.patch(
//         `clubs/slug/${slug.clubSlug}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       console.log("club was successfully update with ", updatedFormInfo);
//       console.log(JSON.stringify(response));
//       window.location.reload();
//     } catch (error) {
//       console.log(JSON.stringify(formData));

//       console.log("Failed to update club information \n", error.message);
//     }
//   };

//   const handleChange = (e) => {
//     e.preventDefault();
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleProfileUpload = (e) => {
//     const file = e.target.files[0];
//     setFormData((prev) => ({ ...prev, club_picture: file }));
//     console.log("uploaded file", file);
//   };

//   const handleBannerUpload = (e) => {
//     const file = e.target.files[0];
//     setFormData((prev) => ({ ...prev, club_banner: file }));
//   };

//   const handleLinkChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prevData) => ({
//       ...prevData,
//       social_media_handles: {
//         ...prevData.social_media_handles,
//         [name]: value,
//       },
//     }));
//   };

//   // if(user){
//   // return (
//   //     <section className="min-h-screen bg-stone-900 flex flex-col items-center">
//   //         <div className="bg-stone-500 min-h-56 w-full"></div>
//   //         <div className="w-full max-w-4xl space-y-5 p-6">
//   //             <div className="flex items-end justify-between">
//   //                 <img src={dummyInitLogo} alt="dummy picture" className="rounded-full h-32 -mt-32"/>
//   //                 <button className="bg-blue-600 text-white hover:bg-blue-500 rounded-md max-w-md h-10 w-2/12 "
//   //                         onClick={() => console.log("clicked")}>Follow
//   //                 </button>

//   //             </div>
//   //             <div>
//   //                 <h1 className="text-white text-4xl mt-3">{club.club_name}</h1>
//   //             </div>
//   //             <div>
//   //                 <h5 className="text-gray-400 w-3/4 ">{club.description}</h5>
//   //             </div>
//   //             <div>
//   //                 <button onClick={() => console.log("Instagram")}>
//   //                     <FaInstagram className="text-gray-400 size-6 hover:text-gray-200 mr-2"/>
//   //                 </button>
//   //                 <button onClick={() => console.log("X")}>
//   //                     <RiTwitterXFill className="text-gray-400 size-6 hover:text-gray-200 mr-2"/>
//   //                 </button>
//   //                 <button onClick={() => console.log("LinkedIn")}>
//   //                     <FaLinkedin className="text-gray-400 hover:text-gray-200 size-6"/>
//   //                 </button>
//   //             </div>

//   //         </div>

//   //         <div className="w-full max-w-4xl ">
//   //             <div className="m-4">
//   //                 <h3 className="text-white text-3xl">Events</h3>
//   //             </div>
//   //             <div className="m-4">
//   //                 <h5 className="text-white">This Week</h5>
//   //             </div>
//   //             <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
//   //                 <div className="inline-flex gap-4 m-2">
//   //                     <DummyEventCard/>
//   //                     <DummyEventCard/>
//   //                     <DummyEventCard/>
//   //                     <DummyEventCard/>
//   //                     <DummyEventCard/>
//   //                     <DummyEventCard/>
//   //                 </div>
//   //             </div>
//   //             <div className="flex items-end justify-between">
//   //                 <div className="m-4">
//   //                     <h5 className="text-white">Upcoming</h5>
//   //                 </div>
//   //                 <button className="bg-stone-900 text-white hover:bg-stone-700  m-2 rounded-md max-w-md h-10 w-2/12 "
//   //                         onClick={() => console.log("See All")}>See All
//   //                 </button>
//   //             </div>
//   //             <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
//   //                 <div className="inline-flex gap-4 m-2">
//   //                     <DummyEventCard/>
//   //                     <DummyEventCard/>
//   //                     <DummyEventCard/>
//   //                     <DummyEventCard/>
//   //                     <DummyEventCard/>
//   //                     <DummyEventCard/>
//   //                 </div>
//   //             </div>
//   //         </div>
//   //     </section>
//   // );
//   // }
//   // else;{
//   return (
//     <section className="min-h-screen bg-stone-900 flex flex-col items-center">
//       <div className="bg-stone-500 min-h-56 w-full"></div>
//       <div className="w-full max-w-4xl space-y-5 p-6">
//         <div className="flex items-end justify-between">
//           <img
//             src={dummyInitLogo}
//             alt="dummy picture"
//             className="rounded-full h-32 -mt-32"
//           />
//           <button
//             className="bg-blue-600 text-white hover:bg-blue-500 rounded-md max-w-md h-10 w-2/12 "
//             onClick={openModal}
//           >
//             Customzie
//           </button>
//         </div>
//         <div>
//           <h1 className="text-white text-4xl mt-3">{club.club_name}</h1>
//         </div>
//         <div>
//           <h5 className="text-gray-400 w-3/4 ">{club.description}</h5>
//         </div>
//         <div>
//           <button onClick={() => console.log("Instagram")}>
//             <FaInstagram className="text-gray-400 size-6 hover:text-gray-200 mr-2" />
//           </button>
//           <button onClick={() => console.log("X")}>
//             <RiTwitterXFill className="text-gray-400 size-6 hover:text-gray-200 mr-2" />
//           </button>
//           <button onClick={() => console.log("LinkedIn")}>
//             <FaLinkedin className="text-gray-400 hover:text-gray-200 size-6" />
//           </button>
//         </div>
//       </div>

//       <div className="w-full max-w-4xl ">
//         <div className="m-4">
//           <h3 className="text-white text-3xl">Events</h3>
//         </div>
//         <div className="m-4">
//           <h5 className="text-white">This Week</h5>
//         </div>
//         <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
//           <div className="inline-flex gap-4 m-2">
//             <DummyEventCard />
//             <DummyEventCard />
//             <DummyEventCard />
//             <DummyEventCard />
//             <DummyEventCard />
//             <DummyEventCard />
//           </div>
//         </div>
//         <div className="flex items-end justify-between">
//           <div className="m-4">
//             <h5 className="text-white">Upcoming</h5>
//           </div>
//           <button
//             className="bg-stone-900 text-white hover:bg-stone-700  m-2 rounded-md max-w-md h-10 w-2/12 "
//             onClick={() => console.log("See All")}
//           >
//             See All
//           </button>
//         </div>
//         <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
//           <div className="inline-flex gap-4 m-2">
//             <DummyEventCard />
//             <DummyEventCard />
//             <DummyEventCard />
//             <DummyEventCard />
//             <DummyEventCard />
//             <DummyEventCard />
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-stone-900 rounded-xl text-white w-[80vw] max-w-4xl ">
//             <div>
//               <div>
//                 <label
//                   htmlFor="bannerUpload"
//                   className="block relative cursor-pointer"
//                 >
//                   <div className="bg-stone-500 h-20 w-full hover:opacity-50"></div>
//                 </label>
//                 <input
//                   type="file"
//                   id="bannerUpload"
//                   className="hidden"
//                   onChange={handleProfileUpload}
//                   accept="image/*"
//                 />
//               </div>

//               <div className="w-full max-w-4xl space-y-5 p-6">
//                 <div className="flex items-end justify-between">
//                   <div>
//                     <label
//                       htmlFor="profileUpload"
//                       className="block relative cursor-pointer"
//                     >
//                       <img
//                         src={dummyInitLogo}
//                         alt="dummy picture"
//                         className="rounded-full h-24 -mt-12 hover:opacity-50"
//                       />
//                     </label>
//                     <input
//                       type="file"
//                       id="profileUpload"
//                       className="hidden"
//                       onChange={handleBannerUpload}
//                       accept="image/*"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="p-8">
//               {/* <h1 className="text-4xl">
//                     Edit Profile
//                 </h1>   */}

//               <div className="flex flex-col">
//                 <label>Bio</label>
//                 <textarea
//                   name="description"
//                   onChange={handleChange}
//                   className=" text-black bg-[#A6A6A6] outline-none p-2 rounded-md resize-none h-30 "
//                   value={formData.description}
//                 ></textarea>
//               </div>

//               <h1 className="text-2xl mt-3">Social Medias</h1>

//               <div className="flex flex-col mt-1">
//                 <label>Twitter</label>
//                 <input
//                   name="twitter"
//                   onChange={handleLinkChange}
//                   className=" text-black bg-[#A6A6A6] outline-none pl-1"
//                   value={formData.social_media_handles.twitter}
//                 ></input>
//               </div>

//               <div className="flex flex-col mt-3">
//                 <label>Instagram</label>
//                 <input
//                   name="instagram"
//                   onChange={handleLinkChange}
//                   className=" text-black bg-[#A6A6A6] outline-none pl-1"
//                   value={formData.social_media_handles.instagram}
//                 ></input>
//               </div>

//               <div className="flex flex-col mt-3">
//                 <label>linkedIn</label>
//                 <input
//                   name="linkedIn"
//                   onChange={handleLinkChange}
//                   className=" text-black bg-[#A6A6A6] outline-none pl-1"
//                   value={formData.social_media_handles.linkedIn}
//                 ></input>
//               </div>

//               <div className="">
//                 <button
//                   className="bg-[#D9D9D9] text-black mt-6 p-2 hover:opacity-60"
//                   onClick={updateClubInfo}
//                 >
//                   Save Changes
//                 </button>

//                 <button
//                   className="bg-[#D9D9D9] text-black mt-6 p-2 hover:opacity-60"
//                   onClick={closeModal}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }
// // }

// export default ClubProfile;

import dummyInitLogo from "../assets/dummyInitLogo.png";
import { MdOutlineFileUpload } from "react-icons/md";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext.jsx";
import backend from "../components/backend.jsx";
import {useNavigate} from "react-router-dom";

function StudentSettings(){

    const{userContext,Login} = useContext(UserContext);
    const [globalEmail, setGlobalEmail] = useState(""); // Separate state for email at the top of the screen
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        major: "",
        graduation_year: ""
    })

    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchUserDetails(){
            try{
                const response = await backend.get(`/students/${userContext?.id}`);
                if(response.data){
                    setGlobalEmail(response.data.user.email);
                    setFormData({
                        username: response.data.user.email.split("@")[0],
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        email: response.data.user.email,
                        major: response.data.major,
                        graduation_year: response.data.graduation_year,
                        }
                    );
                }
            }
            catch(error){
                console.error("Error fetching user data: ",error);
                navigate("/*");
            }
        }
        if (userContext){
            fetchUserDetails();
        }
    },[])

    const handleChange = (e) =>{
        e.preventDefault();
        setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
        const response = await backend.patch(
            `/students/${userContext?.id}/`,
            { first_name: formData.first_name });  // Send only one field
            console.log("Settings updated " + response.data);
            alert("Profile updated successfully!");
        }
        catch (error){
            console.error("Error updating user data: ", error);
            alert("Failed to update profile. Please try again.");
        }

    }

    return(
        <section className="min-h-screen bg-stone-900 flex flex-col items-center pb-20 pt-10">
            <div className="w-full space-y-5 p-6 max-w-[860px] m-28 ">
                <div className="flex items-end ml-24 mr-10">
                    <img src={dummyInitLogo} alt="dummy picture" className="rounded-full h-32 mr-3"/>
                    <div>
                        <p className="text-3xl text-white m-2"> {formData.username}</p>
                        <p className="text-sm text-gray-400 m-2"> {globalEmail}</p>
                        <div className="flex m-2">
                            <button onClick={() => console.log("X")}>
                                <MdOutlineFileUpload className="text-gray-400 size-6 hover:text-gray-200 mr-2"/>
                            </button>
                            <p className="text-l text-gray-400"> Upload Picture</p>
                        </div>
                    </div>
                </div>
                <div className="ml-24 mr-24 space-y-5">
                    <div className="flex items-end justify-between ">
                        <div className=" w-1/2 ">
                            <p className="text-sm text-white"> First Name</p>
                            <input name="first_name" onClick={handleChange} className="text-white w-11/12 bg-gray-500 h-8 p-2" placeholder={formData.first_name}/>
                        </div>
                        <div className=" w-1/2 ">
                            <p className="text-sm text-white"> Last Name</p>
                            <input name="last_name" onClick={handleChange} className="text-white w-full bg-gray-500 h-8 p-2" placeholder={formData.last_name}/>
                        </div>
                    </div>
                    <div className=" w-full ">
                        <p className="text-sm text-white"> Email</p>
                        <input name="email" onClick={handleChange} className="text-white bg-gray-500 w-full h-8 p-2" placeholder={formData.email}/>
                    </div>
                    <div className="w-full">
                        <p className="text-sm text-white"> Major </p>
                        <input name="major" onClick={handleChange} className="text-white bg-gray-500 w-full h-8 p-2"  placeholder={formData.major}/>
                    </div>
                    <div className="w-full">
                        <p className="text-sm text-white"> Grad Year</p>
                        <input name="graduation_year" onClick={handleChange} type="number" className=" text-white bg-gray-500 w-full h-8 p-2" placeholder={formData.graduation_year}/>
                    </div>
                    <div className="w-full">
                        <button type= "submit" className="bg-white p-2" onClick={handleSubmit}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StudentSettings;
import dummyInitLogo from "../assets/dummyInitLogo.png";
import { MdOutlineFileUpload } from "react-icons/md";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext.jsx";
import backend from "../components/backend.jsx";

function StudentSettings(){

    const{userContext} = useContext(UserContext);
    //globalEmail is used so that the email at the top of the screen doesnt change while the user types like the normal email formData will
    const [globalEmail, setGlobalEmail] = useState("");
    const[errors,setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        major: "",
        graduation_year: ""
    })

    useEffect(()=>{
        async function fetchUserDetails() {
            try{
                const response = await backend.get('students/');
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
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchUserDetails();
    },[])

    const handleChange = (e) =>{
        e.preventDefault();
        setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
    }

     const validateErrors = (data) =>{
         const errors = {};
         if(!data.first_name.trim()){
             errors.first_name_blank = 'Cannot Leave First Name Blank';
         }
         if(!data.last_name.trim()){
             errors.last_name_blank = 'Cannot Leave Last Name Blank';
         }
         if(!data.email.trim()){
             errors.email_blank = 'Cannot Leave Email Blank';
         }
         if(!data.email.endsWith("edu")){
             errors.invalid_email = 'Must be a .edu email';
         }
         if(!data.major.trim()){
             errors.major_blank = 'Cannot Leave Major Blank';
         }
         if(data.graduation_year<2025){
             errors.invalid_graduation_year = "Cannot Set Graduation Year before the current year";
         }

         return errors;
     }

    //used to see if the email was updated from its original state
    const emailHasChanged = formData.email !== globalEmail;

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formErrors = validateErrors(formData);
        setErrors(formErrors);

        const requestData = {
            //since email is a field in the User object and not the Student object, we have to wrap it in a user object
            //the patch request will NOT complete if the email in the User object has not changed due to our User serializers behavior
            // due to this we conditionally pass the email through depending on if the email has changed or not
            user: {
                ...(emailHasChanged && {email: formData.email}) , // Ensure the email is inside the 'user' object
            },
            first_name: formData.first_name,
            last_name: formData.last_name,
            major: formData.major,
            graduation_year: formData.graduation_year,
        };

        if(Object.keys(formErrors).length === 0) {
            try {
                const response = await backend.patch(`/students/`, requestData);
                console.log("Settings updated " + response.data.first_name);
                window.location.reload();
            } catch (error) {
                console.error("Error updating user data: ", error);
            }
        }
    }

    if(isLoading){
        return <div>Loading... </div>
    }
    return(
        <section className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-full space-y-5 p-6 max-w-[500px] ">
                <div className="flex items-end">
                    <div>
                        <div>
                            <img src={dummyInitLogo} alt="dummy picture" className="rounded-full h-32"/>
                            <button onClick={() => console.log("X")}>
                                <div className="flex m-2 text-black hover:text-gray-400">
                                    <MdOutlineFileUpload className="size-6  mr-2"/>
                                    <p> Upload Picture</p>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-5xl text-black -mt-36"> {formData.username}</p>
                        <p className="text-sm text-gray-500"> {globalEmail}</p>
                    </div>
                </div>
                <div className="space-y-5">
                    <div className="flex items-end justify-between">
                    <div className=" w-1/2 ">
                            <p className="text-gray-500"> First Name</p>
                            <input name="first_name" onChange={handleChange} className="text-black w-11/12 bg-gray-400 h-8 p-2 placeholder-gray-600" placeholder={formData.first_name}/>
                            {errors.first_name_blank &&  <p className="text-red-500 text-xs italic"> {errors.first_name_blank} </p>}
                        </div>
                        <div className="w-1/2">
                            <p className="text-gray-500"> Last Name</p>
                            <input name="last_name" onChange={handleChange} className="text-black w-full bg-gray-400 h-8 p-2 placeholder-gray-600" placeholder={formData.last_name}/>
                            {errors.last_name_blank &&  <p className="text-red-500 text-xs italic"> {errors.last_name_blank} </p>}
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="text-gray-500"> Email</p>
                        <input name="email" onChange={handleChange} className="text-black bg-gray-400 w-full h-8 p-2 placeholder-gray-600" placeholder={formData.email} />
                        {errors.email_blank &&  <p className="text-red-500 text-xs italic"> {errors.email_blank} </p>}
                        {errors.invalid_email &&  <p className="text-red-500 text-xs italic"> {errors.invalid_email} </p>}

                    </div>
                    <div className="w-full">
                        <p className="text-gray-500"> Major </p>
                        <input name="major" onChange={handleChange} className="text-black bg-gray-400 w-full h-8 p-2 placeholder-gray-600"  placeholder={formData.major}/>
                        {errors.major_blank &&  <p className="text-red-500 text-xs italic"> {errors.major_blank} </p>}
                    </div>
                    <div className="w-full">
                        <p className="text-gray-500"> Graduation Year</p>
                        <input name="graduation_year" onChange={handleChange} type="number" className=" text-black bg-gray-400 w-full h-8 p-2 placeholder-gray-600" placeholder={formData.graduation_year}/>
                        {errors.invalid_graduation_year &&  <p className="text-red-500 text-xs italic"> {errors.invalid_graduation_year} </p>}
                    </div>
                    <div className="w-full">
                        <button type="submit" className="bg-gray-300 p-2" onClick={handleSubmit}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StudentSettings;

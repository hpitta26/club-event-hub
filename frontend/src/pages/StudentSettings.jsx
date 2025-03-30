import { MdOutlineFileUpload } from "react-icons/md";
import { useEffect, useState } from "react";
import backend from "../components/backend.jsx";

function StudentSettings() {
    const [globalEmail, setGlobalEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
    const [selectedAvatar, setSelectedAvatar] = useState(null); // Selected avatar

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        major: "",
        graduation_year: "",
    });

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const response = await backend.get("students/");
                if (response.data) {
                    setGlobalEmail(response.data.user.email);
                    setFormData({
                        username: response.data.user.email.split("@")[0],
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        email: response.data.user.email,
                        major: response.data.major,
                        graduation_year: response.data.graduation_year,
                    });
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            } finally {
                setIsLoading(false);
            }
        }
        async function fetchProfileImage() {
            try {
                const response = await backend.get("student-profile-image/");
                setProfileImage(response.data.image_url);
                console.log("Profile image URL:", response.data.image_url);
            } catch (error) {
                console.error("Error fetching profile image:", error);
                setProfileImage(null);
            }
        }

        fetchUserDetails();
        fetchProfileImage();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateErrors = (data) => {
        const errors = {};
        if (!data.first_name.trim()) {
            errors.first_name_blank = "Cannot Leave First Name Blank";
        }
        if (!data.last_name.trim()) {
            errors.last_name_blank = "Cannot Leave Last Name Blank";
        }
        if (!data.email.trim()) {
            errors.email_blank = "Cannot Leave Email Blank";
        }
        if (!data.email.endsWith("edu")) {
            errors.invalid_email = "Must be a .edu email";
        }
        if (!data.major.trim()) {
            errors.major_blank = "Cannot Leave Major Blank";
        }
        if (data.graduation_year < 2025) {
            errors.invalid_graduation_year = "Cannot Set Graduation Year before the current year";
        }

        return errors;
    };

    const emailHasChanged = formData.email !== globalEmail;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateErrors(formData);
        setErrors(formErrors);

        const requestData = {
            user: {
                ...(emailHasChanged && { email: formData.email }),
            },
            first_name: formData.first_name,
            last_name: formData.last_name,
            major: formData.major,
            graduation_year: formData.graduation_year,
        };

        console.log("Request Data:", requestData);

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await backend.patch('students/', requestData);
                console.log("Settings updated " + response.data.first_name);
            } catch (error) {
                console.error("Error updating user data: ", error);
            }
        }
        console.log("Profile Image:", profileImage);
        if (profileImage !== null) {
            try {
                const response = await backend.post("student-profile-image/", {
                    profile_image_url: profileImage, // Send the profile image URL as JSON
                });
                console.log("Profile image updated successfully:", response.data);
                window.location.reload();
            } catch (error) {
                console.error("Error uploading profile image:", error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-full space-y-5 p-6 max-w-[500px] ">
                <div className="flex items-end space-x-5">
                    <div
                        className="relative h-32 rounded-full cursor-pointer"
                        onClick={() => setIsModalOpen(true)} // Open the modal
                    >
                        <img
                            src={profileImage || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="w-full h-full object-cover border border-black rounded-full"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex justify-center items-center">
                            <MdOutlineFileUpload className="text-white w-6 h-6" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-5xl text-black">{formData.username}</p>
                        <p className="text-sm text-gray-600">{globalEmail}</p>
                    </div>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    -     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Select an Avatar</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {[...Array(9)].map((_, index) => {
                                    const avatarName = `avatar${index + 1}.png`;
                                    return (
                                        <div
                                            key={avatarName}
                                            className={`avatar-option border-2 rounded-lg cursor-pointer ${
                                                selectedAvatar === avatarName ? "border-blue-500" : "border-gray-300"
                                            }`}
                                            onClick={() => setSelectedAvatar(avatarName)}
                                        >
                                            <img
                                                src={`http://localhost:9000/dev-bucket/${avatarName}`}
                                                alt={`Avatar ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setProfileImage(`http://localhost:9000/dev-bucket/${selectedAvatar}`);
                                    }}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-gray-300 text-black px-4 py-2 rounded-md"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="space-y-5">
                    <div className="flex items-end justify-between">
                        <div className="w-1/2">
                            <p className="text-black">First Name</p>
                            <input name="first_name" onChange={handleChange} className="text-black w-11/12 bg-[#D9D2D6] h-[36px] p-2 placeholder-gray-600 rounded-md border-[1.5px] border-black" placeholder={formData.first_name}/>
                            {errors.first_name_blank &&  <p className="text-red-500 text-xs italic"> {errors.first_name_blank} </p>}
                        </div>
                        <div className="w-1/2">
                            <p className="text-black">Last Name</p>
                            <input name="last_name" onChange={handleChange} className="text-black w-full bg-[#D9D2D6] h-[36px] p-2 placeholder-gray-600 rounded-md border-[1.5px] border-black" placeholder={formData.last_name}/>
                            {errors.last_name_blank &&  <p className="text-red-500 text-xs italic"> {errors.last_name_blank} </p>}
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="w-1/2">
                            <p className="text-black">Email</p>
                            <input name="email" onChange={handleChange} className="text-black bg-[#D9D2D6] w-11/12 h-[36px] p-2 placeholder-gray-600 rounded-md border-[1.5px] border-black" placeholder={formData.email} />
                            {errors.email_blank &&  <p className="text-red-500 text-xs italic"> {errors.email_blank} </p>}
                            {errors.invalid_email &&  <p className="text-red-500 text-xs italic"> {errors.invalid_email} </p>}
                        </div>
                        <div className="w-1/2">
                            <p className="text-black">Graduation Year</p>
                            <input name="graduation_year" onChange={handleChange} type="number" className=" text-black bg-[#D9D2D6] w-full v p-2 h-[36px] placeholder-gray-600 rounded-md border-[1.5px] border-black" placeholder={formData.graduation_year}/>
                            {errors.invalid_graduation_year &&  <p className="text-red-500 text-xs italic"> {errors.invalid_graduation_year} </p>}
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="text-black">Major </p>
                        <input name="major" onChange={handleChange} className="text-black bg-[#D9D2D6] w-full h-[36px] p-2 placeholder-gray-600 rounded-md border-[1.5px] border-black"  placeholder={formData.major}/>
                        {errors.major_blank &&  <p className="text-red-500 text-xs italic"> {errors.major_blank} </p>}
                    </div>
                    <div className="w-full">
                        <button type="button" className="bg-[#FD4EB7] rounded-md border-black border-[1.5px] p-2 mt-2" onClick={handleSubmit}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StudentSettings;

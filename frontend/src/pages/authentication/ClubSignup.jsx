  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import backend from "../../middleware/backend";
  import { FaArrowRight,FaArrowLeft} from "react-icons/fa";
  import gatherULogo from '../../assets/icons/GatherUIcon.png';

  function ClubSignup() {
    const [formData, setFormData] = useState({
      club_name: "",
      description: "",
      email: "",
      password1: "",
      password2: "",
      year: "",
      type: "",
      role: "CLUB",
    });
    const [phase, setPhase] = useState(0);

    const accountFields = [
      { name: "email", type: "email", label: "Email" },
      { name: "password1", type: "password", label: "Password" },
      { name: "password2", type: "password", label: "Confirm Password" },
    ];

    const clubDetailsFields = [
      { name: "club_name", type: "text", label: "Club Name" },
      { name: "year", type: "number", label: "Year Founded" },
      {
        name: "type",
        type: "radio",
        label: "Club Type",
        options: [
          { value: "arts", label: "Arts" },
          { value: "engineering", label: "Engineering" },
          { value: "health", label: "Health" },
          { value: "sports", label: "Sports" },
          { value: "law", label: "Law" },
        ],
      },
    ];

    const descriptionField = [
      {
        name: "description",
        type: "textarea",
        label: "Write a short description of your club",
      },
    ];

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      setSuccess("");

      console.log("Submitting form data:", formData);

      try {
        console.log("Making request to:", "/restapi/register/");
        const response = await backend.post("/register/", formData);

        console.log("Response:", response);

        if (response.status === 200) {
          setSuccess(
            "Registration successful! Please check your email for verification."
          );
          setFormData({
            club_name: "",
            email: "",
            password1: "",
            password2: "",
            year: "",
            type: "",
            description: "",
            role: "CLUB"
          });
          setPhase(0);
          navigate("/login");
        } else {
          setErrors(data.message || "Registration failed. Please try again.");
          setPhase(0);
        }
      } catch (err) {
        console.error("Error details:", err);
        console.error("Error response:", err.response);

        if (err.response?.data?.errors) {
          const errorMessages = err.response.data.errors;
            setErrors(errorMessages)
          // redirects user back to first phase so that they can see the "common password"
          // error that django's auth raises
          if(errorMessages.password1 || errorMessages.password2){
            setPhase(0);
          }
        }
        else {
        setErrors(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    async function checkEmail(email){
      const response = await backend.get(`check-email-exists/?email=${email}`);
      return !response.data.exists;
    }

    async function checkClubName(clubName){
      const response = await backend.get(`check-club-exists/?club_name=${clubName}`);
      return !response.data.exists;
    }

    console.log("Current form state:", formData);

    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col gap-8 w-full" style={{ maxWidth: "400px" }}>
          {phase === 0 && (
            <div className="bg-white rounded-[20px] p-6 border-black border-2 shadow-[2px_2px_0px_#000000]" style={{ height: "470px" }}>
              <div className="text-center mb-3 mt-3">
                <div className="flex justify-center items-center mb-2">
                  <span className="text-2xl font-bold mr-2">Welcome to</span>
                  <img src={gatherULogo} alt="GatherU Logo" className="h-10" />
                </div>
                <p className="text-gray-600">University Events at a Glance</p>
              </div>
              
              <form onSubmit={async(e) => {
                let nonSubmittedErrors={};
                e.preventDefault();
                if (formData.password1 !== formData.password2) {
                  nonSubmittedErrors.password1=("Passwords don't match");
                  nonSubmittedErrors.password2=("Passwords don't match");
                } else if(formData.password1.length < 8){
                  nonSubmittedErrors.password1 ="Passwords must be at least 8 characters long";
                  nonSubmittedErrors.password2 ="Passwords must be at least 8 characters long";
                }
                const emailAvailable = await checkEmail(formData.email)
                if(!emailAvailable) {
                  nonSubmittedErrors.email = "An account with this email already exists"
                }
                if(Object.keys(nonSubmittedErrors).length>0) {
                  setErrors(nonSubmittedErrors);
                  return
                } else {
                  setErrors({}); // clear errors
                }
                setPhase(1);
              }}>
                {accountFields.map((field) => (
                  <div className="mb-3" key={field.name}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="appearance-none rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight bg-[#D9D2D6] border-black border-[1.5px]"
                      required
                    />
                    {errors[field.name] && <p className="text-red-500 text-xs italic mb-4">{errors[field.name]}</p>}
                  </div>
                ))}
                <div className="flex items-center justify-center mt-6">
                  <button
                    className="bg-[#FD4EB7] hover:bg-[#E93DA6] text-black font-bold py-2 px-4 rounded border-black border-[1.5px] w-full flex items-center justify-center"
                    type="submit"
                  >
                    <span>Next</span>
                    <FaArrowRight className="ml-2"/>
                  </button>
                </div>
              </form>
            </div>
          )}

          {phase === 1 && (
            <div className="bg-white rounded-[20px] p-8 border-black border-2 shadow-[2px_2px_0px_#000000] relative">
              <button
                type="button"
                onClick={() => setPhase(phase - 1)}
                className="absolute top-10 left-8 text-black hover:text-[#4D9FFD]"
              >
                <FaArrowLeft size={24} />
              </button>

              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Creating a Profile</h1>
              </div>

                <form onSubmit={async(e) => {
                  e.preventDefault();
                  let nonSubmittedErrors = {};

                  const clubNameAvailable = await checkClubName(formData.club_name);
                  if(!clubNameAvailable) {
                    nonSubmittedErrors.club_name = "A club with this name already exists";
                  } 
                  const currentYear = new Date().getFullYear();
                  if (formData.year > currentYear) {
                    nonSubmittedErrors.year = "Year founded cannot be in the future";
                  }

                  if (Object.keys(nonSubmittedErrors).length > 0) {
                    setErrors(nonSubmittedErrors);
                    return;
                  } else {
                    setErrors({}); // clear errors
                  }

                  setPhase(2);
                }}>
                  {clubDetailsFields.map((field) => {
                    if (field.type === "radio") {
                      return (
                          <div className="mb-4" key={field.name}>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              {field.label}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {field.options.map((option) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={option.value}
                                        name={field.name}
                                        value={option.value}
                                        checked={formData[field.name] === option.value}
                                        onChange={handleChange}
                                        className="mr-2"
                                        required
                                    />
                                    <label htmlFor={option.value} className="text-gray-700">
                                      {option.label}
                                    </label>
                                  </div>
                              ))}
                            </div>
                          </div>
                      );
                    } else {
                      return (
                          <div className="mb-4" key={field.name}>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              {field.label}
                            </label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight bg-[#D9D2D6] border-black border-[1.5px]"
                                required
                            />
                            {errors[field.name] &&
                                <p className="text-red-500 text-xs italic mb-4">{errors[field.name]}</p>}
                          </div>
                      );
                    }
                  })}

                  <div className="flex items-center justify-center">
                    <button
                        className="bg-[#FD4EB7] hover:bg-[#E93DA6] text-black font-bold py-2 px-4 rounded w-full flex items-center justify-center border-black border-[1.5px]"
                        type="submit"
                    >
                      <span>Next</span>
                      <FaArrowRight className="ml-2"/>
                    </button>
                  </div>
                </form>
              </div>
          )}

          {phase === 2 && (
              <div className="bg-white rounded-[20px] p-8 border-black border-2 shadow-[2px_2px_0px_#000000] relative">
                <button
                    type="button"
                    onClick={() => setPhase(phase - 1)}
                    className="absolute top-10 left- text-black hover:text-[#4D9FFD]"
                >
                  <FaArrowLeft size={24}/>
                </button>

                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold mb-2">Finishing Up Profile</h1>
                </div>

                <form onSubmit={handleSubmit}>
                  {descriptionField.map((field) => (
                      <div className="mb-6" key={field.name}>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          {field.label}
                        </label>
                        <textarea
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight bg-[#D9D2D6] border-black border-[1.5px]"
                            rows="4"
                            required
                        />
                        {errors[field.name] && <p className="text-red-500 text-xs italic mb-4">{errors[field.name]}</p>}
                      </div>
                  ))}

                  <div className="flex items-center justify-center">
                    <button
                        className="bg-[#FD4EB7] hover:bg-[#E93DA6] text-black font-bold py-2 px-4 rounded border-black border-[1.5px] w-full"
                        type="submit"
                    >
                      Finish
                    </button>
                  </div>
                </form>
              </div>
          )}
        </div>
      </div>
    );
  }

  export default ClubSignup;
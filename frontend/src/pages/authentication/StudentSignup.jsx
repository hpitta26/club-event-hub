import { useState } from "react";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import backend from "../../middleware/backend.jsx";
import gatherULogo from '../../assets/icons/GatherUIcon.png';

function StudentSignup() {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    last_name: "",
    first_name: "",
    major: "",
    graduation_year: "",
    role: 'STUDENT'
  });

  const [phase, setPhase] = useState(0);

  const accountFields = [
    { name: "email", type: "email", label: "Email" },
    { name: "password1", type: "password", label: "Password" },
    { name: "password2", type: "password", label: "Confirm Password" },
  ];

  const personalFields = [
    { name: "first_name", type: "text", label: "First Name" },
    { name: "last_name", type: "text", label: "Last Name" },
  ];

  const academicFields = [
    { name: "major", type: "text", label: "Major" },
    { name: "graduation_year", type: "number", label: "Graduation Year" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
          first_name: "",
          last_name: "",
          email: "",
          password1: "",
          password2: "",
          major: "",
          graduation_year: "",
          role: 'STUDENT'
        });
        setPhase(0); // reset the phase
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
          setPhase(0)
        }
        // redirects user back to first phase so that they can see the "user w this email exists"
        // error that django's auth raises
        else if(errorMessages.email){
          setPhase(0)
        }
      } else {
        setErrors(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    }
  };

  // Custom rendering for each phase
  const renderPhase = () => {
    switch (phase) {
      case 0:
        return (
          <div className="bg-white rounded-[20px] p-6 border-black border-2 shadow-[2px_2px_0px_#000000]" style={{ height: "470px" }}>
            <div className="text-center mb-6 mt-3">
              <div className="flex justify-center items-center mb-2">
                <span className="text-2xl font-bold mr-2">Welcome to</span>
                <img src={gatherULogo} alt="GatherU Logo" className="h-10" />
              </div>
              <p className="text-gray-600">University Events at a Glance</p>
            </div>
            
            <form onSubmit={(e) => {
              let nonSubmittedErrors={};
              e.preventDefault();
              if (!formData.email || !formData.email.endsWith("@fiu.edu")) {
                nonSubmittedErrors.email="Email must end in @fiu.edu";
              } else if (formData.password1 !== formData.password2) {
                nonSubmittedErrors.password1="Passwords must match";
                nonSubmittedErrors.password2="Passwords must match";
              } else if(formData.password1.length < 8){
                nonSubmittedErrors.password1 ="Passwords must be at least 8 characters long";
                nonSubmittedErrors.password2 ="Passwords must be at least 8 characters long";
              }
              if(Object.keys(nonSubmittedErrors).length>0) {
                setErrors(nonSubmittedErrors);
                return
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
                  className="bg-[#FD4EB7] hover:bg-[#E93DA6] border-black border-[1.5px] text-black font-bold py-2 px-4 rounded w-full"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        );
      
      case 1:
        return (
              <div className="bg-white rounded-[20px] p-8 border-black border-2 shadow-[2px_2px_0px_#000000] relative">
                <button
                    type="button"
                    onClick={() => setPhase(phase - 1)}
                    className="absolute top-10 left- text-black hover:text-[#4D9FFD]"
                >
                  <FaArrowLeft size={24}/>
                </button>

                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold mb-2">Creating a Profile</h1>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  setPhase(2);
                }}>
                  {personalFields.map((field) => (
                      <div className="mb-4" key={field.name}>
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
      )

      case 2:
        return (
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
                {academicFields.map((field) => (
                    <div className="mb-4" key={field.name}>
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
                      className="bg-[#FD4EB7] hover:bg-[#E93DA6] text-black font-bold py-2 px-4 rounded border-black border-[1.5px] w-full"
                      type="submit"
                  >
                    Finish
                  </button>
                </div>
              </form>
            </div>
      )
        ;

      default:
        return null;
    }
  };

  return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col gap-8 w-full" style={{maxWidth: "400px"}}>
          {renderPhase()}
        </div>
      </div>
  );
}

export default StudentSignup;
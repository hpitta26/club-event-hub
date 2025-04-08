import { useState, useContext } from "react";
import FormContainer from "../../components/FormContainer.jsx";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import backend from "../../components/backend.jsx";
import gatherULogo from "../../assets/icons/GatherUIcon.png";

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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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
        setError(data.message || "Registration failed. Please try again.");
        setPhase(0);
      }
    } catch (err) {
      console.error("Error details:", err);
      console.error("Error response:", err.response);

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const errorMessage = Object.entries(errors)
          .map(([key, value]) => `${key}: ${value.join(", ")}`)
          .join("\n");
        setError(errorMessage);
      } else {
        setError(
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
              e.preventDefault();
              if (!formData.email || !formData.email.endsWith("@fiu.edu")) {
                setError("Email must end in @fiu.edu");
                return;
              } else if (formData.password1 !== formData.password2) {
                setError("Passwords don't match");
                return;
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
                </div>
              ))}
              
              {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
              
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
          <div className="bg-white rounded-[20px] p-6 border-black border-2 shadow-[2px_2px_0px_#000000]" style={{ height: "380px" }}>
            <div className="flex flex-col justify-center h-full">
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
                  </div>
                ))}
                
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                
                <div className="flex items-center justify-center mt-6">
                  <button
                    className="bg-[#FD4EB7] hover:bg-[#E93DA6] text-black font-bold py-2 px-4 rounded border-black border-[1.5px] w-full flex items-center justify-center"
                    type="submit"
                  >
                    <span>Next</span>
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="bg-white rounded-[20px] p-6 border-black border-2 shadow-[2px_2px_0px_#000000]" style={{ height: "380px" }}>
            <div className="flex flex-col justify-center h-full">
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
                  </div>
                ))}
                
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                
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
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center">
      <div className="flex flex-col gap-8 w-full" style={{ maxWidth: "400px" }}>
        {renderPhase()}
      </div>
    </div>
  );
}

export default StudentSignup;
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import backend from "../../components/backend";
  import { FaArrowRight } from "react-icons/fa";
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

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      console.log("Field updated:", name, value);
    };

    console.log("Current form state:", formData);

    return (
      <div className="min-h-screen bg-gray-300 flex justify-center items-center">
        <div className="flex flex-col gap-8 w-full" style={{ maxWidth: "400px" }}>
          {phase === 0 && (
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
                if (formData.password1 !== formData.password2) {
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
                    className="bg-[#FD4EB7] hover:bg-[#E93DA6] text-black font-bold py-2 px-4 rounded border-black border-[1.5px] w-full"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}

          {phase === 1 && (
            <div className="bg-white rounded-[20px] p-8 border-black border-2 shadow-[2px_2px_0px_#000000]">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Creating a Profile</h1>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
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
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {phase === 2 && (
            <div className="bg-white rounded-[20px] p-8 border-black border-2 shadow-[2px_2px_0px_#000000]">
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
                  </div>
                ))}
                
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                
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
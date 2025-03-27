import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backend from "../../components/backend";
import FormContainer from "../../components/FormContainer";
import { FaArrowRight } from "react-icons/fa";

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
    setErrors("");
    setSuccess("");

    // Debug log
    console.log("Submitting form data:", formData);

    try {
      // Debug log
      console.log("Making request to:", "/restapi/register/");
      const response = await backend.post("/register/", formData);

      // Debug log
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
        });
        setPhase(0);
        navigate("/login");
      } else {
        setErrors(data.message || "Registration failed. Please try again.");
        setPhase(0);
      }
    } catch (err) {
      // Debug log
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
        // redirects user back to first phase so that they can see the "user w this email exists"
        // error that django's auth raises
        if(errorMessages.email){
          setPhase(0);
        }
        // redirects user back to first phase so that they can see the "club w this name exists"
        // error that django's auth raises
        if(errorMessages.club_name){
          setPhase(1);
        }
      } else {
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
    // Debug log
    console.log("Field updated:", name, value);
  };

  // Debug log for render
  console.log("Current form state:", formData);

  return (
    <div className="min-h-screen bg-stone-900 flex justify-center items-center pt-10">
      <div className="flex flex-col gap-8">
        {phase === 0 && (
          <FormContainer
            title="Welcome to GatherU"
            subtitle="University Events at a Glance"
            fields={accountFields}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            onSubmit={(e) => {
              e.preventDefault();
              const formErrors = {};
              if (formData.password1 !== formData.password2) {
                formErrors.password1 = "Passwords must match";
                formErrors.password2 = "Passwords must match";
                setErrors(formErrors);
                return;
              }
              setPhase((prevPhase) => prevPhase + 1);
            }}
          >
            Submit
          </FormContainer>
        )}
        {phase === 1 && (
          <FormContainer
            title="Creating a Profile"
            fields={clubDetailsFields}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            onSubmit={() => {
              setPhase((prevPhase) => prevPhase + 1);
            }}
          >
            <div className="flex flex-row justify-center items-center gap-2">
              Next <FaArrowRight />
            </div>
          </FormContainer>
        )}
        {phase === 2 && (
          <FormContainer
            title="Finishing Up Profile"
            fields={descriptionField}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row justify-center items-center gap-2">
              Finish
            </div>
          </FormContainer>
        )}
      </div>
    </div>
  );
}

export default ClubSignup;

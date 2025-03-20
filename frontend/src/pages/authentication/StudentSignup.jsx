import { useState, useContext } from "react";
import FormContainer from "../../components/FormContainer.jsx";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import backend from "../../components/backend.jsx";

function StudentSignup() {
  const [errors, setErrors] = useState({});
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
          first_name: "",
          last_name: "",
          email: "",
          password1: "",
          password2: "",
          major: "",
          graduation_year: "",
        });
        setPhase(0); // reset the phase
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
        setErrors(errorMessages);
        // redirects user back to first phase so that they can see the "common password"
        // error that django's auth raises
        if(errorMessages.password1 || errorMessages.password2){
          setPhase(0);
        }
        // redirects user back to first phase so that they can see the "user w this email exists"
        // error that django's auth raises
        if(errorMessages.email){
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
              let nonSubmittedErrors = {}
              e.preventDefault();
              if (!formData.email || !formData.email.endsWith("@fiu.edu")) {
                nonSubmittedErrors.email ="Email must end in @fiu.edu";
              }
              if (formData.password1 !== formData.password2) {
                nonSubmittedErrors.password1 ="Passwords must match ";
                nonSubmittedErrors.password2 ="Passwords must match ";
              }
              else if(formData.password1.length < 8){
                nonSubmittedErrors.password1 ="Passwords must be at least 8 characters long";
                nonSubmittedErrors.password2 ="Passwords must be at least 8 characters long";
              }
                if (Object.keys(nonSubmittedErrors).length > 0) {
                  setErrors(nonSubmittedErrors);
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
            subtitle=""
            fields={personalFields}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            onSubmit={(e) => {
              e.preventDefault();
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
            subtitle=""
            fields={academicFields}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            // Should most likely handle valid graduation_year here
          >
            Finish
          </FormContainer>
        )}
      </div>
    </div>
  );
}

export default StudentSignup;

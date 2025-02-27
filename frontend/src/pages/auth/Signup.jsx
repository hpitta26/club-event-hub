import { useState, useContext } from "react";
import FormContainer from "../../components/FormContainer.jsx";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import backend from "../../components/backend";
import { CsrfContext } from "../../context/CsrfContext";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    firstName: "",
    major: "",
    graduationYear: "",
  });

  const [phase, setPhase] = useState(0);

  const accountFields = [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
    { name: "confirmPassword", type: "password", label: "Confirm Password" },
  ];

  const personalFields = [
    { name: "firstName", type: "text", label: "First Name" },
    { name: "lastName", type: "text", label: "Last Name" },
  ];

  const academicFields = [
    { name: "major", type: "text", label: "Major" },
    { name: "graduationYear", type: "number", label: "Graduation Year" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getCsrfToken = useContext(CsrfContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Form validation
    if (!formData.email || !formData.email.endsWith("@fiu.edu")) {
      setError("Please enter a valid FIU email address");
      return;
    }

    // Debug log
    console.log("Submitting form data:", formData);

    try {
      // Debug log
      const csrfToken = await getCsrfToken();
      console.log("Making request to:", "/restapi/register/");
      const response = await backend.post("/student-register/", formData, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });

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
        navigate("/student-login");
      } else {
        setError(data.message || "Registration failed. Please try again.");
        setPhase(0);
      }
    } catch (err) {
      // Debug log
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

  return (
    <div className="min-h-screen bg-stone-900 flex justify-center items-center">
      <div className="flex flex-col gap-8">
        {phase === 0 && (
          <FormContainer
            title="Welcome to PULSE"
            subtitle="University Events at a Glance"
            fields={accountFields}
            formData={formData}
            handleChange={handleChange}
            onSubmit={(e) => {
              e.preventDefault();
              if (formData.password !== formData.confirmPassword) {
                alert("Passwords Don't Match");
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
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          >
            Finish
          </FormContainer>
        )}
      </div>
    </div>
  );
}

export default Signup;

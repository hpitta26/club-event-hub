import { useContext, useState } from "react";
import backend from "../../components/backend.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { CsrfContext } from "../../context/CsrfContext.jsx";
import FormContainer from "../../components/FormContainer.jsx";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const fields = [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];
  const { Login } = useContext(UserContext);
  const { getCsrfToken } = useContext(CsrfContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const csrfToken = await getCsrfToken();
      const response = await backend.post("/student-login/", formData, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
      console.log(response);
      console.log(response.data.user);
      if (response.status === 200) {
        console.log("logging user in...");
        Login(response.data.user);
        navigate("/home");
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-stone-900 flex justify-center items-center">
      <FormContainer
        title={"Welcome to GatherU"}
        subtitle="University Events at a Glance"
        fields={fields}
        formData={formData}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      >
        Submit
      </FormContainer>
    </div>
  );
}

export default Login;

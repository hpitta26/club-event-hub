<<<<<<< HEAD
import { useContext, useState } from "react";
import backend from "../../components/backend.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer.jsx";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const fields = [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];
  const { Login } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await backend.post("/login/", formData);

      // console.log(response);
      // console.log(response.data.user);
      if (response.status === 200) {
        console.log("logging user in...");
        await new Promise((resolve) => {
          Login(response.data.user);
          resolve(); // Ensure the context is updated before proceeding
        });
        if (response.data.user['role'].includes("STUDENT")) {
          navigate('/discover');
        } else {
          navigate("/analytics");
        }
	    } else {
      console.log(response);
      console.log(response.data.user);
      if (response.status === 200) {
        console.log("logging user in...");
        Login(response.data.user);
		  if(response.data.user['role'] == "STUDENT") {
			  navigate("/discover");
		  }
		  else {
			  navigate("/analytics");
		  }
	  } else {

      // console.log(response);
      // console.log(response.data.user);
      if (response.status === 200) {
        console.log("logging user in...");
        await new Promise((resolve) => {
          Login(response.data.user);
          resolve(); // Ensure the context is updated before proceeding
        });
        if (response.data.user['role'].includes("STUDENT")) {
          navigate('/discover');
        } else {
          navigate("/analytics");
        }
	    } else {

        setError(response.message);
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data.error : err.message);
      setError("Login failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-stone-900 flex justify-center items-center pt-10">
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
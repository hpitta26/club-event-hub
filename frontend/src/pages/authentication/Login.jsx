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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

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
        setErrors(response.data);
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data.error : err.message);
      let loginErrors = {}
        loginErrors.email="Email or password is incorrect";
        loginErrors.password="Email or password is incorrect";
        setErrors(loginErrors);
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
        errors={errors}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      >
        Submit
      </FormContainer>
    </div>
  );
}

export default Login;

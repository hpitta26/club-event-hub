import { useContext, useState } from "react";
import backend from "../../middleware/backend.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import gatherULogo from '../../assets/icons/GatherUIcon.png';

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

  // Custom form rendering with reduced height
  const renderCustomForm = () => {
    return (
      <div className="bg-white rounded-[20px] p-6 border-black border-2 shadow-[2px_2px_0px_#000000]" style={{ height: "400px" }}>
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="text-center mb-8 mt-4">
              <div className="flex justify-center items-center mb-2">
                <span className="text-2xl font-bold mr-2">Welcome to</span>
                <img src={gatherULogo} alt="GatherU Logo" className="h-10" />
              </div>
              <p className="text-gray-600">University Events at a Glance</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none border-black border-[1.5px] rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight bg-[#D9D2D6]"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none border-black border-[1.5px] rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight bg-[#D9D2D6]"
                required
              />
            </div>
            
            {error && <p className="text-red-500 text-xs italic mb-2">{error}</p>}
          </div>
          
          <div className="mb-4">
            <button
              className="bg-[#FD4EB7] hover:bg-[#E93DA6] border-black border-[1.5px] text-black font-bold py-2 px-4 rounded w-full"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-8 w-full" style={{ maxWidth: "400px" }}>
        {renderCustomForm()}
      </div>
    </div>
  );
}

export default Login;
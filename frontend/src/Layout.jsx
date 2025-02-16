import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import Landing from './pages/Landing.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import Navbar from "./components/navbar.jsx";  
import './index.css';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

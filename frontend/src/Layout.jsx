import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import Landing from './pages/Landing.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Navbar from "./components/navbar.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import { UserProvider } from "./context/userContext.jsx";

import './index.css';

function App() {
  return (
    <UserProvider>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<NotFound />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<CreateEvent />} />
                <Route path="/verify/:token" element={<VerifyEmail />} />
            </Routes>
        </Router>
    </UserProvider>
  );
}

export default App;

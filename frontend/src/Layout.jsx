import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import Landing from './pages/Landing.jsx';
import Logout from './pages/Logout.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Navbar from "./components/navbar.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import { UserProvider } from "./context/userContext.jsx";

/* Temporary Only */
import TempPage from "./pages/TempPage.jsx";

import './index.css';
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <UserProvider>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/create-event" element={<CreateEvent />} /> 
                    <Route path="/verify/:token" element={<VerifyEmail />} />
                    <Route  path="/event-card" element={<TempPage/>} /> {/* DummyPage to visualize the EventCard component */}
                </Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    </UserProvider>
  );
}

export default App;

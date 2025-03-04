import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing.jsx';
import Discover from "./pages/Discover.jsx";
import NotFound from './pages/NotFound.jsx';
import VerifyEmail from "./pages/auth/VerifyEmail.jsx";
import NavbarSelector from "./components/navbars/NavbarSelector.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Logout from './pages/auth/Logout.jsx';
import ClubRegister from './pages/auth/ClubRegister.jsx';
import Login from "./pages/auth/Login.jsx";
import StudentSignup from "./pages/auth/StudentSignup.jsx";

/* Temporary Only */
import TempPage from "./pages/TempPage.jsx";

import './index.css';
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import ClubProfile from "./pages/ClubProfile.jsx";
import FollowingClubs from "./pages/FollowingClubs.jsx";
import Analytics from "./pages/Analytics.jsx";
import ClubEvents from "./pages/ClubEvents.jsx";

function App() {
  return (
    <UserProvider>
      <Router>
        <NavbarSelector /> 
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/student-register" element={<StudentSignup/>}/> {/* Student Signup */}
            <Route path="/club-register" element={<ClubRegister />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/verify/:token" element={<VerifyEmail />} />
            <Route path="/club/:clubSlug" element={<ClubProfile />} />
            <Route  path="/event-card" element={<TempPage/>} /> {/* DummyPage to visualize the EventCard component */}
            <Route path="/discover" element={<Discover />} />
			<Route path="/following" element={<FollowingClubs/>} />
			<Route path="/analytics" element={<Analytics/>} />
			<Route path="/events" element={<ClubEvents/>} />
            <Route element={<ProtectedRoute />}> {/* Protected --> can only be accessed by logged-in users */}
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

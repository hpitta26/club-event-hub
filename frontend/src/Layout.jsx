import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing.jsx';
import Discover from "./pages/Discover.jsx";
import NotFound from './pages/NotFound.jsx';
import NavbarSelector from "./components/navbars/NavbarSelector.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import { UserProvider } from "./context/UserContext.jsx";

import Logout from './pages/authentication/Logout.jsx';
import ClubRegister from './pages/authentication/ClubRegister.jsx';
import Login from "./pages/authentication/Login.jsx";
import StudentSignup from "./pages/authentication/StudentSignup.jsx";
import VerifyEmail from "./pages/authentication/VerifyEmail.jsx";

import { EnsureLoggedIn } from "./pages/authorization/EnsureLoggedIn.jsx";

/* Temporary Only */
import TempPage from "./pages/TempPage.jsx";

import './index.css';
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
            <Route path="/student-register" element={<StudentSignup />}/> {/* Student Signup */}
            <Route path="/club-register" element={<ClubRegister />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/verify/:token" element={<VerifyEmail />} />
            <Route path="/club/:clubSlug" element={<ClubProfile />} />
            <Route path="/event-card" element={<TempPage/>} /> {/* DummyPage to visualize the EventCard component */}
            <Route path="/discover" element={<Discover />} />
            <Route path="/following" element={<FollowingClubs/>} />
            <Route path="/analytics" element={<Analytics/>} />
            <Route path="/events" element={<ClubEvents/>} />
            <Route path="/temp" element={<TempPage />} />
            <Route element={<EnsureLoggedIn />}> {/* Protected --> can only be accessed by logged-in users */}
              <Route path="/create-event" element={<CreateEvent />} />
            </Route>
            <Route path="/logout" element={<Logout />} /> {/* we don't want to limit who can logout */}
            <Route path="/*" element={<NotFound />} />
          </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

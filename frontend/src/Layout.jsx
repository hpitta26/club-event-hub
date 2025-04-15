import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { EnsureLoggedIn } from "./pages/authorization/EnsureLoggedIn.jsx";
import './index.css';

// General Imports
import Landing from './pages/Landing.jsx';
import NotFound from './pages/NotFound.jsx';
import NavbarSelector from "./components/navbars/NavbarSelector.jsx";
import Logout from './pages/authentication/Logout.jsx';
import Login from "./pages/authentication/Login.jsx";
import VerifyEmail from "./pages/authentication/VerifyEmail.jsx";
import ClubSignup from './pages/authentication/ClubSignup.jsx';
import StudentSignup from "./pages/authentication/StudentSignup.jsx";

// Student Side Imports
import Discover from "./pages/Discover.jsx";
import Following from "./pages/Following.jsx";
import StudentSettings from "./pages/StudentSettings.jsx";
import ClubProfile from "./pages/ClubProfile.jsx";
import StudentTimes from "./pages/StudentTimes.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

// Club Side Imports
import Analytics from "./pages/Analytics.jsx";
import ClubEvents from "./pages/ClubEvents.jsx";
import ClubSetting from "./pages/ClubSetting.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";

/* Temporary Only */
import TempPage from "./pages/TempPage.jsx";

function App() {
  return (
    <UserProvider>
      <Router>
        <NavbarSelector /> 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/temp" element={<TempPage />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/club/:clubSlug" element={<ClubProfile />} />
          {/* Protected --> makes sure users that are logged in can't visit register page */}
          <Route element={<EnsureLoggedIn expRole="NotLoggedIn" />}>
            <Route path="/student-register" element={<StudentSignup />} /> {/* Student Signup */}
            <Route path="/club-register" element={<ClubSignup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
          </Route>
          {/* Protected --> can only be accessed by people with role STUDENT */}
          <Route element={<EnsureLoggedIn expRole="STUDENT" />}> 
            <Route path="/following" element={<Following />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/student-times" element={<StudentTimes />} />
            <Route path="/student-profile" element={<StudentProfile/>} />
            <Route path="/student-settings" element={<StudentSettings />} />
          </Route>
          {/* Protected --> can only be accessed by people with role CLUB */}
          <Route element={<EnsureLoggedIn expRole="CLUB" />}> 
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/analytics" element={<Analytics/>} />
            <Route path="/events" element={<ClubEvents/>} />
            <Route path="/club-settings" element={<ClubSetting />} />
          </Route>
          <Route path="/logout" element={<Logout />} /> {/* we don't want to limit who can logout */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

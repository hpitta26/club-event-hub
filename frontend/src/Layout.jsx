import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing.jsx';
import Discover from "./pages/Discover.jsx";
import NotFound from './pages/NotFound.jsx';
import VerifyEmail from "./pages/auth/VerifyEmail.jsx";
import NavbarSelector from "./components/navbars/NavbarSelector.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { CsrfProvider } from "./context/CsrfContext.jsx";
import Logout from './pages/auth/Logout.jsx';
import ClubLogin from './pages/auth/ClubLogin.jsx';
import ClubRegister from './pages/auth/ClubRegister.jsx';
import Login from "./pages/auth/Login.jsx";
import StudentSignup from "./pages/auth/StudentSignup.jsx";

/* Temporary Only */
import TempPage from "./pages/TempPage.jsx";

import './index.css';
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import ClubProfile from "./pages/ClubProfile.jsx";

function App() {
  return (
    <CsrfProvider>
      <UserProvider>
          <Router>
              <NavbarSelector /> 
              <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/student-register" element={<StudentSignup/>}/> {/* Student Signup */}
                  <Route path="/club-register" element={<ClubRegister />} />
                  <Route path="/club-login" element={<ClubLogin />} />
                  <Route path="/student-login" element={<Login/>}/> {/* Student Login */}
                  <Route path="/verify/:token" element={<VerifyEmail />} />
                  <Route path="/club/:clubSlug" element={<ClubProfile />} />
                  <Route  path="/event-card" element={<TempPage/>} /> {/* DummyPage to visualize the EventCard component */}
                  <Route path="/discover" element={<Discover />} />
                  <Route element={<ProtectedRoute />}> {/* Protected --> can only be accessed by logged-in users */}
                      <Route path="/create-event" element={<CreateEvent />} />
                      <Route path="/logout" element={<Logout />} />
                  </Route>
                  <Route path="/*" element={<NotFound />} />
              </Routes>
          </Router>
      </UserProvider>
    </CsrfProvider>
  );
}

export default App;
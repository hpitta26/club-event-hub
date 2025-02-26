import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import VerifyEmail from "./pages/auth/VerifyEmail.jsx";
import Navbar from "./components/navbar.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { CsrfProvider } from "./context/CsrfContext.jsx";
import Logout from './pages/auth/Logout.jsx';
import StudentLogin from './pages/auth/StudentLogin.jsx';
import StudentRegister from './pages/auth/StudentRegister.jsx';
import ClubLogin from './pages/auth/ClubLogin.jsx';
import ClubRegister from './pages/auth/ClubRegister.jsx';

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
              <Navbar />
              <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/student-login" element={<StudentLogin />} />
                  <Route path="/student-register" element={<StudentRegister />} />
                  <Route path="/club-login" element={<ClubLogin />} />
                  <Route path="/club-register" element={<ClubRegister />} />
                  <Route path="/verify/:token" element={<VerifyEmail />} />
                  <Route path="/club/:clubSlug" element={<ClubProfile />} />
                  <Route  path="/event-card" element={<TempPage/>} /> {/* DummyPage to visualize the EventCard component */}
                  <Route element={<ProtectedRoute />}> {/* Protected --> can only be accessed by logged-in users */}
                      <Route path="/home" element={<Home />} />
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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login.jsx';
import Landing from './pages/Landing.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';

import './index.css';
import CreateEvent from "./pages/CreateEvent.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/*" element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default App;

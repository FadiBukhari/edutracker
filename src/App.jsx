import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";
import AcademicTasks from "./pages/AcademicTasks";
import Track from "./pages/Track";
import Admin from "./pages/Admin";
import PomodoroTimer from "./pages/PomodoroTimer";
import ContactUs from "./pages/Contactus";
import RequestRoleForm from "./pages/RequestRoleForm";
import ManageParentRequests from "./pages/ManageRequests";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/academictasks" element={<AcademicTasks />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/timer" element={<PomodoroTimer />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/requestRole" element={<RequestRoleForm />} />
          <Route path="/managerequests" element={<ManageParentRequests />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

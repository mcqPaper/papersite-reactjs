import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProjectCreate from "./components/admin/Projects/ProjectsCreate";
import Home from "./components/common/home/Home";
// import NavBar from "./components/nav-bar/NavBar";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import Testing from "./components/testing/testing";
function App() {
  const [userType, setUserType] = useState(null);

  return (
    <>
      {/* <NavBar /> */}
      <Router>
        <Routes>
          <Route path="/" element={<SignIn setUseState={setUserType} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/projectCreate" element={<ProjectCreate />} />
          <Route path="/home" element={<Home userType={userType} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

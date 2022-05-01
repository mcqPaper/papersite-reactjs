import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Project from "./components/admin/Projects/Projects";
import ProjectCreate from "./components/admin/Projects/ProjectsCreate";
import NavBar from "./components/nav-bar/NavBar";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import Testing from "./components/testing/testing";
function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/projectCreate" element={<ProjectCreate />} />
          <Route path="/projects" element={<Project />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

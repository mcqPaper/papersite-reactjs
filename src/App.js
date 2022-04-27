import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/sign-up/SignUp";
import SignIn from "./components/sign-in/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

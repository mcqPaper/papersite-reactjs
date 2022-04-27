import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { URL } from "../../environment/environment";

function SignIn() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  let navigate = useNavigate();

  function handleData(event) {
    event.preventDefault();
    let user = { email, password };
    console.log(user);
    fetch(`${URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.isSuccess) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("email", data.userProfile.email);
          localStorage.setItem("userId", data.userProfile.userId);
          localStorage.setItem("userType", data.userProfile.userType);
          //localStorage.removeItem("name of the item")
        } else {
          setErrMsg(data.message);
        }
      })
      .catch((error) => {
        //this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });

    // const response = await fetch('https://api.npms.io/v2/search?q=react');
    // const data = await response.json();
    // this.setState({ totalReactPackages: data.total })
  }
  function errorMessage(message) {
    if (message) {
      return (
        <div
          className="textAlignCenter alert alert-danger errorMessage"
          role="alert"
        >
          <span className="signInText">{message}</span>
        </div>
      );
    }
  }
  return (
    <div>
      <div className="signInTitle">
        <span className="signInText">Don't have an account?</span>
        <span
          className="signInLink"
          onClick={() => {
            navigate("/signUp");
          }}
        >
          New user
        </span>
      </div>

      <div className="formContainer">
        <form onSubmit={handleData}>
          <div>
            <h2>Sign In Form</h2>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <br />
            <input
              name="email"
              type="email"
              value={email}
              className="form-control"
              placeholder="Enter Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <br />
            <input
              name="password"
              type="password"
              value={password}
              className="form-control"
              placeholder="Enter Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="signInButton">
            <button type="submit" className="signIn">
              Login
            </button>
          </div>
          {errorMessage(errMsg)}
        </form>
      </div>
    </div>
  );
}

export default SignIn;

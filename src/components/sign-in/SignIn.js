import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment/environment";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  let navigate = useNavigate();

  function handleData(event) {
    event.preventDefault();
    let user = { email, password };
    console.log(user);
    fetch(`${BASE_URL}/api/users/login`, {
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
          navigate("/home")
        }
        else {
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

  //decide whether to disable the button
  const buttonDisabled = () => {
    if (email.length === 0 || password.length === 0) {
      return true;
    } else return false;
  }
  return (
    <div className="formContainer">
      <div className="signInTitle">
        <span className="signInText">Don't have an account?</span>
        <span className="signInLink" onClick={() => { navigate("/signUp") }}
        >
          New user
        </span>
      </div>

      <div>
        <form onSubmit={handleData}>
          <div>
            <h2>Sign In Form</h2>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <br />
            <input
              name="email" type="email" value={email} className="form-control"
              placeholder="Enter Email" onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <br />
            <input
              name="password" type="password" value={password} className="form-control"
              placeholder="Enter Password" onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="signInButton">
            <button
              type="submit" className="signIn" disabled={buttonDisabled()}
            >
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

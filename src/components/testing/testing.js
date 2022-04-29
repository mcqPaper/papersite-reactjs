import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../../custom-axios/custom-axios";
import "./testing.css";

function Testing() {
  const [name, setName] = useState("test");

  let navigate = useNavigate();

  function handleData(event) {

    event.preventDefault();
    let user = { name };

    customAxios.post(`/api/users/test`, user)
      .then(response => {

        if (response.isLogout) {
          localStorage.clear();
          navigate("/");
        }
        else {
          console.log(`primary`, response.data);
        }


      })
      .catch(err => {

      })
  }


  //decide whether to disable the button

  return (
    <div className="formContainer">
      <div className="signInTitle">

      </div>

      <div>
        <form onSubmit={handleData}>
          <div>
            <h2>Sign In Form</h2>
          </div>

          <div className="signInButton">
            <button
              type="submit" className="signIn" disabled={false}
            >
              Login
            </button>
          </div>
        </form>
        <span>Success</span>
      </div>
    </div>
  );
}

export default Testing;

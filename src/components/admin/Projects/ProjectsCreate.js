import React, { useEffect, useMemo, useState } from "react";
import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../sign-in/SignIn.css";
import "../ProjectsCreate.css";

function ProjectCreate() {

  const [projectName, setProjectName] = useState("");
  const [closeButton, setClose] = useState(false);

  let navigate = useNavigate();

  const buttonDisabled = useMemo(() => {
    if (projectName.length === 0) return true;
    else return false;
  }, [projectName])

  useEffect(() => {
    if (closeButton) navigate("/");
  }, [closeButton]);

  const handleProjectName = (event) => {
    event.preventDefault();
    console.log(`submit`)
    //should call api to create a project
    navigate("/");
  }

  return (
    <div className="projectMainBox">
      <CloseButton className="closeButton" onClick={() => setClose(true)} />
      <div className="projectForm">
        <form onSubmit={handleProjectName}>
          <div>
            <h2 >Create new project</h2>
          </div>
          <div className="form-group">
            <label htmlFor="project">Project</label>
            <br />
            <input
              value={projectName} className={`form-control`}
              placeholder="Enter Name"
              onChange={(event) => setProjectName(event.target.value)}
            />
          </div>
          <div className="creationButton">
            <button
              type="submit" className="signIn" disabled={buttonDisabled}
            >
              Create
            </button>
          </div>
        </form>
      </div>

    </div >
  );
}

export default ProjectCreate;

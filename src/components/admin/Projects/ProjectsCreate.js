import React, { useMemo, useState } from "react";
import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import customAxios from "../../../custom-axios/custom-axios";
import "../../sign-in/SignIn.css";
import "./ProjectsCreate.css";

function ProjectCreate() {

  const [projectName, setProjectName] = useState("");

  let navigate = useNavigate();

  const buttonDisabled = useMemo(() => {
    if (projectName.length === 0) return true;
    else return false;
  }, [projectName])


  const handleProjectName = (event) => {
    event.preventDefault();

    customAxios.post(`api/projects/create`, { name: projectName })
      .then(response => {

        if (response.isLogout) {
          localStorage.clear();
          navigate("/");
        }

        else {
          localStorage.setItem("projectId", response.data.id);
          navigate("/projects");
        }

      })
      .catch(err => {

      })

  }

  return (
    <div className="projectMainBox">
      <CloseButton className="closeButton" onClick={() => navigate("/projects")} />
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

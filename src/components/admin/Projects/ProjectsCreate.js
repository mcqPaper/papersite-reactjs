import { useMemo, useState } from "react";
import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import customAxios from "../../../custom-axios/custom-axios";
import "../../sign-in/SignIn.css";
import "./ProjectsCreate.css";

/**
 * Render project create UI
 * @returns Project create UI
 */
function ProjectCreate() {

  const [projectName, setProjectName] = useState("");

  let navigate = useNavigate();

  /**
   * Check whether to disable the button
   */
  const buttonDisabled = useMemo(() => {
    if (projectName.length === 0) return true;
    else return false;
  }, [projectName])


  // send API call to save a project
  const handleProjectName = (event) => {
    event.preventDefault();

    customAxios.post(`api/projects/create`, { name: projectName })
      .then(response => {

        if (response.isLogout) {
          localStorage.clear();
          navigate("/");
        }

        else {
          let projectData = {
            id: response.data.id,
            name: response.data.name
          }
          sessionStorage.setItem("project", JSON.stringify(projectData));

          sessionStorage.setItem(`projectCreate`, true);
          navigate("/home");
        }

      })
      .catch(err => {

      })

  }

  return (
    <div className="projectMainBox">
      <CloseButton className="closeButton" onClick={() => navigate("/home")} />
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

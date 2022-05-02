import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../react-hooks/react-hooks";
import ProjectCard from "./ProjectCard";
import "./ProjectList.css";

function ProjectList() {

  const { projectArray, handleProjectId } = useContext(UserContext);

  let navigate = useNavigate();


  const addProject = () => {
    navigate("/projectCreate")
  }

  const projectCardRender = useMemo(() => {

    return projectArray.map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        saveProjectId={handleProjectId}
      >
      </ProjectCard>
    ))
  }, [projectArray])

  return (
    <div className="projectList">
      <div className="projectListTop">
        <FontAwesomeIcon icon={faPlusCircle} size="2x" className='addIcon' onClick={() => addProject()} />
        <h2 className="title">Project List</h2>
      </div>
      <div className='listScroll'>{projectCardRender}</div>

    </div>
  );
}

export default ProjectList;

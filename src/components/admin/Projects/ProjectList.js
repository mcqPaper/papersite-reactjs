import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../react-hooks/react-hooks";
import ProjectCard from "./ProjectCard";
import "./ProjectList.css";

/**
 * Render project List UI
 * @returns Project List UI
 */
function ProjectList() {

  const { projectArray, handleProjectId, project,
    projectCreate, setProjectSearch } = useContext(UserContext);

  const [tempName, SetTempName] = useState(``);
  let navigate = useNavigate();

  /**
   * If user select add project feature
   */
  const addProject = () => {
    navigate("/projectCreate")
  }

  const ProjectListEndRef = useRef(null)


  /**
   * Scroll to bottom if new project is create
   */
  const scrollToBottom = () => {
    ProjectListEndRef.current?.scrollIntoView({ behavior: "auto" });
    sessionStorage.setItem(`projectCreate`, false);
  }

  useEffect(() => {
    if (projectCreate === true) {
      console.log(`scroll`)
      scrollToBottom();
    }

  }, [projectCreate]);


  /**
   *  call project list when enter project name
  * @param  event key event
  */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setProjectSearch(tempName)
    }
  }


  /**
   * Render project cards
   */
  const projectCardRender = useMemo(() => {

    return projectArray.map((proj) => (
      <ProjectCard
        key={proj.id}
        project={proj}
        saveProjectId={handleProjectId}
        selectedProjectId={project.id}
      >
      </ProjectCard>
    ))
  }, [projectArray, project])


  return (
    <div className="projectList">
      <div className="projectListTop">
        <FontAwesomeIcon icon={faPlusCircle} size="2x" className='addIcon'
          onClick={() => addProject()} />
        <div className="title">Project List</div>
      </div>
      <input
        type="search" value={tempName} placeholder="Project Name"
        className='projectSearch'
        onChange={(event) => SetTempName(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
      />
      <div className='listScroll'>{projectCardRender}
        <div ref={ProjectListEndRef} />
      </div>
    </div>
  )

}

export default ProjectList;

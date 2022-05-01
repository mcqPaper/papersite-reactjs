import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import "./ProjectList.css";

function ProjectList() {

  let array = [{
    id: 0, name: `Ordinary level`
  },
  { id: 1, name: `Advanced level` },

  { id: 2, name: `Advanced` }
  ]

  let navigate = useNavigate();
  const [projectArray, setArray] = useState(array);
  const [projectId, setProject] = useState(0);

  const handleProjectId = (id) => {

    localStorage.setItem("projectId", id)
    setProject(id);
  }

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

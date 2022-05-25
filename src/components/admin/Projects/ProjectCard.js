import { useMemo } from "react";
import "./ProjectCard.css";
import "./ProjectList.css";

/**
 * Render project card UI
 * @param {object} project contain project Id and the name
 * @param {Function} saveProjectId function to save project Id
 * @returns project car UI
 */
function ProjectCard({ project, saveProjectId, selectedProjectId }) {


  const cardClass = useMemo(() => {
    let className;

    if (selectedProjectId === project.id) className = "card cardSelect";

    else className = "card";

    return className;
  }, [selectedProjectId, project.id])

  return (
    <div>
      <div className={cardClass} cursor="pointer" onClick={() => saveProjectId(project.id, project.name)}>
        {project.name}
      </div>
    </div>
  );
}

export default ProjectCard;

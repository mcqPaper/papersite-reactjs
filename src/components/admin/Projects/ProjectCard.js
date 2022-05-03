import "./ProjectCard.css";
import "./ProjectList.css";

/**
 * Render project card UI
 * @param {object} project contain project Id and the name
 * @param {Function} saveProjectId function to save project Id
 * @returns project car UI
 */
function ProjectCard({ project, saveProjectId }) {

  return (
    <div>
      <div className="card" cursor="pointer" onClick={() => saveProjectId(project.id)}>
        {project.name}
      </div>
    </div>
  );
}

export default ProjectCard;

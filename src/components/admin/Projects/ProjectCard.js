import "./ProjectCard.css";
import "./ProjectList.css";

/**
 * Render project card UI
 * @param {object} project contain project Id and the name
 * @param {Function} saveProjectId function to save project Id
 * @returns project car UI
 */
function ProjectCard({ project, saveProjectId, key }) {

  return (
    <div>
      <div className="card" cursor="pointer" onClick={() => saveProjectId(project.id)}>
        {project.name}
      </div>
      {/* <PaperList /> */}
    </div>
  );
}

export default ProjectCard;

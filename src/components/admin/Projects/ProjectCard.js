import "./ProjectCard.css";
import "./ProjectList.css";


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

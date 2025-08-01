import "../styles/ProjectCard.css";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/issue?projectId=${project.id}&title=${project.title}`);
  };

  return (
    <div className="project-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectCard;


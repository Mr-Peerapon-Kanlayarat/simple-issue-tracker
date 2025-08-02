import "../styles/ProjectCard.css";
import { useNavigate } from "react-router-dom";
import React from "react";

function ProjectCard({ project, onDeleted }) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = React.useState(false);

  const handleClick = () => {
    navigate(`/issue?projectId=${project.id}&title=${project.title}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this project?')) return;
    setDeleting(true);
    try {
      await fetch(`http://localhost:8000/api/projects/${project.id}`, { method: 'DELETE' });
      if (onDeleted) onDeleted(project.id);
    } catch (err) {
      alert('Failed to delete project');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="project-card" onClick={handleClick} style={{ cursor: "pointer", position: 'relative' }}>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <button className="delete-project-btn" onClick={handleDelete} disabled={deleting}>
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

export default ProjectCard;


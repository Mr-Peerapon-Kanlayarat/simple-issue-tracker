import React from "react";
import "../styles/ProjectCard.css";

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectCard;

import { useEffect, useState} from "react";

import axios from 'axios';
import "../styles/Home.css";
import ProjectCard from "../components/ProjectCard";
import CreateProjectButton from "../components/CreateProjectButton";

function Home() {
  const [data, setData] = useState([]);

  const userId = 1;

  async function getData() {
  try {
    const response = await axios.get(`http://localhost:8000/api/projects/${userId}`);
    console.log(response.data);
    setData(response.data);
  } catch (error) {
    console.error('Axios error:', error);
  }
}


  const fetchProjects = () => {
    getData();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleted = (deletedId) => {
    setData((prev) => prev.filter((p) => p.id !== deletedId));
  };

  return (
    <div className="home">
      <div className="head-container">
        <h1>Projects</h1>
        <CreateProjectButton onCreated={fetchProjects} />
      </div>
      <div className="project-list">
        {data.map((project) => (
          <ProjectCard key={project.id} project={project} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  );
}

export default Home;
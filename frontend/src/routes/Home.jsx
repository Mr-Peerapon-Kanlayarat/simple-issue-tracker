import { useEffect, useState} from "react";

import axios from 'axios';
import "../styles/Home.css";
import ProjectCard from "../components/ProjectCard";

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

  useEffect(() => {
    getData();
  }, []);

  // const data = [
  //   { id: 1, name: "Project A", description: "Description for Project A" },
  //   { id: 2, name: "Project B", description: "Description for Project B" },
  //   { id: 3, name: "Project C", description: "Description for Project C" },
  // ]

  return (
    <div className="home">
      <h1>Projects</h1>
      <div className="project-list">
        {data.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Home;
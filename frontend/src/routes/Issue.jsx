import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import axios from 'axios';
import "../styles/Issue.css";
import ProjectCard from "../components/ProjectCard";
import IssueCard from "../components/IssueCard";


function Issue() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const projectId = searchParams.get("projectId");

  async function getData() {
  try {
    const response = await axios.get(`http://localhost:8000/api/projects/${projectId}/issues`);
    console.log(response.data);
    setData(response.data);
  } catch (error) {
    console.error('Axios error:', error);
  }
}

  useEffect(() => {
    if (!projectId) {
      console.error('No projectId provided');
      return;
    }
    getData();
    console.log('Project ID:', projectId);
  }, [projectId]);

  return (
    <div className="home">
      <h1>{title}</h1>
      <div className="project-list">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))
        ) : (
          <p style={{ color: 'red' }}>No issues found.</p>
        )}
      </div>
    </div>
  );
}

export default Issue;
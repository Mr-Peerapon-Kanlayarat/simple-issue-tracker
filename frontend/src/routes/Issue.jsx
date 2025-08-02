import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import axios from 'axios';
import "../styles/Issue.css";
import IssueCard from "../components/IssueCard";
import CreateIssueButton from "../components/CreateIssueButton";


function Issue() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const projectId = searchParams.get("projectId");

  async function getData() {
    try {
      const response = await axios.get(`http://localhost:8000/api/projects/${projectId}/issues`);
      setData(response.data);
    } catch (error) {
      console.error('Axios error:', error);
    }
  }

  const fetchIssues = () => {
    getData();
  };

  const handleDeleted = (deletedId) => {
    setData((prev) => prev.filter((i) => i.id !== deletedId));
  };

  useEffect(() => {
    if (!projectId) {
      console.error('No projectId provided');
      return;
    }
    fetchIssues();
  }, [projectId]);

  return (
    <div className="home">
      <h1>{title}</h1>
      <CreateIssueButton onCreated={fetchIssues} />
      <div className="project-list">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((issue) => (
            <IssueCard key={issue.id} issue={issue} onDeleted={handleDeleted} />
          ))
        ) : (
          <p style={{ color: 'red' }}>No issues found.</p>
        )}
      </div>
    </div>
  );
}

export default Issue;
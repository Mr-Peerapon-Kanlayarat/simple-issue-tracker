import "../styles/IssueCard.css";
import { useNavigate } from "react-router-dom";

function IssueCard({ issue }) {

  return (
    <div className="issue-card">
      <h2>{issue.title}</h2>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
    </div>
  );
}

export default IssueCard;

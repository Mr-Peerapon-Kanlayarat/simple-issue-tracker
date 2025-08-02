import "../styles/IssueCard.css";
import axios from 'axios';
import { useState } from "react";

function IssueCard({ issue, onDeleted }) {
  const [status, setStatus] = useState(issue.status);
  const [deleting, setDeleting] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      await axios.put(`http://localhost:8000/api/issues/${issue.id}`, { status: newStatus });
    } catch (err) {
      setStatus(issue.status);
      alert('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this issue?')) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:8000/api/issues/${issue.id}`);
      if (onDeleted) onDeleted(issue.id);
    } catch (err) {
      alert('Failed to delete issue');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="issue-card">
      <h2>{issue.title}</h2>
      <p>{issue.description}</p>
      <div className="button-container">
      <select value={status} onChange={handleStatusChange}>
        <option value="open">open</option>
        <option value="in progress">in progress</option>
        <option value="done">done</option>
      </select>
      <button className="delete-issue-btn" onClick={handleDelete} disabled={deleting}>
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
      </div>
    </div>
  );
}

export default IssueCard;

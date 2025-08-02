
import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "../styles/CreateIssueButton.css";

function CreateIssueButton({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`http://localhost:8000/api/projects/${projectId}/issues`, {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      setOpen(false);
      if (onCreated) onCreated(res.data);
    } catch (err) {
      setError("Failed to create issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="create-issue-btn" onClick={() => setOpen(true)}>
        + Create Issue
      </button>
      {open && (
        <div className="modal-overlay-issue">
          <div className="modal-content-issue">
            <form onSubmit={handleSubmit}>
              <h2>Create New Issue</h2>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="modal-actions-issue">
                <button type="button" onClick={() => setOpen(false)} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateIssueButton;

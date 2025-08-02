
import React, { useState } from "react";
import axios from "axios";
import "../styles/CreateProjectButton.css";

function CreateProjectButton({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/api/projects", {
        title,
        description,
        userId: 1,
      });
      setTitle("");
      setDescription("");
      setOpen(false);
      if (onCreated) onCreated(res.data);
    } catch (err) {
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="create-project-btn" onClick={() => setOpen(true)}>
        + Create Project
      </button>
      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <h2>Create New Project</h2>
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
              <div className="modal-actions">
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

export default CreateProjectButton;

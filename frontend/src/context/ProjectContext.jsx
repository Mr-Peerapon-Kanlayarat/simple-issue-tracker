import React, { createContext, useReducer, useContext, useEffect } from "react";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

function projectReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const ProjectContext = createContext();

export function ProjectProvider({ children, userId }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_START" });
    fetch(`http://localhost:8000/api/projects/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      });
  }, [userId]);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return useContext(ProjectContext);
}

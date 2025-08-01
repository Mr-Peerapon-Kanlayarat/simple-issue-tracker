import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Register from './routes/Register.jsx';
import Login from './routes/Login.jsx';
import Home from './routes/Home.jsx';
import Issue from './routes/Issue.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/issue',
    element: <Issue />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

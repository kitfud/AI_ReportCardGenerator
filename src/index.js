import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import ErrorPage from './ErrorPage';
import LandingPage from './LandingPage';
import LessonPlanner from './LessonPlanner';
import ParticlesEffect from './ParticlesEffect';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
  } from "react-router-dom";
import { dividerClasses } from '@mui/material';
import Companion from './Companion';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarWrapper/>,
      errorElement:<ErrorPage/>,
      children:[
        {
            path:"/",
            element:<LandingPage/>
        },
        {
            path:'/reportgenerator',
            element:<App/>
        },
        {
            path:'/lessonplanner',
            element:<LessonPlanner/>
        },
        {
          path:'/companion',
          element:<Companion/>
      },
      ]
    },
  ]);

function NavbarWrapper(){
    return(
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
   
    <RouterProvider router={router}/>
   
    </>
  
);


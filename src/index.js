import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import ErrorPage from './ErrorPage';
import LandingPage from './LandingPage';
import LessonPlanner from './LessonPlanner';
import Demo from './Demo'


import {
    createBrowserRouter,
    RouterProvider,
    Outlet
  } from "react-router-dom";
import { dividerClasses,Box,createTheme,ThemeProvider } from '@mui/material';
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
            element:<App/>,
          
        },
        {
            path:'/lessonplanner',
            element:<LessonPlanner/>,
     
        },
        {
          path:'/companion',
          element:<Companion/>,
          
      },
      {
        path:'/demo',
        element:<Demo/>,
        
    },
      ]
    },
  ]);

const theme = createTheme()

theme.typography.h1 = {
  fontSize: '80px',
  '@media (min-width:600px)': {
    fontSize: '100px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '150px',
  },
};

theme.typography.h6 = {
  fontSize: '11px',
  '@media (min-width:600px)': {
    fontSize: '20px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '30px',
  },
};



function NavbarWrapper(){
    return(
      <ThemeProvider theme = {theme}>
        <Box>
            <Navbar />
            <Outlet/>
        </Box>
        </ThemeProvider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
    <>
   
    <RouterProvider router={router}/>
   
    </>
  
);


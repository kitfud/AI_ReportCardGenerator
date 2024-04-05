import React from 'react'
import { useState,useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Box,AppBar,Container, 
    Toolbar,
    Typography,
    Menu,
    MenuItem
 } from '@mui/material'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ParticlesEffect from './ParticlesEffect';

const Navbar = () => {
    const [landingActive,setLandingActive] = useState(false)
    const [reportActive,setReportActive] = useState(false)
    const [lessonActive,setLessonActive] = useState(false)
    const [companionActive,setCompanionActive] = useState(false)

    const location = useLocation()

useEffect(()=>{

if(location.pathname == "/"){
  setLandingActive(true)
  setReportActive(false)
  setCompanionActive(false)
  setLessonActive(false)
}
else if (location.pathname == "/reportgenerator"){
  setLandingActive(false)
  setReportActive(true)
  setCompanionActive(false)
  setLessonActive(false)
}
else if (location.pathname == "/lessonplanner"){
  setLandingActive(false)
  setReportActive(false)
  setCompanionActive(false)
  setLessonActive(true)
}
else{
  setLandingActive(false)
  setReportActive(false)
  setCompanionActive(true)
  setLessonActive(false)
}

},[location])




  return (
    <>
   <ParticlesEffect/>
    <AppBar
    position='static'
    sx={{width:'100%',height:'70px',opacity:'80%'}}
    >
     
       <Container maxWidth="xl">
    <Toolbar disableGutters>
 
    <Link style={landingActive?{color:"#81D8D0"}:{color:"white"}} to="/">
    <VolunteerActivismIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
    <Typography
            variant="h6"
            noWrap
         
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: "Bebas Neue",
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            EduCare
          </Typography>


          </Link>
          <Link style={reportActive?{ color: "#81D8D0" }:{color:"white"}} to="/reportgenerator">
          <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, marginLeft:'50px',fontFamily: "Bebas Neue" }}>
            Report Generator
          </Typography>
          </Link>

        <Link style={lessonActive?{color:"#81D8D0"}:{color:"white"}} to="/lessonplanner">
          <Typography 
          variant="h6" 
          component="div" 
          sx={{ marginLeft:'30px',fontFamily: "Bebas Neue" }}>
            Lesson Planner
          </Typography>  
        </Link>


        <Link style={companionActive?{color:"#81D8D0"}:{color:"white"}} to="/companion">
          <Typography 
          variant="h6" 
          component="div" 
          sx={{ marginLeft:'30px',fontFamily: "Bebas Neue" }}>
            ConstantCompanion
          </Typography>  
        </Link>
    </Toolbar>
       </Container>
    </AppBar>
    </>
  )
  
}

export default Navbar
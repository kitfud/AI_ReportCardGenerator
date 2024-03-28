import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box,AppBar,Container, 
    Toolbar,
    Typography,
    Menu,
    MenuItem
 } from '@mui/material'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
  return (
    <AppBar
    position='static'
    sx={{width:'100%',height:'70px',opacity:'80%'}}
    >
     
       <Container maxWidth="xl">
    <Toolbar disableGutters>
    
    <Link style={{color:"white"}} to="/">
    <VolunteerActivismIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
    <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EduCare
          </Typography>
          </Link>

          <Link style={{ color: 'white' }} to="/reportgenerator">
          <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, marginLeft:'50px' }}>
            Report Generator
          </Typography>
          </Link>

        <Link style={{color:"white"}} to="/lessonplanner">
          <Typography 
          variant="h6" 
          component="div" 
          sx={{ marginLeft:'30px' }}>
            Lesson Planner
          </Typography>  
        </Link>
        <Link style={{color:"white"}} to="/papergrader">
          <Typography 
          variant="h6" 
          component="div" 
          sx={{ marginLeft:'30px' }}>
            Paper Grader
          </Typography>  
        </Link>
    </Toolbar>
       </Container>
    </AppBar>
  )
}

export default Navbar
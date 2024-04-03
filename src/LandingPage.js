import React, { useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const LandingPage = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const topRef = useRef(null);

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Box ref={topRef} sx={{textAlign:'center', 
      justifyContent: 'center', 
      alignItems: 'center', height: '20vh',marginTop:'20px' }}>
      <VolunteerActivismIcon color="primary" sx={{fontSize:'50px'}}/>
        <Typography 
        color="primary"
        variant="h1" sx={{ fontWeight: 'bold' }}>EduCare</Typography>
      </Box>
      <Box sx={{ 
        margin:'auto',
        width:'90%',
        padding: '2rem' }}>
        <Button variant="contained" onClick={() => scrollToSection(aboutRef)}>About Us</Button>
        <Button variant="contained" onClick={() => scrollToSection(servicesRef)}>Services</Button>
        <Button variant="contained" onClick={() => scrollToSection(contactRef)}>Contact</Button>
      </Box>
      <Box ref={aboutRef} sx={{
      margin:'auto',
      padding: '2rem', 
      width:'90%',
      backgroundColor: '#e0e0e0',
      height:'50vh'}}>
        <Typography variant="h4">About Us</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
          nunc ut aliquam tincidunt, nisl lectus feugiat enim, vitae mollis 
          dolor diam vel odio. 
        </Typography>
      </Box>
      <Box ref={servicesRef} sx={{ padding: '2rem',
      margin:'auto',
      width:'90%',
      height:'50vh' }}>
        <Typography variant="h4">Services</Typography>
        <Typography>
          Donec ullamcorper nulla non metus auctor fringilla. 
          Vestibulum id ligula porta felis euismod semper. 
        </Typography>
      </Box>
      <Box ref={contactRef} sx={{ padding: '2rem', 
      backgroundColor: '#e0e0e0',
      margin:'auto',
      width:'90%',
      height:'50vh' }}>
        <Typography variant="h4">Contact Us</Typography>
        <Typography>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. 
        </Typography>
     
      </Box>
      <Box sx={{textAlign:'center',left:'90%',margin:'20px'}}>
      <Button 
      variant="contained" 
      onClick={() => scrollToSection(topRef)}><ArrowCircleUpIcon/></Button>
      </Box>
     
     
    </>
  );
};

export default LandingPage;
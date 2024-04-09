import React, { useRef } from 'react';
import { useState } from 'react';
import { Button, Typography,
Grid,
   Box,
   Card,
  Modal,
Tooltip } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';

import NoteAltTwoToneIcon from '@mui/icons-material/NoteAltTwoTone';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';

import PublicIcon from '@mui/icons-material/Public';
import CopyrightIcon from '@mui/icons-material/Copyright';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'lightgray',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{width:"700",height:"315"}}
      >
        <Box sx={style}>
          <Box sx={{textAlign:'center'}}>
          <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/p9r6DF8SJQs?si=ihE88GIFJ6kYjWaH" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </Box>
       
          <Typography id="modal-modal-description" sx={{ mt: 2,textAlign:'center' }}>
            Learn some React....new video to be uploaded soon.
          </Typography>
        </Box>
      </Modal>

      <Box ref={topRef} sx={{textAlign:'center', 
      justifyContent: 'center', 
      alignItems: 'center', height: '20vh',marginTop:'90px' }}>
      <VolunteerActivismIcon  sx={{fontSize:'50px',color:"#81D8D0"}}/>
        <Typography 
        color="#81D8D0"
        variant="h1"  fontFamily= "Bebas Neue" sx={{ fontSize:{xs:'70px',sm:'100px',md:'120px',lg:'140px'},fontWeight: 'bold',textShadow: "2px 2px gray" }}>EduCare</Typography>
      </Box>

      <Box sx={{ 
        margin:'auto',
        width:'90%',
        padding: '2rem' }}>
      
        <Button className="buttonHover" sx={{margin:'2px',}} variant="contained" onClick={() => scrollToSection(aboutRef)}><Typography   fontFamily= "Bebas Neue" sx={{fontSize:{xs:'10px',md:'20px',lg:'20px'}}}>About</Typography></Button>
        <Button className="buttonHover" sx={{margin:'2px',}} variant="contained" onClick={() => scrollToSection(servicesRef)}><Typography fontFamily= "Bebas Neue" sx={{fontSize:{xs:'10px',md:'20px',lg:'20px'}}}>Services</Typography></Button>
        <Button className="buttonHover" sx={{margin:'2px',}} variant="contained" onClick={() => scrollToSection(contactRef)}><Typography fontFamily= "Bebas Neue" sx={{fontSize:{xs:'10px',md:'20px',lg:'20px'}}}>Contact</Typography></Button>
        
      </Box>

      <Box ref={aboutRef} sx={{
      display:{ xs: "relative", md: "flex", lg: "flex" },
      textAlign:'center',
      margin:'auto',
      padding: '2rem', 
      width:'100%',
      backgroundColor: '#e0e0e0',
      opacity:'60%',
      height:{xs:'30vh',md:'31vh',lg:'40vh'}}}>
        
        <Box sx={{width:'100%',margin:'auto'}}>
        <Tooltip title="learn about the product by video" placement='top'>
        <Typography 
        color="primary"
        variant="h4"
        fontFamily= "Bebas Neue"
        onClick={handleOpen}
        className='titleHover'
        ><u>About Us</u>
        </Typography>

        </Tooltip>
        <Typography fontFamily= "Bebas Neue" color="primary" variant='h6' sx={{marginLeft:'10px'}}>
          A one stop shop for your teaching needs! Our product seeks to address some of the time crunches which happen throughout the school year with our AI enhanced productivity features. 
        </Typography> 
        </Box>
     
        <Box sx={{display:'block',width:'100%',margin:'auto'}}>
          <Typography>
          <SchoolIcon color='primary' sx={{ marginRight:'50px',
          fontSize: { xs: "150px", md: "200px", lg: "300px" }, }}/>
          </Typography>
       
        </Box>
        </Box>

      <Box ref={servicesRef} sx={{ 
      display:'relative',
      padding: '2rem',
      margin:'auto',
      marginBottom:'10px',
      width:'90%',
      height:'45vh' }}>
        <Typography 
        fontFamily= "Bebas Neue"
        color="primary"
        variant="h2" 
        sx={{textAlign:'center',fontWeight:'bold',color:"#81D8D0",textShadow: "2px 2px gray"}} >Services</Typography>
        <Typography 
        fontFamily= "Bebas Neue"
        variant="h5"
        color="primary"
        sx={{textAlign:'center',fontWeight:'bold',color:"#81D8D0",textShadow: "2px 2px gray"}}>
          Test our innovative products:
        </Typography>


<Box sx={{display:'fixed',marginTop:'40px'}}>
<Card sx={{width:'33%',backgroundColor:'transparent',textAlign:'center',padding:'5px'}}>
<Tooltip title="visit the Report Generator" placement="top-end">
<Link  style={{ color: 'white' }} to="/reportgenerator" >
<NoteAltTwoToneIcon className="linkHover" sx={{color:'darkgray',fontSize:{xs:'50px',md:'30px',lg:'100px'}}}/>
<Typography  fontFamily= "Bebas Neue" className="linkHover" sx={{color:'darkgray'}} variant='h6'><u>Report Generator </u></Typography>
</Link>
</Tooltip>
<Box>
  <Typography  fontFamily= "Bebas Neue" sx={{color:'darkgray',marginBottom:'10px'}} variant='h6'>Generate reports for your students based on a final grade or series of assignments.</Typography>
</Box>
</Card>
<Card sx={{width:'33%',
padding:'5px',
backgroundColor:'transparent',textAlign:'center'}}>
  <Tooltip title="visit the Lesson Planner" placement="top-end">
<Link  style={{ color: 'white' }} to="/lessonplanner">
<WorkHistoryRoundedIcon className="linkHover" sx={{color:'darkgray',fontSize:{xs:'50px',md:'30px',lg:'100px'}}}/>
<Typography  fontFamily= "Bebas Neue" className="linkHover" sx={{color:'darkgray'}} variant='h6'><u>Lesson Planner </u></Typography>
</Link>
</Tooltip>
<Typography  fontFamily= "Bebas Neue" sx={{color:'darkgray',marginBottom:'10px'}} variant='h6'>Generate reports for your students based on a final grade or series of assignments.</Typography>
</Card>
<Card sx={{width:'33%',
padding:'5px',
backgroundColor:'transparent',textAlign:'center'}}>
  <Tooltip title="visit the Constant Companion" placement="top-end">
<Link  style={{ color: 'white' }} to="/companion">
<TagFacesRoundedIcon className="linkHover" sx={{color:'darkgray',fontSize:{xs:'50px',md:'30px',lg:'100px'}}}/>
<Typography  fontFamily= "Bebas Neue" className="linkHover" sx={{color:'darkgray'}} variant='h6'><u>Constant Companion</u></Typography>
</Link>
</Tooltip>
<Typography  fontFamily= "Bebas Neue" sx={{color:'darkgray',marginBottom:'10px'}} variant='h6'>Generate reports for your students based on a final grade or series of assignments.</Typography>
</Card>
        </Box>
      </Box>

<Box ref={contactRef} sx={{ 
      padding: '2rem', 
      display:'fixed',
      backgroundColor: '#e0e0e0',
      marginTop:'10px',
      width:'100%',
      opacity:'60%',
      height:'10vh',
      textAlign:'center',
      }}>
        
        <Box sx={{width:'50%',margin:'auto'}}>

        <Typography 
        color="primary"
        fontFamily= "Bebas Neue"
        variant="h6">
          Contact Us</Typography>
        <PublicIcon
          color="primary"
          sx={{fontSize:'20px'}}
          />
          <Typography color="primary"
          variant='h6'
          fontFamily= "Bebas Neue"
          >kitfuderich@email.com</Typography>
        </Box>
      
        
         <Box sx={{width:'50%',margin:'auto'}}>
         <Typography 
          fontFamily= "Bebas Neue"
        color="primary"
        variant="h6">Copyright</Typography>
         <CopyrightIcon sx={{fontSize:'20px'}} color="primary"/>
          <Typography  fontFamily= "Bebas Neue" variant='h6' color="primary">2024 Kit Fuderich</Typography>
         </Box>
      </Box>
     

      <Box sx={{textAlign:'center',left:'90%',margin:'20px'}}>
      <Tooltip title="scroll to top">
      <Button 
      sx={{width:'200px'}}
      className="buttonHover"
      variant="contained" 
      onClick={() => scrollToSection(topRef)}><ArrowCircleUpIcon/></Button>
      </Tooltip>
      </Box>
     
     
    </>
  );
};

export default LandingPage;
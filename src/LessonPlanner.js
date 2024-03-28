import React from 'react'
import { useState,useEffect,useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 
import particleOptions from './particleOptions.js';
import {
    Box, 
    TextField, 
    Typography, 
    Card, 
    Button,
    Snackbar,
    IconButton,
    CircularProgress,
    Tooltip,
    Slider,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel
  
  } from "@mui/material"
import { EnhancedEncryption } from '@mui/icons-material';

const LessonPlanner = () => {

    const [environment, setEnvironment] = React.useState('');
    const [valueRadio, setValueRadio] = React.useState('no');
    const [grade,setGrade] = useState(null)
    const [subject,setSubject] = useState(null)
    const [topic,setTopic] = useState(null)
    const [lessonLength,setLessonLength] = useState(null)
    const [priorKnowledge,setPriorKnowledge] = useState(null)

    const handleChange = (event) => {
        setEnvironment(event.target.value);
      };


    const [init, setInit] = useState(false);
    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
          // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
          // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
          // starting from v2 you can add only the features you need reducing the bundle size
          //await loadAll(engine);
          //await loadFull(engine);
          await loadSlim(engine);
          //await loadBasic(engine);
        }).then(() => {
          setInit(true);
        });
      }, []);
  
      const particlesLoaded = (container) => {
        console.log(container);
      };
  
      const options = useMemo(
        () => (
       particleOptions
        ),
        [],
      );

      

const handleChangeRadio = (event) => {
setValueRadio(event.target.value);
};



const [aiquery,setAIQuery] = useState(null)

const generateLessonPlan =(event)=>{
let prompt = `Create a single JSON object for a single lesson plan. Specifically for ${grade} grade level students undertaking a ${subject} unit to learn about ${topic}.`
let environmentDetails = `The lesson plan should be appropriate for a ${environment} context.`
let addedContext = `The lesson plan should consider details about students prior knowledge:${priorKnowledge}.`
let timeframe = `The timeframe for the lesson is ${lessonLength} minutes long.`
let prompt2 = 'The lesson plan should include an opening, activity, discussion, and closing portion, along with specific SWABAT objectives, resources, and assessments with pacing guideliens.Also, provide a section on the lesson\'s Big Ideas- overarching concept to be taught.'

function checkEnvironment(){
    if(environment!==""&& environment!=="N/A"){
        return environmentDetails
    }
    else{
        return ""
    }
}

function checkContext(){
    if(priorKnowledge!==""&& priorKnowledge!==null&& valueRadio=="yes"){
        return addedContext
    }
    else{
        return ""
    }
}

let AIQuery = prompt + checkEnvironment() + checkContext()+ timeframe+ prompt2
console.log(AIQuery)
setAIQuery(AIQuery)

}

  return (
    <>
      {
    init?
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />:null
   }
    <div className="App">
    <header className="App-header">
   <Card sx={{margin:'20px',width:'600px',borderRadius:'2%'}}>
    <Typography>Lesson Planner</Typography>
    <Box sx={{marginTop:'20px'}}>
        <TextField 
        onChange={(e)=>{setGrade(e.target.value)}}
        label="Grade Level"/>
    </Box>
    <div>
      <FormControl sx={{ m: 1, minWidth: '80%' }}>
        <InputLabel id="demo-simple-select-autowidth-label">Environment</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={environment}
          onChange={handleChange}
          autoWidth
          label="Environment"
        >
          <MenuItem value="N/A">
            <em>Not Applicable (N/A)</em>
          </MenuItem>
          <MenuItem value={'Public School USA'}>Public School [USA]</MenuItem>
          <MenuItem value={'Independent Private School USA'}>Independent/Private School [USA]</MenuItem>
          <MenuItem value={'International Baccalaureate School'}>International Baccalaureate School [IB]</MenuItem>
          <MenuItem value={'College/University'}>College/University</MenuItem>
        </Select>
      </FormControl>
    </div>

    <Box sx={{marginTop:'20px'}}>
        <TextField
        onChange={(e)=>{setSubject(e.target.value)}} 
        label="Subject"/>
    </Box>
    <Box sx={{marginTop:'20px'}}>
        <TextField 
         onChange={(e)=>{setTopic(e.target.value)}} 
        label="Topic"/>
    </Box>
    <Box sx={{marginTop:'20px'}}>
        <TextField
        onChange={(e)=>{setLessonLength(e.target.value)}}  
        label="Lesson Length (min)"/>
    </Box>

    <FormControl>
      <FormLabel>Log information about student's prior knowledge?</FormLabel>
      <RadioGroup 
         value={valueRadio}
         onChange={handleChangeRadio}
      row sx={{justifyContent:'center'}}>
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
{
    valueRadio=="yes"?
    <Box>
<TextField 
onChange={(e)=>setPriorKnowledge(e.target.value)} 
sx={{padding:'20px',width:'40%'}} multiline 
/>
    </Box>
    : null
}
<Box sx={{margin:'20px'}}>
    <Button 
    onClick={generateLessonPlan}
    variant="contained">GENERATE LESSON PLAN</Button>
</Box>
   </Card>
        </header> 
   </div>

   {aiquery}

    </>
  )
}

export default LessonPlanner
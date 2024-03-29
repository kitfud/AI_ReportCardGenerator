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

    // node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = process.env.REACT_APP_GOOGLE_API;
  
  async function run(input) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const result = await model.generateContent([input]);
   
    const response = result.response;
    const responseText = response.text()
    console.log(responseText);
    setAIResponse(responseText)
    setProcessing(false)
   
  }
  
 

    const [environment, setEnvironment] = React.useState('');
    const [valueRadio, setValueRadio] = React.useState('no');
    const [grade,setGrade] = useState(null)
    const [subject,setSubject] = useState(null)
    const [topic,setTopic] = useState(null)
    const [lessonLength,setLessonLength] = useState(null)
    const [priorKnowledge,setPriorKnowledge] = useState(null)
    const [aiquery,setAIQuery] = useState(null)
    const [airesponse,setAIResponse] = useState(null)
    const [processing,setProcessing] = useState(false)

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


const generateLessonPlan =()=>{

setProcessing(true)

let prompt = `Create a single lesson plan in JSON format so the sections can easily be parsed out. Specifically for ${grade} grade level students undertaking a ${subject} unit to learn about ${topic}.`
let exampleJSON = `Here is an example of what the structure of the JSON object should look like: {
    "lessonPlan": {
      "gradeLevel": 6,
      "subject": "Math",
      "unit": "Multiplication",
      "context": "USA Independent Private School",
      "SWABAT": [
        "Explain the concept of multiplication as repeated addition.",
        "Use multiplication facts to solve simple multiplication problems.",
        "Apply multiplication to real-world situations."
      ],
      "resources": [
        "Whiteboard or chart paper",
        "Markers",
        "Small objects (e.g., counters, beans, cubes)",
        "Multiplication flashcards"
      ],
      "assessments": [
        "Exit ticket: Students will solve a short multiplication problem independently.",
        "Observation: Teacher will observe student participation and understanding during activities."
      ],
      "bigIdeas": {
        "Multiplication is a mathematical operation that represents repeated addition.",
        "Multiplication can be used to solve a variety of real-world problems."
      },
      "timeframe": 50,
      "sections": [
        {
          "type": "Opening",
          "pacing": 5,
          "activities": [
            "Review prior knowledge: Ask students to share what they know about multiplication.",
            "Introduce the concept of multiplication as repeated addition: Use concrete materials (e.g., counters) to demonstrate how multiplication represents adding the same number multiple times."
          ]
        },
        {
          "type": "Activity",
          "pacing": 20,
          "activities": [
            "Multiplication facts practice: Lead students in practicing multiplication facts using flashcards or a game.",
            "Word problem solving: Present students with simple word problems that require them to use multiplication to find the solution."
          ]
        },
        {
          "type": "Discussion",
          "pacing": 15,
          "activities": [
            "Discuss the application of multiplication in real-world situations: Ask students to identify examples of how multiplication is used in everyday life.",
            "Introduce strategies for solving multiplication problems: Share different strategies (e.g., skip counting, breaking down numbers) that students can use to solve multiplication problems more efficiently."
          ]
        },
        {
          "type": "Closing",
          "pacing": 10,
          "activities": [
            "Review the key concepts of the lesson: Summarize the main points about multiplication discussed in the lesson.",
            "Exit ticket: Distribute an exit ticket with a multiplication problem for students to solve independently."
          ]
        }
      ]
    }
  }`
let environmentDetails = `The lesson plan should be appropriate for a ${environment} context.`
let addedContext = `The lesson plan should consider details about students prior knowledge:${priorKnowledge}.`
let timeframe = `The timeframe for the lesson is ${lessonLength} minutes long. `
let prompt2 = 'The lesson plan should include an opening, activity, discussion, and closing portion; include pacing details for each section. At beginning of lesson plan include specific SWABAT objectives, resources, and assessments.Also, provide a section on the lesson\'s Big Ideas- overarching concept to be taught.'

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

let AIQuery = prompt + exampleJSON+ checkEnvironment() + checkContext()+ timeframe+ prompt2
console.log(AIQuery)
setAIQuery(AIQuery)
run(AIQuery)
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
{
!processing?
<Box sx={{margin:'20px'}}>
    <Button 
    onClick={generateLessonPlan}
    variant="contained">GENERATE LESSON PLAN</Button>
</Box>:<Box>
<CircularProgress/>
    </Box>
}
   </Card>
        </header> 
   </div>

   {airesponse}

    </>
  )
}

export default LessonPlanner
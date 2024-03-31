import React from 'react'
import { useState,useEffect,useMemo,useRef } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 
import ReactCardFlip from 'react-card-flip';
import particleOptions from './particleOptions.js';
import DownloadIcon from '@mui/icons-material/Download';

import * as htmlToImage from "html-to-image";
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
    setFlip(true)
   
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

    const [flip, setFlip] = useState(false);

//section of area to take a screenshot of
const screenshotArea = useRef(null);

const handleLessonDownload = async () => {
    if (!screenshotArea.current) return;
    await htmlToImage.toJpeg(screenshotArea.current).then(downloadFile);
  };

const downloadFile = (image, { name = "lesson-shot", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const createFileName = (extension = "", ...names) => {
    if (!extension) {
      return "";
    }
    return `${names.join("")}.${extension}`;
  };
  

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

let prompt = `Create a lesson plan in JSON format so the sections can easily be parsed out. Don't put any trailing characters/words or symbols before the JSON object begins (specifically-before the first '{' symbol). Specifically for ${grade} grade level students undertaking a ${subject} unit to learn about ${topic}.`
let exampleJSON = `Here is an example of what the structure of the JSON object should look like: {
    {
        "lessonPlan": {
          "gradeLevel": 7,
          "subject": "English",
          "unit": "Reading",
          "context": "USA Public School",
          "SWABAT": [
            "Analyze a variety of literary text features.",
            "Apply reading strategies to understand text.",
            "Write a paragraph summarizing a text."
          ],
          "resources": [
            "Literary text (e.g., short story, article, poem)",
            "Whiteboard or chart paper",
            "Markers",
            "Sticky notes",
            "Writing paper"
          ],
          "assessments": [
            "Text feature analysis: Students will identify and explain different text features in a literary text.",
            "Reading comprehension quiz: Students will answer questions about the text to demonstrate their understanding.",
            "Summary writing: Students will write a paragraph summarizing the main points of the text."
          ],
          "bigIdeas": [
           "Reading is a complex process that involves understanding different text features.",
            "Applying reading strategies can enhance comprehension and engagement.",
            "Writing a summary is an effective way to synthesize and recall information from a text."
          ],
          "timeframe": 60,
          "sections": [
            {
              "type": "Opening",
              "pacing": 10,
              "activities": [
                "Review prior knowledge: Ask students about different text features they have encountered in previous reading experiences.",
                "Introduce text feature analysis: Explain the purpose and types of text features, and their importance for understanding a text."
              ]
            },
            {
              "type": "Activity",
              "pacing": 25,
              "activities": [
                "Text feature scavenger hunt: Provide students with a copy of the literary text and have them identify and explain different text features using sticky notes.",
                "Collaborative text discussion: Divide students into small groups to discuss and share their findings from the scavenger hunt, focusing on the significance of each text feature."
              ]
            },
            {
              "type": "Discussion",
              "pacing": 15,
              "activities": [
                "Reading strategy application: Introduce or review reading strategies such as visualizing, inferencing, and making connections.",
                "Guided reading: Lead students in applying reading strategies to a specific section of the text, modeling how to make predictions, ask questions, and connect to prior knowledge."
              ]
            },
            {
              "type": "Closing",
              "pacing": 10,
              "activities": [
                "Summary writing: Have students write a paragraph summarizing the main points of the text, focusing on the key ideas and supporting details.",
                "Exit ticket: Distribute an exit ticket with a question or prompt that assesses students' understanding of the reading strategies and text features discussed in the lesson."
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

const formatLesson = (lessonDetails)=>{
    if(lessonDetails){
    //let objectLesson = JSON.parse(lessonDetails)
    let parsedDetails = ""
    let jsonBegin = false
    for(let i = 0; i<lessonDetails.length;i++){
        if(lessonDetails[i]=='{'){
            jsonBegin = true
        }
        if(jsonBegin){
            parsedDetails +=lessonDetails[i]
        }
    }
    let parsed = JSON.parse(parsedDetails)
    // console.log("parsed",parsed.lessonPlan)
    const gradeLevel = parsed.lessonPlan.gradeLevel
    const subject = parsed.lessonPlan.subject
    const unit = parsed.lessonPlan.unit
    const context = parsed.lessonPlan.context
    const learningGoals = parsed.lessonPlan.SWABAT
    const assessments = parsed.lessonPlan.assessments
    const bigIdeas = parsed.lessonPlan.bigIdeas
    const timeframe = parsed.lessonPlan.timeframe
    const resources = parsed.lessonPlan.resources
    const sections = parsed.lessonPlan.sections

    return(
        <>
        <Card sx={{padding:'10px'}}>
        <Typography>Lesson Details</Typography> 
        <Tooltip title="download lesson Image" placement="right">
        <Button
        class = "hoverColor"
        onClick={handleLessonDownload} 
        variant="outlined">
            <DownloadIcon/>
        </Button> 
        </Tooltip>
        <ul>
            <li>
                Grade Level: {gradeLevel}
            </li>
            <li>
                Subject: {subject}
            </li>
            <li>
                Unit: {unit}
            </li>
            <li>
                Context: {context}
            </li>
            <li>
                Lesson Timeframe:{timeframe} minutes
            </li>
        </ul>
        <Typography>Learning Goals:</Typography>
        {
            learningGoals.map(item=>{
                return(
                    <div>{item}</div>
                )
            })
        }
        <Typography sx={{marginBottom:'20px'}}>Big Ideas:</Typography>
        {
            bigIdeas.map(item=>{
                return(
                   <div> {item}</div>
                )
            })
        }
    
    <Typography sx={{marginBottom:'20px'}}>Assessements:</Typography>
        {
            assessments.map(item=>{
                return(
                    <div>{item}</div>
                )
            })
        }
<Typography sx={{marginTop:'20px'}}>Resources:</Typography>
        {
            resources.map(item=>{
                return(
                    <div>{item}</div>
                )
            })
        }

<Typography sx={{marginTop:'20px'}}>Sequence:</Typography>

{
    sections.map(item=>{
        return(
        <>
        <div><b>{item.type} </b>/ pacing:{item.pacing} min</div>
         {item.activities.map(i=>( 
        <ul>
            <li>{i}</li>
        </ul>
    ))
    }
        </>

        )
    })
    }


    </Card>
        </>
    )
    }

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
    <ReactCardFlip isFlipped={flip}
            flipDirection="vertical">
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
<center>
<Card sx={{backgroundColor:"whitesmoke",width:'80%'}}>
<div ref={screenshotArea}>
{formatLesson(airesponse)}
</div>
<Button 
sx={{margin:'20px'}}
variant="contained" onClick={() => setFlip(!flip)}
>Back To Lesson Plan Creator</Button>
</Card>
</center>




          
        </ReactCardFlip>

  
   </div>
   <center>


  
   </center>

    </>
  )
}

export default LessonPlanner
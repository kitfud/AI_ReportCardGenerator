import React from 'react'
import { useState,useRef,useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import DownloadIcon from '@mui/icons-material/Download';
import ExampleLessonJSON from './ExampleLesson.json'

import * as htmlToImage from "html-to-image";
import {
    
    Box, 
    TextField, 
    Typography, 
    Card, 
    Button,
    CircularProgress,
    Tooltip,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Paper,
    Grid

  
  } from "@mui/material"
import { EnhancedEncryption } from '@mui/icons-material';

const LessonPlanner = () => {

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
  
    try{
    const result = await model.generateContent([input]);
   
    const response = result.response;
    const responseText = response.text()
    console.log(responseText);
    setAIResponse(responseText)
    setProcessing(false)
    setFlip(true)
    }
    catch(error){
      alert("a processing error has occured: "+ error)
    }
   
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
    

const handleChangeRadio = (event) => {
setValueRadio(event.target.value);
};


const generateLessonPlan =()=>{

setProcessing(true)
let stringExampleData = JSON.stringify(ExampleLessonJSON)

let prompt = `Create a lesson plan in JSON format so the sections can easily be parsed out. Don't put any trailing characters/words or symbols before the JSON object begins (specifically-before the first '{' symbol). Specifically for ${grade} grade level students undertaking a ${subject} unit to learn about ${topic}.`
let exampleJSON = `Here is an example of what the structure of the JSON object should look like: 
   ${stringExampleData}`
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
        <Paper 
          elevation={24}
         
         sx={{padding:'1px',backgroundColor:'lightgrey'}}>
        <Box sx={{marginBottom:'10px',marginTop:'10px'}}>
        <Tooltip title="download lesson Image" placement="right">
        <Button
        class = "hoverColor"
        onClick={handleLessonDownload} 
        variant="outlined">
            <DownloadIcon/>
        </Button> 
        </Tooltip>
        </Box>

      
      <Box container="true"  sx={{ 
        display:{ xs: "block", md: "flex", lg: "flex" },
  //       direction:"row",
  // justifyContent:"center",
  // alignItems:"center"
        flexDirection:'row',
        justifyContent:"space-between",alignItems:'center',margin:'auto'
        }}>
        
        
            
          <Card sx={{
          display:{ xs: "block", md: "flex", lg: "flex" },
          width:{ xs: "100%", md: "50%", lg: "50%" },
          flexDirection:'column',
          justifyContent: "space-between",
          margin:'5px',
          height: '100%',
          padding:'10px',
          textAlign:'left',
          backgroundColor:'lightblue',
          }}>
        
          <ul>
          <Typography sx={{fontWeight:'bold'}}><u>Lesson Details:</u></Typography> 
            <li>
                <Typography>Grade Level: {gradeLevel}</Typography>
            </li>
            <li>
                <Typography>Subject: {subject}</Typography>
            </li>
            <li>
              <Typography>  Unit: {unit}</Typography>
            </li>
            <li>
                <Typography>Context: {context}</Typography>
            </li>
            <li>
                <Typography>Timeframe: {timeframe} minutes</Typography>
            </li>
        </ul>
      

          <Box>
          <Typography sx={{fontWeight:'bold'}}><u>Assessements:</u></Typography>
        {
            assessments.map(item=>{
                return(
                  <>
                    <Typography>&#x2022;{item}</Typography>
                    <br></br>
                    </>
                )
            })
        }
          </Box>
          </Card>
       
         
          <Card 
          id="learning"
          sx={{
          margin:'5px', 
          alignItems:'left',
          padding:'20px',
          textAlign:'left',
          height: '100%',
          display:{ xs: "block", md: "flex", lg: "flex" },
          width:{ xs: "100%", md: "50%", lg: "50%" },
          flexDirection:'column',
          justifyContent: "space-between",
          backgroundColor:"lightsalmon"

          }}>

          <Box sx={{marginBottom:'20px'}}>
          <Typography sx={{fontWeight:'bold'}}><u>Learning Goals:</u></Typography>
        {
            learningGoals.map(item=>{
                return(<>
                    <Typography>&#x2022;{item}</Typography>
                  
                    </>
                )
            })
        }
         </Box>
             <Typography sx={{fontWeight:'bold'}}><u>Big Ideas:</u></Typography>
        {
            bigIdeas.map(item=>{
                return(
                  <>
                   <Typography>&#x2022;{item}</Typography>
                   <br></br>
                   </>
                )
            })
        }

<Typography sx={{marginTop:'20px',fontWeight:'bold'}}><u>Resources:</u></Typography>
        {
            resources.map(item=>{
                return(
                    <Typography>&#x2022;{item}</Typography>
                )
            })
        }
          </Card>
         
      </Box>


<Box>
   
<Card 
variant='outlined'
raised={true}
sx={{
display:'flex',
padding:'20px',
width:'95%',
backgroundColor:"lightgoldenrodyellow"
}}
>
  
<Box sx={{textAlign:'left',margin:'auto'}}>

{
    sections.map(item=>{
        return(
        <>
        
        <Typography><b>{item.type} </b>/ <i>{item.pacing}</i> min</Typography>
         {item.activities.map(i=>( 
        <ul>
            <li><Typography>{i}</Typography></li>
        </ul>
    ))
    } 
        </>

        )
    })
    }
    </Box>
    </Card>
    </Box>


    </Paper>
        </>
    )
    }

}



  return (
    <>
     
    <div className="App">
    <ReactCardFlip isFlipped={flip}
            flipDirection="vertical">
  <header className="App-header">
  <Typography sx={{fontSize:'50px',
  textShadow: "2px 2px gray",
  marginTop:{xs:'70px',md:'60px',lg:'80px'},
  fontFamily: "Bebas Neue",color:"#81D8D0"}} variant='h1'>Lesson Planner</Typography>
   
   <Card sx={{margin:'20px',width:{xs:'250px',sm:'325px',md:'350px',lg:'350px'},borderRadius:'2%'}}>
    <Box sx={{marginTop:'20px'}}>
        <TextField 
        onChange={(e)=>{setGrade(e.target.value)}}
        label="Grade Level"/>
    </Box>
    <div>
      <FormControl sx={{ m: 1, minWidth: {xs:'77%',sm:'60%',md:'55%',lg:'55%'} }}>
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

    <FormControl sx={{marginTop:'10px'}}>
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
<Card sx={{backgroundColor:"whitesmoke",width:'90%',
marginTop:'100px',
opacity:'0.9'}}>
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
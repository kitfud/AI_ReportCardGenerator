
import './App.css';
import React,{useState,useEffect,useMemo} from 'react'
import AssignmentData from './AssignmentData';
import {
  Link,
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

} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShareIcon from "@mui/icons-material/Share";


import Music from './Music.js';

import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function App() {

const [data,setData] = useState(null)

const [assignmentData, setAssignmentData] = useState([])
const [name,handleName] = useState("")
const [grade,handleGrade] = useState("")

const [generating, setGenerating] = useState(false)
const [length,setCommentLength] = useState(3)

useEffect(()=>{
setGenerating(false)
},[data])


// node --version # Should be >= 18
// npm install @google/generative-ai
const createMessage = ()=>{
  let commentData= `Make sure the comment is no longer than ${length} setances long. Use the following data:`
  let input = commentData + `Student's Name:${name}, Overall Grade:${grade},`

  assignmentData.forEach((element)=>{
    let dataString = `Assignment: ${element.assignment},Comment: ${element.comment};`
    
    input = input + dataString
    })
    console.log(input)
    return input
  }

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.REACT_APP_GOOGLE_API;

async function runChat() {
 
  setGenerating(true)
  
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1048,
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



  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "Can you help me turn the following student data into a paragraph style comment for report cards"}],
      },
      {
        role: "model",
        parts: [{ text: "You did not provide any student data to turn into a paragraph-style comment for report cards. Please provide the student data, including information about the student's academic performance, behavior, and any other relevant details, so I can assist you in crafting a comment."}],
      },
      {
        role: "user",
        parts: [{ text: "Name: SarahOverall Grade: 78%Assignment: Rock ThrowingComment: Did a nice job but didn’t quite get the stones in the target area. Grade: 50%Assignment: Flower PickingComment: What an amazing job getting those flowers collected. So complete. Grade: 80%"}],
      },
      {
        role: "model",
        parts: [{ text: "**Student Name:** Sarah\n\n**Overall Grade:** 78%\n\n**Comments:**\n\nSarah is a diligent student who consistently demonstrates a strong work ethic. Her assignment on rock throwing showcases her ability to follow instructions and apply her knowledge in a practical setting. While she did not quite achieve the target area, her effort and progress are commendable.\n\nIn her flower picking assignment, Sarah excelled. She demonstrated exceptional attention to detail and a thorough understanding of the task. Her ability to complete the assignment so thoroughly is a testament to her dedication and commitment to her studies.\n\nOverall, Sarah is a valuable asset to her class. Her positive attitude, willingness to learn, and consistent effort make her a model student. With continued hard work and dedication, she has the potential to achieve great things."}],
      },
      {
        role: "user",
        parts: [{ text: "only give me the comment in a short paragraph format"}],
      },
      {
        role: "model",
        parts: [{ text: "**Comment:**\n\nSarah is a diligent and dedicated student who consistently demonstrates a strong work ethic. Her assignments showcase her ability to follow instructions and apply her knowledge. While she did not quite achieve the target area in her rock throwing assignment, her effort and progress are commendable. In her flower picking assignment, she excelled, demonstrating exceptional attention to detail and a thorough understanding of the task. Sarah is a valuable asset to her class and has the potential to achieve great things with continued hard work and dedication."}],
      },
    ],
  });



  let message = createMessage()
  
  const result = await chat.sendMessage(message);
  const response = result.response;

  const data = response.text();
  let newString = ""
  let canTakeLetters = true
  let astrixCount = 0
  for(let i = 0;i<data.length;i++){
    if(data[i]=="*"){
      astrixCount++
      canTakeLetters= false
      if(astrixCount==4){
        canTakeLetters=true
      }
    }
    if(canTakeLetters){
      if(data[i]=="*"){
        continue
      }
      newString+= data[i]
    }
  }
  setData(newString)
}

const addAssignment = ()=>{
  console.log("Assignment Data",assignmentData)
  setAssignmentData(assignmentData.length>0?assignmentData=>[...assignmentData,{'assignment':'','comment':''}]:[{'assignment':'','comment':''}])
}

const changeAssignmentName=(valueIndex,newValue)=>{
  assignmentData[valueIndex].assignment=newValue
}

const changeAssignmentComment=(valueIndex,newValue)=>{
  assignmentData[valueIndex].comment=newValue
}

const [open, setOpen] = useState(false);

const handleClick = () => {
  setOpen(true);
  navigator.clipboard.writeText(data);
};

const deleteAssignments = ()=>{

  setAssignmentData([])

}

const restart=()=>{
  window.location.reload()
}

const [proofreadToggled,setProofread] = useState(false)
const handleProofread=(elementProps)=>{

console.log("Props",elementProps)

if(proofreadToggled==true){
  setProofread(false)
}
else{
  setProofread(true)
}
}

const [speaking,setSpeaking] = useState(false)

const handleSpeech = ()=>{
  setSpeaking(true)
  let speech = new SpeechSynthesisUtterance(data);
  speech.lang = "en-GB";
 speechSynthesis.speak(speech);

  speech.addEventListener("end", (event) => {
  setSpeaking(false)
  });
}

useEffect(()=>{
return ()=> stopSpeech()
},[])

const stopSpeech = ()=>{
  setSpeaking(false)
  speechSynthesis.cancel()
}


  return (
<>



    <div className="App" >
      
      <Music speaking={speaking}/>
   
 
      <header className="App-header">
      <Typography sx={{fontSize:'50px',marginTop:'20px',fontFamily: "Bebas Neue",color:"#81D8D0"}} variant='h1'>Report Generator</Typography>
        <Card sx={{margin:'40px',width:'300px',borderRadius:'2%'}}>
          <Box>
          <TextField  
        onChange = {(e)=>{handleName(e.target.value)}}
        sx={{marginTop:'20px'}}
        variant='outlined'
        label="Person's name"></TextField>
          </Box>
     
<Box>
<TextField  
        sx={{margin:'10px'}}
        onChange = {(e)=>{handleGrade(e.target.value)}}
        variant='outlined'
        label="Overall Grade"></TextField>
</Box>



<Box sx={{marginTop:"10px"}}>
  <Typography>Add Assignment</Typography>
<Button  onClick={addAssignment}>
<AddCircleIcon sx={{margin:'15px'}}/>
</Button>
</Box>
      

<AssignmentData 
assignmentData={assignmentData}
changeAssignmentComment={changeAssignmentComment}
changeAssignmentName={changeAssignmentName}
deleteAssignments={deleteAssignments}
/>






        </Card>


{
  !generating?
  <>
 
  
  <Box sx={{width:'20%',height:'50%'}}>
    <Typography>Comment Length [Sentences]:</Typography>
  <Slider
  onChange = {(e)=> setCommentLength(e.target.value)}
  aria-label="Comment Length"
  valueLabelDisplay="auto"
  shiftStep={3}
  step={1}
  marks
  min={3}
  max={10}
/>
  </Box>
    {
    name?
    <Button 
    variant='contained' 
    color="success"
    onClick={runChat}
    sx={{marginTop:'10px'}}>Generate Comment</Button>:null
    }

      {
        data?
        <>
        <Tooltip title="proofread comment" placement="left">
        <Box sx={{marginTop:'20px'}}>
        
        <Box>
          {
          !speaking?
          <Button 
          onClick={handleSpeech}
          sx={{margin:'5px'}}
          variant="contained"
          color="primary"
          >
            <PlayCircleIcon/>
          </Button>:
          <Button
          onClick={stopSpeech}
          sx={{margin:'5px'}}
           color="error"
           variant="contained">
            <StopCircleIcon/>
           </Button>
          }
        </Box>
     
     
       
        
     
        
      </Box>
        </Tooltip>
      
        

    <Tooltip title="copy comment to clipboard" placement="right">
    
    <IconButton sx={{marginTop:'20px'}} id="shareButton" onClick={handleClick} color="primary">
        <ShareIcon />
      </IconButton>
   
    </Tooltip>
    </>:null
      }
  </>
    :<CircularProgress/>
}
    
      <Snackbar
        message="Comment Copied to clibboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
      <Typography sx={{fontSize:'20px',width:'70%',marginBottom:'50px'}}>
        {data}
      </Typography>
    
    {
      data?
      <Button 
      onClick={restart}
      sx={{marginBottom:'20px'}} 
      variant="contained" 
      color="error">RESTART COMMENT</Button>:null
      }
    
      </header>
    </div>
    </>
  );
 
}

export default App;

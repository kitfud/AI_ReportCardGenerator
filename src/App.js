
import './App.css';
import React,{useState,useEffect} from 'react'

import {  Box, 
  TextField, 
  Typography, 
  Card, 
  Button,
  Snackbar,
  IconButton,
  CircularProgress,
  Tooltip
} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from '@mui/icons-material/Delete';

function App() {

const [data,setData] = useState(null)

const [assignmentData, setAssignmentData] = useState([])
const [name,handleName] = useState("")
const [grade,handleGrade] = useState("")

const [generating, setGenerating] = useState(false)

useEffect(()=>{
setGenerating(false)
},[data])


// node --version # Should be >= 18
// npm install @google/generative-ai
const createMessage = ()=>{
  let input = `Student's Name:${name}, Overall Grade:${grade},`

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
  setGenerating(true)
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
  console.log(assignmentData)
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

const deleteAssignment = (index)=>{
console.log(index)

  console.log("AssignmentData",assignmentData)
  let newData = assignmentData.splice(index,1)
  console.log("newData",newData)
  setAssignmentData(newData)

}



  return (
    <div className="App">
      <header className="App-header">
      <Typography sx={{fontSize:'30px'}} variant='h1'>Report Generator</Typography>
        <Card sx={{margin:'20px',width:'80%'}}>
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



<Box>
  <Typography>Add Assignment</Typography>
<Button onClick={addAssignment}>
<AddCircleIcon />
</Button>
</Box>
      
{
  assignmentData.length?
  assignmentData.map(item=>{
    return (
     
      <Box sx={{margin:'20px'}} key={assignmentData.indexOf(item)}>
        <TextField multiline fullWidth variant='outlined' 
        sx={{margin:'10px'}}
        defaultValue={item.assignment} 
        onChange={e=>{changeAssignmentName(assignmentData.indexOf(item),e.target.value)}} 
        label="Assignment Name" >
        </TextField>
        <TextField 
        sx={{margin:'10px'}}
        multiline fullWidth defaultValue={item.comment}
        onChange={e=>{changeAssignmentComment(assignmentData.indexOf(item),e.target.value)}}
        label="Comment"></TextField>

      </Box>
     
    )
  }):null
}


        </Card>
{/* 
        <Button onClick={createMessage} variant='contained'>Preview Data</Button> */}

{
  !generating?
  <>
<Button 
    variant='contained' 
    color="success"
    onClick={runChat}
    sx={{marginTop:'10px'}}>Generate Comment</Button>
    <Tooltip title="copy comment" placement="right">
    <IconButton sx={{marginTop:'20px'}} id="shareButton" onClick={handleClick} color="primary">
        <ShareIcon />
      </IconButton>
    </Tooltip>
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
      <Typography sx={{fontSize:'20px',width:'70%',marginBottom:'80px'}}>{data}</Typography>
    
    
      </header>
    </div>
  );
}

export default App;

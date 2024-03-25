
import './App.css';
import React,{useState} from 'react'

import {  Box, TextField, Typography, Card, Button} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';

function App() {

const [data,setData] = useState(null)

const [assignmentData, setAssignmentData] = useState([])

// node --version # Should be >= 18
// npm install @google/generative-ai

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
        parts: [{ text: "Name: SarahOverall Grade: 78%Assignment: Rock ThrowingComment: Did a nice job but didn’t quite get the stones in the target area. Grade: 50%Assignment: Flower PickingComment: What an amazing job getting those flowers collected. So complete. Grade: 80%"}],
      },
      {
        role: "model",
        parts: [{ text: "Sarah is a diligent student who consistently strives to do her best. While she achieved an overall grade of 78%, there are areas where she can continue to improve. In the rock throwing assignment, Sarah demonstrated effort but struggled with accuracy, resulting in a score of 50%. However, she excelled in the flower picking task, showcasing her thoroughness and attention to detail, earning an impressive 80%. With focused practice on her throwing skills and continued dedication, Sarah has the potential to reach even greater heights in her academic pursuits."}],
      },
    ],
  });

  const result = await chat.sendMessage(`
  Name: LEO
  Overall Grade: 8%
  
  Assignment: Rock Throwing
  Comment: Did a nice job but didn’t quite get the stones in the target area. 
  Grade: 90%
  
  Assignment: Flower Picking
  Comment: What an amazing job getting those flowers collected. So complete. 
  Grade: 80%
  `);
  const response = result.response;
  const data = response.text();
  setData(data)
}

const addAssignment = ()=>{
  console.log(assignmentData)
  setAssignmentData(assignmentData.length>0?assignmentData=>[...assignmentData,{'assignment':'','comment':''}]:[{'assignment':'','comment':''}])
  console.log(assignmentData.length)
}

  return (
    <div className="App">
      <header className="App-header">
        <Card sx={{marginTop:'20px'}}>
        <TextField  
        sx={{marginTop:'20px'}}
        variant='outlined'
        label="person's name"></TextField>

        <TextField  
        variant='outlined'
        label="Overall Grade"></TextField>


<Box>
  <Typography>Add Assignment</Typography>
<Button onClick={addAssignment}>
<AddCircleIcon />
</Button>
</Box>
      
{
  
  assignmentData.map(assignment=>{
    return (
     
      <Box sx={{margin:'20px'}} key={assignmentData.indexOf(assignment)}>
        <TextField label="Assignment Name"></TextField>
        <TextField label="Comment"></TextField>
        <TextField label="Grade"></TextField>
      </Box>
     
    )
  })
}


        </Card>

    <Button variant='contained' onClick={runChat}>CLICK</Button>
    {data}
      </header>
    </div>
  );
}

export default App;

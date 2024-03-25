
import './App.css';
import React,{useState} from 'react'
import { Button } from '@mui/material';


function App() {

  // node --version # Should be >= 18
// npm install @google/generative-ai

const [data,setData] = useState(null)

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


  return (
    <div className="App">
      <header className="App-header">
    <Button variant='contained' onClick={runChat}>CLICK</Button>
    {data}
      </header>
    </div>
  );
}

export default App;

import React from 'react'
import { Box,Typography } from '@mui/material'
import { useState,useEffect } from 'react';

const Demo = () => {
  // node --version # Should be >= 18
// npm install @google/generative-ai

const [data,setData] = useState(null)

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";

const API_KEY = process.env.REACT_APP_GOOGLE_API;

useEffect(()=>{
run()
},[])

async function run() {
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

  const parts = [
    {text: "grade this math worksheet for me: \n\n1. 1+1 = 2 \n2. 2+1 = 4\n\n"},
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log(response.text());
  setData(response.text())
}

//run();
  return (
    <>
     <Box sx={{width:'50%',
     backgroundColor:'white',
     top:'20%',
     right:'30%',
     position:'absolute'}}>
        <Typography sx={{textAlign:'center'}}>
       {data}
        </Typography>     
    </Box>
    </>
   
  )
}

export default Demo
import React from 'react'
import { useState,useEffect,useMemo } from 'react';
import { Button,
    TextField,
    Typography,
    Box,
    Card,
    CircularProgress
     } from '@mui/material';

import Speech from './Speech.js'

import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const Companion = () => {
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
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "I want you to engage with me in conversation as a supportive colleague at a school. Kick off our conversation with an initial question; like how my day is going?"}],
        },
        {
            role: "model",
            parts: [{ text: "Hey, how's your day shaping up so far? Has anything exciting happened yet?"}],
          },
      ],
    });
  
    let IncomingMessage = message
    try{
    const result = await chat.sendMessage(IncomingMessage);
    const response = result.response;
  
    setAIResponse(response.text())
    setProcessing(false)
    }
    catch(error){
      setProcessing(false)
      alert("a processing error has occured: " + error)
    }
  }
  
  

    let currentIndex = 0
    let speak = false
    const emojiMap = {
        "😮": ["o", "e"],
        "😐": ["b", "p", "m"],
        "🙂": ["c", "g", "j", "k", "n", "r", "s", "t", "v", "x", "z"],
        "😲": ["d", "l"],
        "😯": ["q", "u", "w", "y"],
        "😀": ["a", "i"]
      };
      
      const defaultEmoji =  "🙂";

      const toEmoji = char => {
 
        if(char !==null  ){
        return (
          Object.keys(emojiMap).find(emoji =>
            emojiMap[emoji].includes(char.toLowerCase())
          ) || defaultEmoji
        );
          }
          else{
            return defaultEmoji
          }
        
      
      };

    let intervalSet
    const [speaking,setSpeaking] = useState(false)
    const [firstquestion,setFirstQuestion] = useState(true)
    
    const [message, setMessage] = useState("")
    const [emoji,setEmoji] =useState(defaultEmoji)
    const [airesponse,setAIResponse] = useState("")
    
    const [processing,setProcessing] = useState(false)

    const [dictation,setDictation] = useState("")
   
    

   useEffect(()=>{
    setStopAudio(false)
    if(airesponse){
    speak = true
    handleSpeech(airesponse)
    }
    
    intervalSet = setInterval(handleAnimation, 55);    
   },[airesponse])

 
  
    const handleAnimation = () => {
      
        if (currentIndex< airesponse.length - 1 ) {
      
        currentIndex = currentIndex + 1
        setEmoji(toEmoji(airesponse[currentIndex]))
        
        }
        else{
        clearInterval(intervalSet);
        setStopAudio(true)
        setSpeaking(false)
        setEmoji(defaultEmoji)
        currentIndex=0
        }
      
      
      };

    const handleSubmit = (e) => {
        setProcessing(true)
        setFirstQuestion(false)
        runChat();
      };

   const handleSpeech = (phrase) => {
        const speech = new SpeechSynthesisUtterance(phrase);
        speech.lang = "en-GB";
        speechSynthesis.speak(speech);
      }

    const restartConvo = () =>{
        setAIResponse("")
        setMessage("")
        setFirstQuestion(true)
    }

    useEffect(()=>{
      
setMessage("")
setMessage(dictation)
      
    },[dictation])

const produceMessage=(event)=>{
  event.preventDefault()
  setMessage(event.target.value)
}


useEffect(()=>{
return ()=>stopReading()
},[])


const [audioStop,setStopAudio] = useState(false)

const stopReading =()=>{
  setStopAudio(true)
  setSpeaking(false)
  setEmoji(defaultEmoji)
  clearInterval(intervalSet);
  speechSynthesis.cancel()
  }

  return (
    <>

       <Box sx={{textAlign:'center'}}>
       <Typography sx={{fontSize:'50px',
       fontFamily: "Bebas Neue",
       margin:'20px',
      color:"#81D8D0"}} variant='h1'>Constant Companion</Typography>
       </Box>
        
    <Box sx={{display:'flex',justifyContent:'center'}}>
    
        <Card sx={{width:'30%',
        textAlign:'center',
        alignItems:'center',
        padding:'20px',
        margin:'10px'}}>
        <Typography sx={{fontSize:'140px'}}>{!audioStop?emoji:defaultEmoji}</Typography>
        {
          airesponse !=""?
          <>
        <Typography>{airesponse}
          </Typography>
          {audioStop==false?
          <Button 
          sx={{marginTop:'20px'}}
          onClick={stopReading} variant="contained" color="warning"><VolumeOffIcon/></Button>:
          null
}
          </>:null
        }
        </Card>

        <Card sx={{width:'30%',textAlign:'center',padding:'20px',margin:'10px'}}>
            {firstquestion?
            <Typography sx={{fontFamily: "Bebas Neue",fontSize:'20px'}}>"Hey, how's your day shaping up so far? Has anything exciting happened yet?</Typography>:null
            }
        <Box>
        <TextField 
        minRows={4}
      
        label="Type in or record a response with the microphone"
        multiline
        sx={{width:'100%',marginTop:'20px'}}
        value = {message}
        onChange={(e)=>produceMessage(e)}></TextField>
        </Box>
        {!processing?
        message?
        <Button 
        color="success"
        sx={{marginTop:'20px'}}
        variant='contained'
        onClick={handleSubmit}>SEND TO COMPANION</Button>:null:<CircularProgress sx={{marginTop:'20px'}}/>
        } 
        <Box sx={{marginTop:'80px'}}>
        {
            firstquestion?null:<Button onClick={restartConvo} color="error" variant='contained'>RESTART CONVERSATION</Button>
        }
        </Box>
        <Speech setDictation ={setDictation}/>
        </Card>
       
    </Box>

   
    </>
  )
}

export default Companion
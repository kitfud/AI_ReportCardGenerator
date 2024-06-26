import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Box, Typography,Button } from '@mui/material';
import { useEffect } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const Speech = ({setDictation}) => {

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

      useEffect(()=>{
        setDictation(transcript)
          },[transcript])
    
      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }

      const listen = ()=>{
        SpeechRecognition.startListening({
          continuous: false,
        })
      }

      const reset = ()=>{
        resetTranscript()
        setDictation("")
      }

  return (
    <>
     <Box>
      <Typography sx={{marginTop:'10px'}} fontFamily={"Bebas Neue"}>Microphone: </Typography>{listening ? <Box><MicIcon sx={{color:'green'}}/></Box> :<Box> <MicOffIcon sx={{color:'red'}}/></Box>}
      {!listening?
      <Button variant='contained' 
      color="primary"
      sx={{margin:'2px'}}
      onClick={listen}><Typography>Start</Typography></Button>:null
      }
      <Button variant='contained' 
      color="error"
      sx={{margin:'2px'}}
      onClick={reset}><Typography>Reset</Typography></Button>
    </Box>
    </>
  )
}

export default Speech
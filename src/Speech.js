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
      <p><Typography>Microphone: </Typography>{listening ? <MicIcon sx={{color:'green'}}/> : <MicOffIcon sx={{color:'red'}}/>}</p>
      {!listening?
      <Button
      variant="contained" 
      color="success"
      onClick={listen}><Typography>Start</Typography></Button>:null
      }
      <Button
      variant="contained"
      color="error" 
      onClick={reset}><Typography>Reset</Typography></Button>
    </Box>
    </>
  )
}

export default Speech
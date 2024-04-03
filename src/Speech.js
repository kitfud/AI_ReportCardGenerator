import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Box, Typography } from '@mui/material';
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
      <button onClick={listen}><Typography>Start</Typography></button>:null
      }
      <button onClick={reset}><Typography>Reset</Typography></button>
    </Box>
    </>
  )
}

export default Speech
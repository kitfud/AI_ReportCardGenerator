import React, { useEffect } from 'react'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import { Fab } from '@mui/material';
import { useState } from 'react';

import audio1 from './music/sunsetreverie.mp3'

const Sample1 = new Audio(audio1)
Sample1.load()

const Music = ({speaking}) => {

const [music, setMusic] = useState(false)

useEffect(()=>{
if(speaking){
Sample1.volume=0.1
}
else{
Sample1.volume=1
}
},[speaking])
      

const toggleMusic = (event)=>{
    if(!music){
        setMusic(true)
        Sample1.loop = true
        Sample1.play()
        
    }
    else{
        setMusic(false)
        Sample1.pause()
    }
}
      
  return (
    <>
    {
    music?
    <Fab onClick={toggleMusic} sx={{position:'absolute',top:'15%',right:'5%'}}>
    <MusicNoteIcon onClick={toggleMusic}/>  
    </Fab>:
    <Fab onClick={toggleMusic} sx={{position:'absolute',top:'15%',right:'5%'}}>
    <MusicOffIcon onClick={toggleMusic}/>
    </Fab>
}
    </>
  )
 
}

export default Music
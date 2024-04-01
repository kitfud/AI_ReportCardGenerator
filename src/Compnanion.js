import React from 'react'
import { useState,useEffect } from 'react';
import { Button,TextField,Typography } from '@mui/material';


const Compnanion = () => {
    let currentIndex = 0
    const emojiMap = {
        "😮": ["o", "e"],
        "😐": ["b", "p", "m"],
        "🙂": ["c", "g", "j", "k", "n", "r", "s", "t", "v", "x", "z"],
        "😲": ["d", "l"],
        "😯": ["q", "u", "w", "y"],
        "😀": ["a", "i"]
      };
      
      const defaultEmoji = "😐";

      const toEmoji = char => {
        if(char !==null){
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
    
    const [phrase, setPhrase] = useState("")
    const [emoji,setEmoji] =useState(defaultEmoji)

    useEffect(()=>{
console.log("change")
    },[currentIndex])
   
  
    const handleAnimation = () => {
        if (currentIndex< phrase.length - 1) {
        currentIndex = currentIndex + 1
        console.log("index",currentIndex)
        setEmoji(toEmoji(phrase[currentIndex]))
        }
        else{
        clearInterval(intervalSet);
        setPhrase(phrase)
        setSpeaking(false)
        setEmoji(defaultEmoji)
        currentIndex=0
        }
      
      };

    const handleSubmit = (e) => {
        setSpeaking(true);
        handleSpeech(phrase)

        intervalSet = setInterval(() => {
          handleAnimation();
        }, 55);
      };

   const handleSpeech = (phrase) => {
        const speech = new SpeechSynthesisUtterance(phrase);
        speech.lang = "en-GB";
        speechSynthesis.speak(speech);
      }

  return (
    <>
    <Typography sx={{fontSize:'140px'}}>{emoji}</Typography>
    <TextField onChange={(e)=>setPhrase(e.target.value)}></TextField>
    <Button onClick={handleSubmit}>CLICK</Button>
    </>
  )
}

export default Compnanion
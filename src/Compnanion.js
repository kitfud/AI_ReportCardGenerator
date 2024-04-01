import React from 'react'
import { useState,useEffect } from 'react';
import { Button,
    TextField,
    Typography,
    Box,
    Card
     } from '@mui/material';


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
    <Box sx={{display:'flex',justifyContent:'center'}}>
        <Card sx={{width:'50%',textAlign:'center'}}>
        <Typography sx={{fontSize:'140px'}}>{emoji}</Typography>
        </Card>

        <Card sx={{width:'50%',textAlign:'center',padding:'20px'}}>
        <Box>
        <TextField 
        minRows={4}
        multiline
        sx={{width:'100%'}}
        onChange={(e)=>setPhrase(e.target.value)}></TextField>
        </Box>
        <Button 
        variant='contained'
        onClick={handleSubmit}>SEND TO AI</Button>
        </Card>
    </Box>
   
   
    </>
  )
}

export default Compnanion
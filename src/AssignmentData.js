import React from 'react'
import { Box,
    TextField,
    Tooltip
 } from '@mui/material'
 import { useEffect } from 'react';
 import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
const AssignmentData = ({
    assignmentData,
    changeAssignmentName,
    changeAssignmentComment,
    deleteAssignments
}) => {

    useEffect(()=>{
        console.log("update detected on component",assignmentData)
    },[assignmentData])
  return (
  <>
    {
        assignmentData.map(item=>{
          return (
           
            <Box sx={{marginRight:'20px'}} key={uuidv4()}>

              <TextField 
              multiline fullWidth variant='outlined' 
              sx={{margin:'10px'}}
              defaultValue = {assignmentData[assignmentData.indexOf(item)].assignment}
              onChange={e=>{changeAssignmentName(assignmentData.indexOf(item),e.target.value)}} 
              label="Assignment Name" >
              </TextField>
      
              <TextField  
              sx={{margin:'10px'}}
              defaultValue = {assignmentData[assignmentData.indexOf(item)].comment}
              multiline fullWidth 
              onChange={e=>{changeAssignmentComment(assignmentData.indexOf(item),e.target.value)}}
              label="Comment"></TextField>

              
      
            </Box>
          
          )
        })
    }
    {
    assignmentData.length>0?
    <Tooltip title="delete all assignments" placement="right">
<DeleteIcon sx={{marginBottom:'10px'}} id="deleteAssignment" onClick={deleteAssignments}/>
    </Tooltip>
     :null
    }
       </>
       
  )
 
}

export default AssignmentData
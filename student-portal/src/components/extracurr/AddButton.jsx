import React from 'react';
import Button from '@mui/material/Button';  

const AddButton = () => {
  return (
    <Button variant="outlined" style={{border: "1px solid black", padding: "0.1rem"}}>
        <i class="fa-solid fa-plus"></i>
        <span>ADD</span>
    </Button>  
  )
}

export default AddButton;

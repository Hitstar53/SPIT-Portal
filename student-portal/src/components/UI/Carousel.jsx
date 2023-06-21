import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import EduCard from '../profile/EduCard';
import { useState,useEffect } from 'react';
import './Carousel.css';

const Currinfo = {
    edulevel: "Current Degree",
    inst: "Sardar Patel Institute of Technology",
    degree: "Bachelors in Technology",
    branch: "Computer Science",
    div: "B",
    sem: "Three",
    admyear: 2021,
    passyear: 2025,
    cgpa: 9.1,
}

const junclginfo = {
    edulevel: "Junior College",
    inst: "Nirmala Memorial Foundation and Junior College",
    qualification: "Higher Secondary Certificate",
    admyear: 2019,
    passyear: 2021,
    score: "467/500",
    percentage: 94.8,
}

const Schlinfo = {
    edulevel: "School",
    inst: "Swami Vivekanand International School",
    qualification: "Secondary School Certificate",
    passyear: 2019,
    score: "285/300",
    percentage: 95.6,
}

  function Carousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [currInfo,setCurrInfo] = React.useState();
  const [junClgInfo,setJunClgInfo] = React.useState();
  const [schlInfo,setSchlInfo] = React.useState();
  const [eduInfo,seteduInfo] = React.useState([]);
  const  setEverything = async ()=>{
    
    setCurrInfo(Currinfo);
    setJunClgInfo(junclginfo);
    setSchlInfo(Schlinfo);
    seteduInfo([Currinfo,junclginfo,Schlinfo]);
  }
  useEffect(() => {
    setEverything()
  }, [])
  
  const maxSteps = eduInfo.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  }; 

  const handleChange = (e) => {
    setCurrInfo({...currInfo,[e.target.name]:e.target.value})
    setJunClgInfo({...junClgInfo,[e.target.name]:e.target.value})
    setSchlInfo({...schlInfo,[e.target.name]:e.target.value})
    seteduInfo([currInfo,junClgInfo,schlInfo])
    console.log(currInfo)
  }
  return (
    <Box className="carousel" sx={{
      "& .MuiTextField-root": { m: 1, width: "100%" },
        "& .MuiOutlinedInput-input": { color: "var(--text-color) !important" },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--dark-override-color) !important",
        },
        "& .MuiInputLabel-root": { color: "var(--text-color) !important" },
        "& .Mui-focused": { color: "var(--dark-override-color) !important" },
    }}>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {eduInfo.map((info, index) => (
          <EduCard key={index} index={index} info={info} handleChange={handleChange}/>
        ))}
      </SwipeableViews>
      <MobileStepper
        sx={{ backgroundColor: "var(--bg-color)" }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            sx={{ color: "var(--text-color)" }}
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            sx={{ color: "var(--text-color)" }}
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default Carousel;
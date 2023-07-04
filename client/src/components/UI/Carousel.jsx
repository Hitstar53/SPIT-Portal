import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix'
import EduCard from '../profile/EduCard';
import './Carousel.css';  


const Carousel = (props) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [currInfo,setCurrInfo] = React.useState(props.info[0]);
  const [junClgInfo,setJunClgInfo] = React.useState(props.info[1]);
  const [schlInfo,setSchlInfo] = React.useState(props.info[2]);
  
  
  const maxSteps = 3;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  }; 

  const handleChangeCurr = (e) => {
    setCurrInfo({...currInfo,[e.target.name]:e.target.value})
  }
  const handleChangeJuncol = (e) => {
    setJunClgInfo({...junClgInfo,[e.target.name]:e.target.value})
  }
  const handleChangeSchl = (e) => {
    setSchlInfo({...schlInfo,[e.target.name]:e.target.value})
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
          <EduCard index={0} info={currInfo} handleChange={handleChangeCurr}/>
          <EduCard index={1} info={junClgInfo} handleChange={handleChangeJuncol}/>
          <EduCard index={2} info={schlInfo} handleChange={handleChangeSchl}/>
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
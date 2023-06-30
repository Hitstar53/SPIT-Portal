import React, { useState } from 'react';
import Box from '@mui/material/Box';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepHead from './StepHead';
import StepFoot from './StepFoot';
// import Header from './Header';

const steps = [`Dimension 1: Academics`, `Dimension 2: Research and Development`, `Dimension 3: Administration and Outreach `, `Dimension 4: Perception/ 360 degree feedback`];

export default function FacultyStepper() {
    const [Dimension1, setDimension1] = useState({})
    const [Dimension2, setDimension2] = useState({})
    const [Dimension3, setDimension3] = useState({})
    const [Dimension4, setDimension4] = useState({})

    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    React.useEffect(() => {
        console.log(activeStep);
    }, [activeStep])

    React.useEffect(()=>{
        console.log("Dimension1=",Dimension1)
    },[Dimension1])
    React.useEffect(()=>{
        console.log("Dimension2=",Dimension2)
    },[Dimension2])
    React.useEffect(()=>{
        console.log("Dimension3=",Dimension3)
    },[Dimension3])
    React.useEffect(()=>{
        console.log("Dimension4=",Dimension4)
    },[Dimension4])


    return (
        <React.Fragment>
            {/* header with Test_Study as heading and profile button */}
            {/* <Header /> */}

            {/* shows steps for stepper */}
            <Box sx={{ width: '95%', margin: 'auto' }}>
                <StepHead activeStep={activeStep} steps={steps} />

                {/* render different pages depending upon activeStep */}
                {activeStep === 0 && <StepOne setDimension1={setDimension1}/>}
                {activeStep === 1 && <StepTwo setDimension2={setDimension2}/>}
                {activeStep === 2 && <StepThree setDimension3={setDimension3}/>}
                {activeStep === 3 && <StepFour setDimension4={setDimension4}/>}
                {/* {activeStep === 4 && <StepFour handleBack={handleBack} submitted={true} />} */}

                {/* show footer only if all steps are not completed */}
                {activeStep !== 4 && <StepFoot activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} steps={steps} />}
            </Box>
        </React.Fragment>
    );
}
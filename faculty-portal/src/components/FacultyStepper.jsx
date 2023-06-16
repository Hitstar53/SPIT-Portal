import * as React from 'react';
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

    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <React.Fragment>
            {/* header with Test_Study as heading and profile button */}
            {/* <Header /> */}

            {/* shows steps for stepper */}
            <Box sx={{ width: '95%', margin: 'auto' }}>
                <StepHead activeStep={activeStep} steps={steps} />

                {/* render different pages depending upon activeStep */}
                {activeStep === 0 && <StepOne />}
                {activeStep === 1 && <StepTwo />}
                {activeStep === 2 && <StepThree handleBack={handleBack} />}
                {activeStep === 3 && <StepThree handleBack={handleBack} />}
                {activeStep === 4 && <StepFour handleBack={handleBack} submitted={true} />}

                {/* show footer only if all steps are not completed */}
                {activeStep !== 4 && <StepFoot activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} steps={steps} />}
            </Box>
        </React.Fragment>
    );
}
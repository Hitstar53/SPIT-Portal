import * as React from 'react';
import Box from '@mui/material/Box';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepHead from './StepHead';
import StepFoot from './StepFoot';
// import Header from './Header';

const steps = [`Upload EDF's`, `Map Channels`, `Save & Preview`];

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
                {activeStep === 3 && <StepThree handleBack={handleBack} submitted={true} />}

                {/* show footer only if all steps are not completed */}
                {activeStep !== 3 && <StepFoot activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} steps={steps} />}
            </Box>
        </React.Fragment>
    );
}
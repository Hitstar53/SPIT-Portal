import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepHead from "./StepHead";
import StepFoot from "./StepFoot";
import { UserContext } from "../context/UserContext";
import { set } from "react-hook-form";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
// import Header from './Header';

const steps = [
  `Dimension 1: Academics`,
  `Dimension 2: Research and Development`,
  `Dimension 3: Administration and Outreach `,
  // `Dimension 4: Perception/ 360 degree feedback`,
];

export default function FacultyStepper() {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [Dimension1, setDimension1] = useState({});
  const [Dimension2, setDimension2] = useState({});
  const [Dimension3, setDimension3] = useState({});
  const [Dimension4, setDimension4] = useState({});

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  React.useEffect(() => {
    console.log("Dimension1=", Dimension1);
  }, [Dimension1]);
  React.useEffect(() => {
    console.log("Dimension2=", Dimension2);
  }, [Dimension2]);
  React.useEffect(() => {
    console.log("Dimension3=", Dimension3);
  }, [Dimension3]);
  React.useEffect(() => {
    console.log("Dimension4=", Dimension4);
  }, [Dimension4]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

    useEffect(() => {
      scrollToTop();
    }, [activeStep]);

  var yr = getDate();
  function getDate() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    console.log(month);
    console.log(year);
    console.log(day);
    // if(month<6)
    return `${year}-${year + 1}`;
    // else
    // return `${year+1}-${year+2}`
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

  function sendToServer() {
    console.log("Sending to server");
    fetch("http://localhost:5000/api/faculty/appraisal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        yearofAssesment: yr,
        facultyName: user.fullName,
        department: user.department,
        designation: user.designation,
        isSubmitted: true,
      }),
    }).then(
       timeout(1500).then(window.location.reload())
    )
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/faculty/appraisal/get/hod-comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        yearofAssesment: yr,
        fullName: user.fullName,
      }),
    })
      .then((res) => res.json())
      .then((data) => setComments(data))
      .then((data) => console.log(data));
  }, []);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  // React.useEffect(()=>{
  //   if(activeStep === 4){
  //     sendToServer()
  //   }
  // },[activeStep])

  return (
    <React.Fragment>
      {/* header with Test_Study as heading and profile button */}
      {/* <Header /> */}

      {/* shows steps for stepper */}
      <Box sx={{ width: "95%", margin: "auto" }}>
        <StepHead activeStep={activeStep} steps={steps} />
        {comments.length > 0 && (
          <>
            <Stack sx={{ width: "100%", margin:"1rem 0", textAlign:'left' }} spacing={2}>
              <Alert severity="error">
                <AlertTitle><h4 style={{fontWeight:'bolder',fontSize:'23px'}}>Appraisal resended By HOD</h4></AlertTitle>
                <h4 style={{fontWeight:'bolder',fontSize:'20px'}}>Message : {comments[comments.length - 1]}</h4>
              </Alert>
            </Stack>
          </>
        )}

        {/* render different pages depending upon activeStep */}
        {activeStep === 0 && <StepOne yr={yr} setDimension1={setDimension1} />}
        {activeStep === 1 && (
          <StepTwo
            setDimension2={setDimension2}
            yr={yr}
            sendToServer={sendToServer}
          />
        )}
        {activeStep === 2 && (
          <StepThree yr={yr} setDimension3={setDimension3} />
        )}
        {activeStep === 3 && (
          <StepFour
            yr={yr}
            setDimension4={setDimension4}
            handleNext={handleNext}
          />
        )}
        {/* {activeStep === 4 && <StepFour handleBack={handleBack} submitted={true} />} */}
        {activeStep === 4 && <h1>Submitted the form</h1>}
        {/* show footer only if all steps are not completed */}
        {
          <StepFoot
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            steps={steps}
            sendToServer={sendToServer}
          />
        }
      </Box>
    </React.Fragment>
  );
}

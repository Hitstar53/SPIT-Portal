import * as React from "react";
import FacultyStepper from "../components/FacultyStepper";
import "../styles/Appraisal.css";
import { useState,useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Appraisal = () => {
  const { user,yr } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    fetch(
      "http://localhost:5000/api/faculty/appraisal/isSubmitted-teacher",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.fullName,
          yearofAssesment: yr,
        }),
      }
    ).then((res) => {
      if (res.status === 200) {
        setSubmitted(true);
      } else if (res.status === 204) {
        setSubmitted(false);
      }
    });
  }, []);

  return (
    <div className="appraisal-page">
      <>
        {!submitted?<div className="app-title">
          <h1 className="ap-title">Self-Appraisal Form for Faculty</h1>
          <FacultyStepper />
        </div>:<h1>Already Submitted</h1>}
      </>
    </div>
  );
};

export default Appraisal;

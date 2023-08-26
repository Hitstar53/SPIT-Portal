import * as React from "react";
import FacultyStepper from "../components/FacultyStepper";
import "../styles/Appraisal.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import ProjectDone from "../assets/project-is-done.png";
import { set } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";
import { API_URL } from '../config';

const Appraisal = () => {
  const { user, yr } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(API_URL + "/api/faculty/appraisal/isSubmitted-teacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.fullName,
        yearofAssesment: yr,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setSubmitted(true);
      } else if (res.status === 204) {
        setSubmitted(false);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          {!submitted ? (
            <div className="appraisal-page">
              <div className="app-title">
                <h1 className="ap-title">Self-Appraisal Form for Faculty</h1>
                <FacultyStepper />
              </div>
            </div>
          ) : (
            <div className="appraisal-center">
              <h1>You Have Already Submitted Appraisal</h1>
              <img src={ProjectDone} alt="submission-done" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Appraisal;

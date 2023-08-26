import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import axios from "axios";
import { TextareaAutosize } from "@mui/base";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import AllSteps from "./AllSteps";
import { API_URL } from '../config';

function StepFour({ yr, fullName, setStatus }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {},
  });

  const resendAppraisal = (e) => {
    e.preventDefault();
    let data = e.target[0].value;
    if (data === "") {
      toast.error("Please enter the comment before resending the appraisal");
      return;
    }
    fetch(API_URL + "/api/faculty/appraisal/hod-comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        yearofAssesment: yr,
        comment: data,
      }),
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Appraisal resended Successfully");
        setStatus("Appraisal Rejected");
        // window.location.href="/home"
      } else {
        toast.error("Appraisal Rejection Failed");
      }
    });
  };

  const onSubmit = (data) => {
    axios
      .post(API_URL + "/api/faculty/appraisal/hodreview", {
        yearofAssesment: yr,
        fullName: fullName,
        Dimension4: data,
      })
      .then((res) => {

        setStatus("Step Four Saved");
        toast.success("Step Four Saved!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div className="container">
      <AllSteps fullName={fullName} year={yr} showComments={true} />
      <div>
        <form className="container" onSubmit={handleSubmit(onSubmit)}>
          <h1>Dimension 4: Perception/ 360 degree feedback</h1>
          <Table striped bordered style={{ marginTop: "2rem" }}>
            <thead>
              <tr>
                <th className="table-header text-center align-middle">
                  Perception 360 degree feedbacks
                </th>
                <th className="table-header text-center align-middle">
                  Bright students’ feedback (A)
                </th>
                <th className="table-header text-center align-middle">
                  Peer Feedback (B)
                </th>
                <th className="table-header text-center align-middle">
                  HOD feedback (C)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-header text-center align-middle">
                  Max Marks
                </td>
                <td className="table-header text-center align-middle">25</td>
                <td className="table-header text-center align-middle">25</td>
                <td className="table-header text-center align-middle">50</td>
              </tr>
              <tr>
                <td className="table-header text-center align-middle">Marks</td>
                <td className="table-header text-center align-middle">
                  <input
                    className="form-input"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    {...register("feedbackMarks.A", {
                      required: true,
                      max: 25,
                    })}
                  />
                  {errors.feedbackMarks?.A?.type === "required" &&
                    "Marks is required"}
                  {errors.feedbackMarks?.A?.type === "max" &&
                    "Marks should be less than or equal to 25"}
                </td>
                <td className="table-header text-center align-middle">
                  <input
                    className="form-input"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    {...register("feedbackMarks.B", {
                      required: true,
                      max: 25,
                    })}
                  />
                  {errors.feedbackMarks?.B?.type === "required" &&
                    "Marks is required"}
                  {errors.feedbackMarks?.B?.type === "max" &&
                    "Marks should be less than or equal to 25"}
                </td>
                <td className="table-header text-center align-middle">
                  <input
                    className="form-input"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    {...register("feedbackMarks.C", {
                      required: true,
                      max: 50,
                    })}
                  />
                  {errors.feedbackMarks?.C?.type === "required" &&
                    "Marks is required"}
                  {errors.feedbackMarks?.C?.type === "max" &&
                    "Marks should be less than or equal to 50"}
                </td>
              </tr>
            </tbody>
          </Table>
          <div style={{ margin: "2rem 0" }}>
            <label className="form-label">
              HOD Remarks:
              {/* <TextareaAutosize/> */}
              <textarea
                rows={4}
                {...register("confidentialReport.HODRemarks")}
                placeholder="Remarks..."
                className="form-textarea"
                style={{ width: "100%" }}
              />
            </label>
          </div>
          <div style={{ textAlign: "center" }}>
            {/* <input type="submit" className="save-btn" /> */}
            <button className="save-btn">Submit Appraisal</button>
          </div>
        </form>
        {/* <h1>OR</h1> */}
        <div style={{ width: "100%", height: "20px", borderBottom: "1px solid black", textAlign: "center", margin: "3.5rem 0" }}>
          <span style={{ fontSize: '2rem', 'backgroundColor': "#F3F5F6", padding: "0 10px" }}>
            OR{" "}
          </span>
        </div>
        <form onSubmit={resendAppraisal}>
          <div style={{ margin: "2rem 0" }}>
            <label className="form-label">
              Comment:
              <textarea
                rows={4}

                placeholder="comment..."
                className="form-textarea"
                style={{ width: "100%" }}
              />
            </label>
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="save-btn" style={{ backgroundColor: "#d83c3c" }}>
              resend Appraisal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StepFour;

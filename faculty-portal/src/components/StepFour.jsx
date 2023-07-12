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

function StepFour({ setDimension4, yr, fullName }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const getData = async () => {
  //     await axios.post('http://localhost:5000/api/faculty/appraisal/get/dim4',
  //       { name: user.fullName, yearofAssesment: yr }
  //     ).then((res) => {
  //       console.log(res.data)
  //       localStorage.setItem("dim4Data", JSON.stringify(res.data))
  //       reset(JSON.parse(localStorage.getItem('dim4Data')))
  //       const storedData = localStorage.getItem("dim4Data")
  //       console.log(storedData)
  //       if(storedData) {
  //         Object.keys(JSON.parse(storedData)).map((key) => {
  //           setValue(key, JSON.parse(storedData)[key])
  //         })
  //       }
  //       setLoading(false)
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   }
  //   getData()
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("dim4Data")) || {},
  });

  const onSubmit = (data) => {
    console.log("line 51")
    console.log(data);
    // setDimension4(data);
    // localStorage.setItem("dim4Data", JSON.stringify(data));
    // axios
    //   .post("http://localhost:5000/api/faculty/appraisal/hodreview", {
    //     yearofAssesment: yr,
    //     fullName: fullName,
    //     Dimension4: data,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     toast.success("Step Four Saved!", {
    //       position: "top-center",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // handleNext()
  };

  return (
    <div>
      <h1>Dimension 4: Perception/ 360 degree feedback</h1>
      <div>
        <form className="container" onSubmit={handleSubmit(onSubmit)}>
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
                  Dean feedback (C)
                </th>
                <th className="table-header text-center align-middle">
                  HOD feedback (D)
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
                <td className="table-header text-center align-middle">25</td>
                <td className="table-header text-center align-middle">25</td>
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
                      max: 25,
                    })}
                  />
                  {errors.feedbackMarks?.C?.type === "required" &&
                    "Marks is required"}
                  {errors.feedbackMarks?.C?.type === "max" &&
                    "Marks should be less than or equal to 25"}
                </td>
                <td className="table-header text-center align-middle">
                  <input
                    className="form-input"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    {...register("feedbackMarks.D", {
                      required: true,
                      max: 25,
                    })}
                  />
                  {errors.feedbackMarks?.D?.type === "required" &&
                    "Marks is required"}
                  {errors.feedbackMarks?.D?.type === "max" &&
                    "Marks should be less than or equal to 25"}
                </td>
              </tr>
            </tbody>
          </Table>
          <div style={{margin:'2rem 0'}}>
            <label className="form-label">
              HOD Remarks:
              {/* <TextareaAutosize/> */}
              <textarea {...register("confidentialReport.HODRemarks")} placeholder="Remarks..." className="form-textarea" style={{ width: "100%" }} />
            </label>
          </div>
          <input type="submit" className="btn btn-primary" />
          {/* <div style={{textAlign:'center'}}>
            <Button
              sx={{
                background: "#38ba6c",
                "&:hover": { background: "#38ba6c" },
              }}
              variant="contained"
              onClick={toggle}
            >
              Submit Form
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalBody>
                <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                  Are you sure you want to submit the form?
                </div>
                <div>Once you submit you will not be able to edit the form</div>
              </ModalBody>
              <ModalFooter>
                <Button
                  sx={{ margin: "0 1rem" }}
                  variant="contained"
                  color="success"
                  onClick={() => {
                    handleSubmit(onSubmit)
                    toggle();
                    toast.success("Complete Form Submitted!", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  }}
                >
                  Submit
                </Button>{" "}
                <Button variant="contained" color="error" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default StepFour;

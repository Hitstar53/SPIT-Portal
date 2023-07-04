import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import Table from "react-bootstrap/Table";
import { Toaster, toast } from "react-hot-toast";

function StepFour({ setDimension4, handleNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: JSON.parse(localStorage.getItem('dim4Data')) || {},
  });

  const onSubmit = (data) => {
    // console.log(data)
    setDimension4(data)
    localStorage.setItem('dim4Data', JSON.stringify(data));
    // sendToServer()
    handleNext()
    toast.success('Form submitted successfully!');
  };

  useEffect(() => {
    const getData = async () => {
      await axios.post('http://localhost:5000/api/faculty/appraisal/get/dim4',
        { name: user.fullName, yearofAssesment: yr }
      ).then((res) => {
        console.log(res.data)
        const storedData = res.data
        if (storedData) {
          Object.keys(storedData).forEach((key) => {
            setValue(key, storedData[key]);
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    }
    getData()
  }, []);

  return (
    <div>
      <h1>StepFour</h1>
      <div>
        <Toaster />
        <form className="container" onSubmit={handleSubmit(onSubmit)}>
          <Table striped bordered hover style={{marginTop: "2rem"}}>
            <thead>
              <tr>
                <th className='table-header text-center align-middle'>Perception 360 degree feedbacks</th>
                <th className='table-header text-center align-middle'>Bright students’ feedback (A)</th>
                <th className='table-header text-center align-middle'>Peer Feedback (B)</th>
                <th className='table-header text-center align-middle'>Dean feedback (C)</th>
                <th className='table-header text-center align-middle'>HOD feedback (D)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='table-header text-center align-middle'>Max Marks</td>
                <td className='table-header text-center align-middle'>25</td>
                <td className='table-header text-center align-middle'>25</td>
                <td className='table-header text-center align-middle'>25</td>
                <td className='table-header text-center align-middle'>25</td>
              </tr>
              <tr>
                <td className='table-header text-center align-middle'>Marks</td>
                <td className='table-header text-center align-middle'>
                  <input
                    className="form-input"
                    type="number"
                    {...register("Dimension4.feedbackMarks.A", { required: true, max: 25 })}
                  />
                  {errors.Dimension4?.feedbackMarks?.A?.type === "required" && "Marks is required"}
                  {errors.Dimension4?.feedbackMarks?.A?.type === "max" && "Marks should be less than or equal to 25"}
                </td>
                <td className='table-header text-center align-middle'>
                  <input
                    className="form-input"
                    type="number"
                    {...register("Dimension4.feedbackMarks.B", { required: true, max: 25 })}
                  />
                  {errors.Dimension4?.feedbackMarks?.B?.type === "required" && "Marks is required"}
                  {errors.Dimension4?.feedbackMarks?.B?.type === "max" && "Marks should be less than or equal to 25"}
                </td>
                <td className='table-header text-center align-middle'>
                  <input
                    className="form-input"
                    type="number"
                    {...register("Dimension4.feedbackMarks.C", { required: true, max: 25 })}
                  />
                  {errors.Dimension4?.feedbackMarks?.C?.type === "required" && "Marks is required"}
                  {errors.Dimension4?.feedbackMarks?.C?.type === "max" && "Marks should be less than or equal to 25"}
                </td>
                <td className='table-header text-center align-middle'>
                  <input
                    className="form-input"
                    type="number"
                    {...register("Dimension4.feedbackMarks.D", { required: true, max: 25 })}
                  />
                  {errors.Dimension4?.feedbackMarks?.D?.type === "required" && "Marks is required"}
                  {errors.Dimension4?.feedbackMarks?.D?.type === "max" && "Marks should be less than or equal to 25"}
                </td>
              </tr>
            </tbody>
          </Table>
          <button className="btn btn-primary submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default StepFour;

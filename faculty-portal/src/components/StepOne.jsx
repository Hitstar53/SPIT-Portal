import React, { useState, useEffect, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
import Table from "react-bootstrap/Table";
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/Appraisal.css";

const StepOne = () => {
  const [dimension1, setDimension1] = useState({});
  const { user } = useContext(UserContext);
  const options = [
    { value: '', label: 'Select an option' },
    { value: '1', label: 'I' },
    { value: '2', label: 'II' },
    { value: '3', label: 'III' },
    { value: '4', label: 'IV' },
    { value: '5', label: 'V' },
    { value: '6', label: 'VI' },
    { value: '7', label: 'VII' },
    { value: '8', label: 'VIII' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: JSON.parse(localStorage.getItem('dim1Data')) || {},
  });

  const {
    fields: courseFields,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: 'Dimension1.info.courses',
  });

  const {
    fields: paperFields,
    append: appendPaper,
    remove: removePaper,
  } = useFieldArray({
    control,
    name: 'Dimension1.AP10.paper',
  });

  const {
    fields: menteeFields,
    append: appendMentee,
    remove: removeMentee,
  } = useFieldArray({
    control,
    name: 'Dimension1.AP6.menteeFeedback',
  });

  const {
    fields: guestFields,
    append: appendGuest,
    remove: removeGuest,
  } = useFieldArray({
    control,
    name: 'Dimension1.AP7.guestLectureData',
  });

  useEffect(() => {
    const storedData = localStorage.getItem('dim1Data');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data)
    setDimension1(data)
    localStorage.setItem('dim1Data', JSON.stringify(data));
    toast.success('Form submitted successfully!');
    setInfoVisible(true)
  };

  const handleRemoveCourse = (index) => {
    removeCourse(index);
    const storedData = JSON.parse(localStorage.getItem('dim1Data'));
    if (storedData) {
      storedData.Dimension1.info.courses.splice(index, 1);
      localStorage.setItem('dim1Data', JSON.stringify(storedData));
    }
  };

  const handleRemovePaper = (index) => {
    removePaper(index);
    const storedData = JSON.parse(localStorage.getItem('dim1Data'));
    if (storedData) {
      storedData.Dimension1.AP10.paper.splice(index, 1);
      localStorage.setItem('dim1Data', JSON.stringify(storedData));
    }
  }

  const handleRemoveMentee = (index) => {
    removeMentee(index);
    const storedData = JSON.parse(localStorage.getItem('dim1Data'));
    if (storedData) {
      storedData.Dimension1.AP6.menteeFeedback.splice(index, 1);
      localStorage.setItem('dim1Data', JSON.stringify(storedData));
    }
  };

  const handleRemoveGuest = (index) => {
    removeGuest(index);
    const storedData = JSON.parse(localStorage.getItem('dim1Data'));
    if (storedData) {
      storedData.Dimension1.AP7.guestLectureData.splice(index, 1);
      localStorage.setItem('dim1Data', JSON.stringify(storedData));
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <div className='basic-info'>

        <div className="inputs">
          <label className="form-label">
            Year of Assessment:
            <input
              type="text"
              {...register('yearOfAssessment', { required: true })}
              className="form-input"
            />
          </label>
          {errors.yearOfAssessment && <p className="error">*This field is required</p>}
        </div>

        <div className="inputs">
          <label className="form-label">
            Faculty Name:
            <input
              type="text"
              {...register('facultyName', { required: true })}
              className="form-input"
              readOnly
              value={user.fullName}
            />
          </label>
          {errors.facultyName && <p className="error">*This field is required</p>}
        </div>

        <div className="inputs">
          <label className="form-label">
            Department:
            <input
              type="text"
              {...register('department', { required: true })}
              className="form-input"
              readOnly
              value={user.department}
            />
          </label>
          {errors.department && <p className="error">*This field is required</p>}
        </div>

        <div className="inputs">
          <label className="form-label">
            Designation:
            <input
              type="text"
              {...register('designation', { required: true })}
              className="form-input"
              readOnly
              value={user.designation}
            />
          </label>
          {errors.designation && <p className="error">*This field is required</p>}
        </div>
      </div>

      <div className='info-container'>

        

        <h3>Courses</h3>
        {courseFields.length > 0 &&
          <div>
            <Table className='course-table' striped bordered hover >
              <thead>
                <tr>
                  <th className='table-header text-center align-middle'>Course Name</th>
                  <th className='table-header text-center align-middle'>Class Name</th>
                  <th className='table-header text-center align-middle'>Sem</th>
                  <th className='table-header text-center align-middle'>Marks Obtained</th>
                  <th className='table-header text-center align-middle'>Lecture Target</th>
                  <th className='table-header text-center align-middle'>Total Lecture Taken</th>
                  <th className='table-header text-center align-middle'>Percentage Feedback</th>
                  <th className='table-header text-center align-middle'>Attendance of the Students</th>
                </tr>
              </thead>
              <tbody>
                {courseFields.map((field, index) => (
                  <tr key={field.id}>
                    <td className='text-center align-middle course-title'>
                      <input
                        type="text"
                        {...register(`Dimension1.info.courses[${index}].name`, { required: true })}
                        className="form-input"
                      />
                    </td>
                    <td className='text-center align-middle class-name'>
                      <input
                        type="text"
                        {...register(`Dimension1.info.courses[${index}].class`, { required: true })}
                        className="form-input"
                      />
                    </td>
                    <td className='text-center align-middle'>
                      <select
                        defaultValue=''
                        className='form-input'
                        {...register(`Dimension1.info.courses[${index}].sem`)}>
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className='text-center align-middle'>
                      <input
                        type="number"
                        {...register(`Dimension1.info.courses[${index}].AP2MarksObtained`, { required: true })}
                        className="form-input"
                      />
                    </td>
                    <td className='text-center align-middle'>
                      <input
                        type="number"
                        {...register(`Dimension1.info.courses[${index}].lectureTarget`, { required: true })}
                        className="form-input"
                      />
                    </td>
                    <td className='text-center align-middle'>
                      <input
                        type="number"
                        {...register(`Dimension1.info.courses[${index}].totalLecturesTaken`, { required: true })}
                        className="form-input"
                      />
                    </td>
                    <td className='text-center align-middle'>
                      <input
                        type="number"
                        {...register(`Dimension1.info.courses[${index}].AP4PercentFeedback`, { required: true })}
                        className="form-input"
                      />
                    </td>
                    <td className='text-center align-middle'>
                      <input
                        type="number"
                        {...register(`Dimension1.info.courses[${index}].AP5AttendanceStudent`, { required: true })}
                        className="form-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className='table-header text-center align-middle'>Activity done for Remedial teaching</th>
                  <th className='table-header text-center align-middle'>Noteworthy efforts towards enriching the learning experience / innovation in TLE methods</th>
                  <th className='table-header text-center align-middle'></th>
                </tr>
              </thead>
              <tbody>
                {courseFields.map((field, index) => (
                  <tr key={field.id}>
                    <td className='text-center align-middle'>
                      <textarea
                        style={{ width: "100%" }}
                        placeholder='Activity Details....'
                        className="form-textarea"
                        {...register(`Dimension1.info.courses[${index}].AP8ActivityRemedial`, { required: false })} />
                    </td>
                    <td className='text-center align-middle'>
                      <textarea
                        style={{ width: "100%" }}
                        placeholder='Activity Details....'
                        className="form-textarea"
                        {...register(`Dimension1.info.courses[${index}].AP9noteworthyDetails`, { required: false })} />
                    </td>
                    <td className='text-center align-middle'>
                      <IconButton onClick={() => handleRemoveCourse(index)}>
                        <DeleteIcon
                          sx={{ color: "red", fontSize: "40px" }} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>}

          <button type="button" className="btn btn-success" onClick={() => appendCourse({})}>
            Add Course
          </button>

          <h3>Question Papers</h3>
        {paperFields.length > 0 && <div>
          <Table striped bordered hover style={{ width: "50rem" }}>
            <thead>
              <tr>
                <th className='table-header text-center align-middle'>Paper Set for Course</th>
                <th className='table-header text-center align-middle'>Marks in audit report</th>
                <th className='table-header text-center align-middle'></th>
              </tr>
            </thead>
            <tbody>
              {paperFields.map((field, index) => (
                <tr key={field.id}>
                  <td className='text-center align-middle'>
                    <input
                      type="text"
                      {...register(`Dimension1.AP10.paper[${index}].course`, { required: true })}
                      className="form-input"
                    />
                  </td>
                  <td className='text-center align-middle'>
                    <input
                      type="number"
                      {...register(`Dimension1.AP10.paper[${index}].marks`, { required: true })}
                      className="form-input"
                    />
                  </td>
                  <td className='text-center align-middle'>
                    <IconButton onClick={() => handleRemovePaper(index)}>
                      <DeleteIcon
                        sx={{ color: "red", fontSize: "40px" }} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>}

        <button type='button' className='btn btn-success' onClick={() => appendPaper({})}>
            Add Question Paper
          </button>

          <h3>Mentee Feedback</h3>
        {menteeFields.length > 0 && <div>
          <Table striped bordered hover style={{ width: "30rem" }}>
            <thead>
              <tr>
                <th className='table-header text-center align-middle'>Mentee Feedback</th>
                <th className='table-header text-center align-middle'></th>
              </tr>
            </thead>
            <tbody>
              {menteeFields.map((field, index) => (
                <tr key={field.id}>
                  <td className='text-center align-middle'>
                    <input
                      type="number"
                      {...register(`Dimension1.AP6.menteeFeedback[${index}]`, { required: true })}
                      className="form-input"
                    />
                  </td>
                  <td className='text-center align-middle'>
                    <IconButton onClick={() => handleRemoveMentee(index)}>
                      <DeleteIcon
                        sx={{ color: "red", fontSize: "40px" }} />
                    </IconButton>
                  </td>
                </tr>))}
            </tbody>
          </Table>
        </div>}

        <button type="button" className="btn btn-success" onClick={() => appendMentee({})}>
            Add Mentee
          </button>

          <h3>Guest Lectures</h3>
        {guestFields.length > 0 && <div>
          <Table striped bordered hover style={{ width: "50rem" }}>
            <thead>
              <tr>
                <th className='table-header text-center align-middle'>Lecture Date</th>
                <th className='table-header text-center align-middle'>Lecture Title</th>
                <th className='table-header text-center align-middle'>Speaker Name</th>
                <th className='table-header text-center align-middle'>Arranged for</th>
                <th className='table-header text-center align-middle'></th>
              </tr>
            </thead>
            <tbody>
              {guestFields.map((field, index) => (
                <tr key={field.id}>
                  <td className='text-center align-middle'>
                    <input
                      type="datetime-local"
                      placeholder="date local"
                      {...register(`Dimension1.AP7.guestLectureData[${index}].date`, { required: true })}
                      className="form-input"
                    />
                  </td>
                  <td className='text-center align-middle'>
                    <input
                      type="text"
                      {...register(`Dimension1.AP7.guestLectureData[${index}].title`, { required: true })}
                      className="form-input"
                    />
                  </td>
                  <td className='text-center align-middle'>
                    <input
                      type="text"
                      {...register(`Dimension1.AP7.guestLectureData[${index}].speakerName`, { required: true })}
                      className="form-input"
                    />
                  </td>
                  <td className='text-center align-middle'>
                    <select
                      defaultValue=""
                      {...register(`Dimension1.AP7.guestLectureData[${index}].arrangedFor`, { required: true })}
                      className="form-input">
                      <option value="">Select an option</option>
                      <option value="Students">Students</option>
                      <option value="Faculty">Faculty</option>
                    </select>
                  </td>
                  <td className='text-center align-middle'>
                    <IconButton onClick={() => handleRemoveGuest(index)}>
                      <DeleteIcon
                        sx={{ color: "red", fontSize: "40px" }} />
                    </IconButton>
                  </td>
                </tr>
              ))}
              </tbody>
          </Table>
        </div>}

          <button type="button" className="btn btn-success" onClick={() => appendGuest({})}>
            Add Guest Lecture
          </button>
      </div>


      <button className="btn btn-primary submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default StepOne;

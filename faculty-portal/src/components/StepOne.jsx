import React, { useState, useEffect, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {toast} from 'react-toastify'
import { UserContext } from '../context/UserContext';
import Table from "react-bootstrap/Table";
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
import "../styles/Appraisal.css";
import CircularProgress from '@mui/material/CircularProgress';

const StepOne = ({ setDimension1, yr }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true)

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
    getValues,
    setValue,
    control,
    reset
  } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("dim1Data")) || {},
  });

  useEffect(() => {
    toast.info('Please Save Changes Before Leaving!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    const getData = async () => {
      await axios.post('http://localhost:5000/api/faculty/appraisal/get/dim1',
        { name: user.fullName, yearofAssesment: yr }
      ).then((res) => {
        console.log(res.data)
        localStorage.setItem("dim1Data", JSON.stringify(res.data))
        reset(JSON.parse(localStorage.getItem("dim1Data")))
        const storedData = localStorage.getItem("dim1Data")
        console.log(storedData)
        if(storedData) {
          Object.keys(JSON.parse(storedData)).map((key) => {
            setValue(key, JSON.parse(storedData)[key])
          })
          setLoading(false)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
    getData()
  }, []);

  const {
    fields: courseFields,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: 'info.courses',
  });
  
  const {
    fields: menteeFields,
    append: appendMentee,
    remove: removeMentee,
  } = useFieldArray({
    control,
    name: 'AP6.menteeFeedback',
  });
  
  const {
    fields: guestFields,
    append: appendGuest,
    remove: removeGuest,
  } = useFieldArray({
    control,
    name: 'AP7.guestLectureData',
  });
  
  const {
    fields: remedialFields,
    append: appendRemedial,
    remove: removeRemedial,
  } = useFieldArray({
    control,
    name: 'AP8.remedialData',
  });

  const {
    fields: noteFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control,
    name: 'AP9.noteworthyData',
  });

  const {
    fields: paperFields,
    append: appendPaper,
    remove: removePaper,
  } = useFieldArray({
    control,
    name: 'AP10.paper',
  });
  
  const onSubmit = (data) => {
    console.log(data)
    setDimension1(data)
    axios.post('http://localhost:5000/api/faculty/appraisal/dim1',
      { yearofAssesment: yr, faculty: user, Dimension1: data }
    ).then((res) => {
      console.log(res.data)
      toast.success('Step One Saved!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }).catch((err) => {
      console.log(err)
    })
    localStorage.setItem('dim1Data', JSON.stringify(data));
  };

  const handleRemoveCourse = (index) => {
    removeCourse(index);
    const storedData = JSON.parse(localStorage.getItem('dim1Data'));
    if (storedData) {
      storedData.info.courses.splice(index, 1);
      localStorage.setItem('dim1Data', JSON.stringify(storedData));
    }
  };

  const handleRemovePaper = (index) => {
    removePaper(index);
    const storedData = JSON.parse(localStorage.getItem('dim1Data'));
    if (storedData) {
      storedData.AP10.paper.splice(index, 1);
      localStorage.setItem('dim1Data', JSON.stringify(storedData));
    }
  }

  const handleRemoveMentee = (index) => {
    removeMentee(index);
    const storedData = JSON.parse(localStorage.getItem('dim1Data'));
    if (storedData) {
      storedData.AP6.menteeFeedback.splice(index, 1);
      localStorage.setItem('dim1Data', JSON.stringify(storedData));
    }
  };

  const handleRemoveGuest = (index) => {
    removeGuest(index);
    const storedData = JSON.parse(localStorage.getItem('dim1Data'));
    if (storedData) {
      storedData.AP7.guestLectureData.splice(index, 1);
      localStorage.setItem('dim1Data', JSON.stringify(storedData));
    }
  };

  const handleRemoveRemedial = (index) => {
    removeRemedial(index);
    const storedData = JSON.parse(localStorage.getItem('dim1Data'));
    if (storedData) {
      storedData.AP8.remedialData.splice(index, 1);
      localStorage.setItem('dim1Data', JSON.stringify(storedData));
    }
  };

  const handleRemoveNote = (index) => {
    removeNote(index);
    const storedData = JSON.parse(localStorage.getItem('dim1Data'));
    if (storedData) {
      storedData.AP9.noteworthyData.splice(index, 1);
      localStorage.setItem('dim1Data', JSON.stringify(storedData));
    }
  };

  return ( 
    <>
      {loading ? 
      <CircularProgress color="success"/> :
      (
        <>
        <div className='basic-info'>
  
          <div className="inputs">
            <label className="form-label">
              Year of Assessment:
              <input
                readOnly
                value={yr}
                type="text"
                // {...register('yearofAssesment', { required: true })}
                className="form-input"
              />
            </label>
            {errors.yearofAssesment && <p className="error">*This field is required</p>}
          </div>
  
          <div className="inputs">
            <label className="form-label">
              Faculty Name:
              <input
                type="text"
                // {...register('facultyName', { required: true })}
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
                // {...register('department', { required: true })}
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
                // {...register('designation', { required: true })}
                className="form-input"
                readOnly
                value={user.designation}
              />
            </label>
            {errors.designation && <p className="error">*This field is required</p>}
          </div>
        </div>
        <form className="container" onSubmit={handleSubmit(onSubmit)}>  
          <div className='info-container'>
  
            <h3>Courses</h3>
            {courseFields.length > 0 &&
              <div>
                <Table className='course-table' striped bordered hover >
                  <thead>
                    <tr>
                      <th className='table-header text-center align-middle'>Sr No</th>
                      <th className='table-header text-center align-middle'>Course Name</th>
                      <th className='table-header text-center align-middle'>Class Name</th>
                      <th className='table-header text-center align-middle'>Sem</th>
                      <th className='table-header text-center align-middle'>Marks Obtained</th>
                      <th className='table-header text-center align-middle'>Lecture Target</th>
                      <th className='table-header text-center align-middle'>Total Lecture Taken</th>
                      <th className='table-header text-center align-middle'>Percentage Feedback</th>
                      <th className='table-header text-center align-middle'>Attendance of the Students</th>
                      <th className='table-header text-center align-middle'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseFields.map((field, index) => (
                      <tr key={field.id}>
                        <td className='text-center align-middle' style={{fontSize: "1.5rem", fontWeight: 600}}>{index+1}</td>
                        <td className='text-center align-middle course-title'>
                          <input
                            type="text"
                            {...register(`info.courses[${index}].name`, { required: false })}
                            className="form-input"
                          />
                        </td>
                        <td className='text-center align-middle class-name'>
                          <input
                            type="text"
                            {...register(`info.courses[${index}].class`, { required: false })}
                            className="form-input"
                          />
                        </td>
                        <td className='text-center align-middle'>
                          <select
                            defaultValue=''
                            className='form-input'
                            {...register(`info.courses[${index}].sem`)}>
                            {options.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className='text-center align-middle'>
                          <input
                            type="number"
                  onWheel={(e) => e.target.blur()}
                            {...register(`info.courses[${index}].AP2MarksObtained`, { required: false })}
                            className="form-input"
                          />
                        </td>
                        <td className='text-center align-middle'>
                          <input
                            type="number"
                  onWheel={(e) => e.target.blur()}
                            {...register(`info.courses[${index}].AP3LecturesTarget`, { required: false })}
                            className="form-input"
                          />
                        </td>
                        <td className='text-center align-middle'>
                          <input
                            type="number"
                  onWheel={(e) => e.target.blur()}
                            {...register(`info.courses[${index}].AP3LectureConducted`, { required: false })}
                            className="form-input"
                          />
                        </td>
                        <td className='text-center align-middle'>
                          <input
                            type="number"
                  onWheel={(e) => e.target.blur()}
                            {...register(`info.courses[${index}].AP4PercentFeedback`, { required: false })}
                            className="form-input"
                          />
                        </td>
                        <td className='text-center align-middle'>
                          <input
                            type="number"
                  onWheel={(e) => e.target.blur()}
                            {...register(`info.courses[${index}].AP5AttendanceStudent`, { required: false })}
                            className="form-input"
                          />
                        </td>
                        <td className='text-center align-middle'>
                          <IconButton onClick={() => handleRemoveCourse(index)}>
                            <DeleteIcon
                              sx={{ color: "red", fontSize: "25px" }} />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>}
  
            <button type="button" className="add-btn" onClick={() => appendCourse({})}>
              Add Course
            </button>

            <h3>Remedial Activity</h3>

            {remedialFields.length > 0 && 
            <div>
               <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className='table-header text-center align-middle'>Sr No</th>
                      <th className='table-header text-center align-middle'>Sem</th>
                      <th className='table-header text-center align-middle'>Subject</th>
                      <th className='table-header text-center align-middle'>Activity done for Remedial teaching</th>
                      <th className='table-header text-center align-middle'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {remedialFields.map((field, index) => (
                      <tr key={field.id}>
                        <td className='text-center align-middle' style={{fontSize: "1.5rem", fontWeight: 600}}>{index+1}</td>
                        <td className='text-center align-middle'>
                          <select
                            defaultValue=''
                            className='form-input'
                            {...register(`AP8.remedialData[${index}].sem`)}>
                            {options.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className='text-center align-middle'>
                          <input
                            type='text'     
                            className="form-input"
                            {...register(`AP8.remedialData[${index}].subject`, { required: false })} />
                        </td>
                        <td className='text-center align-middle'>
                          <textarea
                            style={{ width: "100%" }}
                            placeholder='Activity Details....'
                            className="form-textarea"
                            {...register(`AP8.remedialData[${index}].activityDetails`, { required: false })} />
                        </td>
                        <td className='text-center align-middle'>
                          <IconButton onClick={() => handleRemoveRemedial(index)}>
                            <DeleteIcon
                              sx={{ color: "red", fontSize: "25px" }} />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>}                  

            <button type="button" className="add-btn" onClick={() => appendRemedial({})}>
              Add Remedial Activity
            </button>

            <h3>Noteworthy efforts towards enriching the learning experience / innovation in TLE methods </h3>

            {noteFields.length > 0 && 
            <div>
               <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className='table-header text-center align-middle'>Sr No</th>
                      <th className='table-header text-center align-middle'>Sem</th>
                      <th className='table-header text-center align-middle'>Subject</th>
                      <th className='table-header text-center align-middle'>Activity Details</th>
                      <th className='table-header text-center align-middle'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {noteFields.map((field, index) => (
                      <tr key={field.id}>
                        <td className='text-center align-middle' style={{fontSize: "1.5rem", fontWeight: 600}}>{index+1}</td>
                        <td className='text-center align-middle'>
                          <select
                            defaultValue=''
                            className='form-input'
                            {...register(`AP9.noteworthyData[${index}].sem`)}>
                            {options.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className='text-center align-middle'>
                          <input
                            type='text'     
                            className="form-input"
                            {...register(`AP9.noteworthyData[${index}].subject`, { required: false })} />
                        </td>
                        <td className='text-center align-middle'>
                          <textarea
                            style={{ width: "100%" }}
                            placeholder='Activity Details....'
                            className="form-textarea"
                            {...register(`AP9.noteworthyData[${index}].activityDetails`, { required: false })} />
                        </td>
                        <td className='text-center align-middle'>
                          <IconButton onClick={() => handleRemoveNote(index)}>
                            <DeleteIcon
                              sx={{ color: "red", fontSize: "25px" }} />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>}        

            <button type="button" className="add-btn" onClick={() => appendNote({})}>
              Add Noteworthy Efforts
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
                          {...register(`AP10.paper[${index}].course`, { required: true })}
                          className="form-input"
                        />
                      </td>
                      <td className='text-center align-middle'>
                        <input
                          type="number"
                  onWheel={(e) => e.target.blur()}
                          {...register(`AP10.paper[${index}].marks`, { required: true })}
                          className="form-input"
                        />
                      </td>
                      <td className='text-center align-middle'>
                        <IconButton onClick={() => handleRemovePaper(index)}>
                          <DeleteIcon
                              sx={{ color: "red", fontSize: "25px" }} />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>}
  
            <button type='button' className='add-btn' onClick={() => appendPaper({})}>
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
                  onWheel={(e) => e.target.blur()}
                          {...register(`AP6.menteeFeedback[${index}]`, { required: true })}
                          className="form-input"
                        />
                      </td>
                      <td className='text-center align-middle'>
                        <IconButton onClick={() => handleRemoveMentee(index)}>
                          <DeleteIcon
                              sx={{ color: "red", fontSize: "25px" }} />
                        </IconButton>
                      </td>
                    </tr>))}
                </tbody>
              </Table>
            </div>}
  
            <button type="button" className="add-btn" onClick={() => appendMentee({})}>
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
                          {...register(`AP7.guestLectureData[${index}].date`, { required: true })}
                          className="form-input"
                        />
                      </td>
                      <td className='text-center align-middle'>
                        <input
                          type="text"
                          {...register(`AP7.guestLectureData[${index}].title`, { required: true })}
                          className="form-input"
                        />
                      </td>
                      <td className='text-center align-middle'>
                        <input
                          type="text"
                          {...register(`AP7.guestLectureData[${index}].speakerName`, { required: true })}
                          className="form-input"
                        />
                      </td>
                      <td className='text-center align-middle'>
                        <select
                          defaultValue=""
                          {...register(`AP7.guestLectureData[${index}].arrangedFor`, { required: true })}
                          className="form-input">
                          <option value="">Select an option</option>
                          <option value="Students">Students</option>
                          <option value="Faculty">Faculty</option>
                        </select>
                      </td>
                      <td className='text-center align-middle'>
                        <IconButton onClick={() => handleRemoveGuest(index)}>
                          <DeleteIcon
                              sx={{ color: "red", fontSize: "25px" }} />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>}
  
            <button type="button" className="add-btn" onClick={() => appendGuest({})}>
              Add Guest Lecture
            </button>
          </div>
  
  
          <button className="save-btn" type="submit">
            Save Changes
          </button>
        </form>
      </>
      )}
    </>
  );
};

export default StepOne;

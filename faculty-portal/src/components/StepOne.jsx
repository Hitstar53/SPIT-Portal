import React, { useState, useEffect, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
import "../styles/Appraisal.css";

const StepOne = () => {
  const [Dimension1, setDimension1] = useState({});
  const { user } = useContext(UserContext);
  const options = [
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
    control
  } = useForm();

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
    name: 'Dimension1.info.courses.papers',
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
  };

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
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

      <h3>Courses</h3>

      {courseFields.map((field, index) => (
        <div key={field.id}>
          <h3>Course {index + 1}</h3>
          <div className="inputs">
            <label className="form-label">
              Course Name:
              <input
                type="text"
                {...register(`Dimension1.info.courses[${index}].name`, { required: true })}
                className="form-input"
              />
            </label>
            {errors[`Dimension1.info.courses[${index}].name`] && (
              <p className="error">*This field is required</p>
            )}
          </div>

          <div className="inputs">
            <label className="form-label">
              Class Name:
              <input
                type="text"
                {...register(`Dimension1.info.courses[${index}].class`, { required: true })}
                className="form-input"
              />
            </label>
            {errors[`Dimension1.info.courses[${index}].class`] && (
              <p className="error">*This field is required</p>
            )}
          </div>

          <div className="inputs">
            <label className="form-label">
              Sem:
              <select className='form-input' {...register(`Dimension1.info.courses[${index}].sem`)}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
            {errors[`Dimension1.info.courses[${index}].sem`] && (
              <p className="error">*This field is required</p>
            )}
          </div>

          <div className="inputs">
            <label className="form-label">
              Marks Obtained:
              <input
                type="number"
                {...register(`Dimension1.info.courses[${index}].AP2MarksObtained`, { required: true })}
                className="form-input"
              />
              <p className='marks-info'>(To be filled from  audited course file)</p>
            </label>
            {errors[`Dimension1.info.courses[${index}].AP2MarksObtained`] && (
              <p className="error">*This field is required</p>
            )}
          </div>

          <div className="inputs">
            <label className="form-label">
              Lecture Target:
              <input
                type="number"
                {...register(`Dimension1.info.courses[${index}].AP3LecturesTarget`, { required: true })}
                className="form-input"
              />
            </label>
            {errors[`Dimension1.info.courses[${index}].AP3LecturesTarget`] && (
              <p className="error">*This field is required</p>
            )}
          </div>

          <div className="inputs">
            <label className="form-label">
              Total Lectures Taken:
              <input
                type="number"
                {...register(`Dimension1.info.courses[${index}].AP3LectureConducted`, { required: true })}
                className="form-input"
              />
            </label>
            {errors[`Dimension1.info.courses[${index}].AP3LectureConducted`] && (
              <p className="error">*This field is required</p>
            )}
          </div>

          <div className="inputs">
            <label className="form-label">
              Percentage feedback:
              <input
                type="number"
                {...register(`Dimension1.info.courses[${index}].AP4PercentFeedback`, { required: true })}
                className="form-input"
              />
            </label>
            {errors[`Dimension1.info.courses[${index}].AP4PercentFeedback`] && (
              <p className="error">*This field is required</p>
            )}
          </div>

          <div className="inputs">
            <label className="form-label">
              Attendance of the Students:
              <input
                type="number"
                {...register(`Dimension1.info.courses[${index}].AP5AttendanceStudent`, { required: true })}
                className="form-input"
              />
            </label>
            {errors[`Dimension1.info.courses[${index}].AP5AttendanceStudent`] && (
              <p className="error">*This field is required</p>
            )}
          </div>

          <div className="inputs">
            <label className="form-label">
              Activity done for Remedial teaching:
              <textarea
                placeholder='Activity Details....'
                className="form-textarea"
                {...register(`Dimension1.info.courses[${index}].AP8ActivityRemedial`, { required: false })} />
            </label>
            {errors[`Dimension1.info.courses[${index}].AP8ActivityRemedial`] && (
              <p className="error">*This field is required</p>
            )}
          </div>

          <div className="inputs">
            <label className="form-label">
              Noteworthy efforts towards enriching the learning experience / innovation in TLE methods:
              <textarea
                placeholder='Activity Details....'
                className="form-textarea"
                {...register(`Dimension1.info.courses[${index}].AP9noteworthyDetails`, { required: false })} />
            </label>
            {errors[`Dimension1.info.courses[${index}].AP9noteworthyDetails`] && (
              <p className="error">*This field is required</p>
            )}
          </div>

          {paperFields.map((field, pindex) => (
            <div key={field.id}>
              <h3>Question Paper {pindex + 1}</h3>
              <div className="inputs">
                <label className="form-label">
                  Paper Set for Course (Specify the exam):
                  <input
                    type="text"
                    {...register(`Dimension1.info.courses[${index}].AP10paperset[${pindex}].paperSetForCourse`, {})}
                    className="form-input"
                  />
                </label>
                {errors[`Dimension1.info.courses[${index}].AP10paperset[${pindex}].paperSetForCourse`] && (
                  <p className="error">*This field is required</p>
                )}
              </div>

              <div className="inputs">
                <label className="form-label">
                  Marks in audit report:
                  <input
                    type="number"
                    {...register(`Dimension1.info.courses[${index}].AP10paperset[${pindex}].marks`, {})}
                    className="form-input"
                  />
                </label>
                {errors[`Dimension1.info.courses[${index}].AP10paperset[${pindex}].marks`] && (
                  <p className="error">*This field is required</p>
                )}
              </div>
              
          <button type="button" className="btn btn-danger" onClick={() => removePaper(pindex)}>
            Remove Question Paper
          </button>

            </div>
          ))}
          
          <div className='buttons'>

          <button type='button' className='btn btn-success' onClick={() => appendPaper({})}>
            Add Question Paper
          </button>

          <button type="button" className="btn btn-danger" onClick={() => removeCourse(index)}>
            Remove Course
          </button>
          </div>

        </div>
      ))}
      
      <div className='buttons'>

      <button type="button" className="btn btn-success" onClick={() => appendCourse({})}>
        Add Course
      </button>


      <button className="btn btn-primary submit-btn" type="submit">
        Submit
      </button>

      </div>
    </form>
  );
};

export default StepOne;

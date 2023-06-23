import React, { useState, useEffect, useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
import "../styles/Appraisal.css";

const StepOne = () => {
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

  // const {
  //   fields: courseFields,
  //   append,
  //   remove,
  // } = useFieldArray({
  //   control,
  //   name: '',
  // });
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm();

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

      <div className="inputs">
        <label className="form-label">
          Course Name:
          <input
            type="text"
            {...register('Dimension1.info.courses[0].name', { required: true })}
            className="form-input"
          />
        </label>
        {errors['Dimension1.info.courses[0].name'] && (
          <p className="error">*This field is required</p>
        )}
      </div>

      <div className="inputs">
        <label className="form-label">
          Class Name:
          <input
            type="text"
            {...register('Dimension1.info.courses[0].class', { required: true })}
            className="form-input"
          />
        </label>
        {errors['Dimension1.info.courses[0].class'] && (
          <p className="error">*This field is required</p>
        )}
      </div>

      <div className="inputs">
        <label className="form-label">
          Sem:
          <select className='form-input' {...register("Dimension1.info.courses[0].sem")}>
          {options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        {errors['Dimension1.info.courses[0].sem'] && (
          <p className="error">*This field is required</p>
        )}
      </div>

      <div className="inputs">
        <label className="form-label">
          Marks Obtained:
          <input
            type="number"
            {...register('Dimension1.info.courses[0].AP2MarksObtained', { required: true })}
            className="form-input"
          />
          <p className='marks-info'>(To be filled from  audited course file)</p>
        </label>
        {errors['Dimension1.info.courses[0].AP2MarksObtained'] && (
          <p className="error">*This field is required</p>
        )}
      </div>

      <div className="inputs">
        <label className="form-label">
          Lecture Target:
          <input
            type="number"
            {...register('Dimension1.info.courses[0].AP3LecturesTarget', { required: true })}
            className="form-input"
          />
        </label>
        {errors['Dimension1.info.courses[0].AP3LecturesTarget'] && (
          <p className="error">*This field is required</p>
        )}
      </div>

      <div className="inputs">
        <label className="form-label">
          Total Lectures Taken:
          <input
            type="number"
            {...register('Dimension1.info.courses[0].AP3LectureConducted', { required: true })}
            className="form-input"
          />
        </label>
        {errors['Dimension1.info.courses[0].AP3LectureConducted'] && (
          <p className="error">*This field is required</p>
        )}
      </div>

      <div className="inputs">
        <label className="form-label">
          Total Lectures Taken:
          <input
            type="number"
            {...register('Dimension1.info.courses[0].AP3LectureConducted', { required: true })}
            className="form-input"
          />
        </label>
        {errors['Dimension1.info.courses[0].AP3LectureConducted'] && (
          <p className="error">*This field is required</p>
        )}
      </div>

      <div className="inputs">
        <label className="form-label">
        Percentage feedback:
          <input
            type="number"
            {...register('Dimension1.info.courses[0].AP4PercentFeedback', { required: true })}
            className="form-input"
          />
        </label>
        {errors['Dimension1.info.courses[0].AP4PercentFeedback'] && (
          <p className="error">*This field is required</p>
        )}
      </div>

      <button className="btn btn-primary submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default StepOne;

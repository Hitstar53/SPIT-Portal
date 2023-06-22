import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
import "../styles/Appraisal.css"

const StepOne = () => {
  const { user } = useContext(UserContext);
  // console.log(user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
    console.log(data);
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
        {errors.yearOfAssessment && <p className='error'>*This field is required</p>}
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
        {errors.facultyName && <p className='error'>*This field is required</p>}
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
        {errors.department && <p className='error'>*This field is required</p>}
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
        {errors.designation && <p className='error'>*This field is required</p>}
      </div>

      <h3>Courses</h3>


      <button className="btn btn-primary submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default StepOne;
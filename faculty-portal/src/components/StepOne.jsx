import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../context/UserContext';

const StepOne = () => {
  const { user } = useContext(UserContext);
  console.log(user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const form = useForm({
    defaultValues: {
      yearOfAssessment: '',
      facultyName: user.firstName+" "+user.middleName+" "+user.lastName,
      department: user.department,
      designation: user.designation
      },

    },    
)

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Form submitted successfully!');
  };

  useEffect(() => {
    setValue('facultyName', user.firstName+" "+user.middleName+" "+user.lastName);
    setValue('department', user.department);
    setValue('designation', user.designation);
    user.courses.forEach((course, index) => {
      setValue(`courses[${index}].lecturesConducted`, course.lecturesConducted);
      setValue(`courses[${index}].targetedLectures`, course.targetedLectures);
    });
  }, [setValue]);

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <div>
        <label className="form-label">
          Year of Assessment:
          <input
            type="text"
            {...register('yearOfAssessment', { required: true })}
            className="form-input"
          />
        </label>
        {errors.facultyName && <span className="error-message">This field is required</span>}
      </div>

      <div>
        <label className="form-label">
          Faculty Name:
          <input
            type="text"
            {...register('facultyName', { required: true })}
            className="form-input"
            readOnly
            value={user.name}
          />
        </label>
        {errors.facultyName && <span className="error-message">This field is required</span>}
      </div>

      <div>
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
        {errors.department && <span className="error-message">This field is required</span>}
      </div>

      <div>
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
        {errors.designation && <span className="error-message">This field is required</span>}
      </div>

      <h3>Courses</h3>


      <button className="btn btn-primary submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default StepOne;
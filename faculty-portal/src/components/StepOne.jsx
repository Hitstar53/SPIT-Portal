import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { Teacher } from '../data/TeacherData';

const StepOne = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const calculateAveragePercentage = () => {
    const totalCourses = Teacher.courses.length;
    let totalPercentage = 0;

    Teacher.courses.forEach((course) => {
      const targetAchieved = (course.lecturesConducted / course.targetedLectures) * 100;
      totalPercentage += targetAchieved;
    });

    return (totalPercentage / totalCourses);
  };

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Form submitted successfully!');
  };

  // Set initial values from Teacher object
  useEffect(() => {
    setValue('facultyName', Teacher.name);
    setValue('department', Teacher.department);
    setValue('designation', Teacher.designation);
    Teacher.courses.forEach((course, index) => {
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
            value={Teacher.name}
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
            value={Teacher.department}
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
            value={Teacher.designation}
          />
        </label>
        {errors.designation && <span className="error-message">This field is required</span>}
      </div>

      <h3>Courses</h3>

      {Teacher.courses.map((course, index) => (
        <div key={index}>
          <h4>Course {index + 1}</h4>

          <div>
            <label className="form-label">
              Course Name
              <input
                type="text"
                {...register(`courses[${index}].name`, { required: true })}
                className="form-input"
                readOnly
                value={course.courseName || ''}
              />
            </label>
            {errors.courses && errors.courses[index] && errors.courses[index].name && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <div>
            <label className="form-label">
              Class
              <input
                type="text"
                {...register(`courses[${index}].class`, { required: true })}
                className="form-input"
                readOnly
                value={course.class || ''}
              />
            </label>
            {errors.courses && errors.courses[index] && errors.courses[index].class && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <div>
            <label className="form-label">
              Semester
              <input
                type="text"
                {...register(`courses[${index}].semester`, { required: true })}
                className="form-input"
                readOnly
                value={course.sem}
              />
            </label>
            {errors.courses && errors.courses[index] && errors.courses[index].semester && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <div>
            <label className="form-label">
              Targeted Lectures
              <input
                type="number"
                {...register(`courses[${index}].targetedLectures`, { required: true })}
                className="form-input"
                value={watch(`courses[${index}].targetedLectures`)}
              />
            </label>
            {errors.courses && errors.courses[index] && errors.courses[index].targetedLectures && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <div>
            <label className="form-label">
              Lectures Conducted
              <input
                type="number"
                {...register(`courses[${index}].lecturesConducted`, { required: true })}
                className="form-input"
                value={watch(`courses[${index}].lecturesConducted`)}
              />
            </label>
            {errors.courses && errors.courses[index] && errors.courses[index].lecturesConducted && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <div>
            <label className="form-label">
              Percentage of Target Achieved
              <input
                type="number"
                {...register(`courses[${index}].percentageOfTargetAchieved`)}
                readOnly
                className="form-input"
                value={((watch(`courses[${index}].lecturesConducted`) / watch(`courses[${index}].targetedLectures`)) * 100).toFixed(2)}
              />
            </label>
          </div>
        </div>
      ))}

      <div>
        <label className="form-label">
          Average Percentage of All Courses
          <input
            type="number"
            {...register('averagePercentage')}
            readOnly
            className="form-input"
            value={calculateAveragePercentage().toFixed(2)}
          />
        </label>
      </div>

      <button className="btn btn-primary submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default StepOne;
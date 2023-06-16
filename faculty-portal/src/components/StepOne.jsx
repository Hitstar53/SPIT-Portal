import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const StepOne = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'courses',
  });

  const calculateTargetAchieved = (index) => {
    const targetedLectures = watch(`courses[${index}].targetedLectures`);
    const lecturesConducted = watch(`courses[${index}].lecturesConducted`);

    if (targetedLectures && lecturesConducted) {
      const percentage = (lecturesConducted / targetedLectures) * 100;
      setValue(`courses[${index}].percentageOfTargetAchieved`, percentage);
      calculateAveragePercentage();
    }
  };

  const calculateAveragePercentage = () => {
    const percentages = watch('courses', []);
    if (percentages.length > 0) {
      const sum = percentages.reduce(
        (total, course) => total + course.percentageOfTargetAchieved,
        0
      );
      const average = sum / percentages.length;
      setValue('averagePercentage', average);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    // You can perform further actions with the form data, such as sending it to an API.
    toast.success('Form submitted successfully!');
  };

  const showToastErrorMessage = (fieldName) => {
    toast.error(`Please enter a value for ${fieldName}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="form-label">
          Faculty Name
          <input type="text" {...register('facultyName', { required: true })} className="form-input" />
        </label>
        {errors.facultyName && showToastErrorMessage('Faculty Name')}
      </div>

      <div>
        <label className="form-label">
          Department
          <input type="text" {...register('department', { required: true })} className="form-input" />
        </label>
        {errors.department && showToastErrorMessage('Department')}
      </div>

      <div>
        <label className="form-label">
          Designation
          <input type="text" {...register('designation', { required: true })} className="form-input" />
        </label>
        {errors.designation && showToastErrorMessage('Designation')}
      </div>

      <h3>Courses</h3>

      {fields.map((course, index) => (
        <div key={course.id}>
          <h4>Course {index + 1}</h4>

          <div>
            <label className="form-label">
              Course Name
              <input
                type="text"
                {...register(`courses[${index}].name`, { required: true })}
                className="form-input"
              />
            </label>
            {errors.courses && errors.courses[index] && errors.courses[index].name &&
              showToastErrorMessage(`Course Name of Course ${index + 1}`)}
          </div>

          <div>
            <label className="form-label">
              Class
              <input
                type="text"
                {...register(`courses[${index}].class`, { required: true })}
                className="form-input"
              />
            </label>
            {errors.courses && errors.courses[index] && errors.courses[index].class &&
              showToastErrorMessage(`Class of Course ${index + 1}`)}
          </div>

          <div>
            <label className="form-label">
              Semester
              <input
                type="text"
                {...register(`courses[${index}].semester`, { required: true })}
                className="form-input"
              />
            </label>
            {errors.courses && errors.courses[index] && errors.courses[index].semester &&
              showToastErrorMessage(`Semester of Course ${index + 1}`)}
          </div>

          <div>
            <label className="form-label">
              Targeted Lectures
              <input
                type="number"
                {...register(`courses[${index}].targetedLectures`, { required: true })}
                onChange={() => calculateTargetAchieved(index)}
                className="form-input"
              />
            </label>
            {errors.courses && errors.courses[index] && errors.courses[index].targetedLectures &&
              showToastErrorMessage(`Targeted Lectures of Course ${index + 1}`)}
          </div>

          <div>
            <label className="form-label">
              Lectures Conducted
              <input
                type="number"
                {...register(`courses[${index}].lecturesConducted`, { required: true })}
                onChange={() => calculateTargetAchieved(index)}
                className="form-input"
              />
            </label>
            {errors.courses && errors.courses[index] && errors.courses[index].lecturesConducted &&
              showToastErrorMessage(`Lectures Conducted of Course ${index + 1}`)}
          </div>

          <div>
            <label className="form-label">
              Percentage of Target Achieved
              <input
                type="number"
                {...register(`courses[${index}].percentageOfTargetAchieved`, { required: true })}
                readOnly
                className="form-input"
              />
            </label>
            {errors.courses && errors.courses[index] && errors.courses[index].percentageOfTargetAchieved &&
              showToastErrorMessage(`Percentage of Target Achieved of Course ${index + 1}`)}
          </div>

          {index === fields.length - 1 && (
            <div>
              <label className="form-label">
                Average Percentage of All Courses
                <input
                  type="number"
                  {...register('averagePercentage')}
                  readOnly
                  className="form-input"
                />
              </label>
            </div>
          )}

          <button className="btn btn-danger remove-btn" type="button" onClick={() => remove(index)}>
            Remove Course
          </button>
        </div>
      ))}

      <button className="btn btn-success add-btn" type="button" onClick={() => append({})}>
        Add Course
      </button>

      <button className="btn btn-primary submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default StepOne;

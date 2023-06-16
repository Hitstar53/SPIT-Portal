import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import '../styles/Appraisal2.css'

function StepTwo() {
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'papers',
  });

  const onSubmit = (data) => {
    console.log(data);
    // Perform any necessary actions with the form data, such as storing it in a database
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <h3>Paper #{index + 1}</h3>
          <label>Title</label>
          <input {...register(`papers[${index}].title`)} />

          <label>Journal</label>
          <input {...register(`papers[${index}].journal`)} />

          <label>Author</label>
          <input {...register(`papers[${index}].author`)} />

          <label>Publisher</label>
          <input {...register(`papers[${index}].publisher`)} />

          <label>Paper Link</label>
          <input {...register(`papers[${index}].paperLink`)} />

          <button type="button" onClick={() => remove(index)}>
            Remove Paper
          </button>
        </div>
      ))}

      <button type="button" onClick={() => append({})}>
        Add Paper
      </button>

      <button type="submit">Submit</button>
    </form>
  );
}

export default StepTwo;

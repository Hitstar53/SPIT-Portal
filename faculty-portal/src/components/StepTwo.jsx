import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "../styles/Appraisal2.css";

function StepTwo() {
  const [dimension2, setDimension2] = useState([{}]);
  const { register, control, handleSubmit } = useForm();
  const {
    fields: paperFields,
    append: appendPaper,
    remove: removePaper,
  } = useFieldArray({
    control,
    name: "RP1.papers",
  });
  const {
    fields: patentFields,
    append: appendPatent,
    remove: removePatent,
  } = useFieldArray({
    control,
    name: "RP2.patents",
  });
  const {
    fields: bookFields,
    append: appendBook,
    remove: removeBook,
  } = useFieldArray({
    control,
    name: "RP2.books",
  });
  const {
    fields: moocFields,
    append: appendMOOC,
    remove: removeMOOC,
  } = useFieldArray({
    control,
    name: "RP2.moocs",
  });
  const {
    fields: sponsoredFields,
    append: appendSponsored,
    remove: removeSponsored,
  } = useFieldArray({
    control,
    name: "sponsored",
  });
  const {
    fields: citationsFields,
    append: appendCitations,
    remove: removeCitations,
  } = useFieldArray({
    control,
    name: "citations",
  });
  const {
    fields: developmentFields,
    append: appendDevelopment,
    remove: removeDevelopment,
  } = useFieldArray({
    control,
    name: "development",
  });
  const {
    fields: soft_hard_devFields,
    append: appendSoftHardDev,
    remove: removeSoftHardDev,
  } = useFieldArray({
    control,
    name: "soft_hard_dev",
  });
  const {
    fields: extrasFields,
    append: appendExtras,
    remove: removeExtras,
  } = useFieldArray({
    control,
    name: "extras",
  });

  const onSubmit = (data) => {
    console.log(data);
    // Perform any necessary actions with the form data, such as storing it in a database
    setDimension2(data);
    console.log(dimension2);
  };

  useEffect(() => {
    console.log("new dimension2=", dimension2);
  }, [dimension2]);

  return (
    <>
      <h1>RP1: Publications</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {paperFields.map((field, index) => (
          <div key={field.id}>
            <h3>Paper #{index + 1}</h3>
            <label className="form-label">Title</label>
            <input
              {...register(`RP1.papers[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Journal</label>
            <input
              {...register(`RP1.papers[${index}].journal`)}
              className="form-input"
            />

            <label className="form-label">Author</label>
            <input
              {...register(`RP1.papers[${index}].author`)}
              className="form-input"
            />

            <label className="form-label">Publisher</label>
            <input
              {...register(`RP1.papers[${index}].publisher`)}
              className="form-input"
            />

            <label className="form-label">Paper Link</label>
            <input
              {...register(`RP1.papers[${index}].link`)}
              className="form-input"
            />

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removePaper(index)}
            >
              Remove Paper
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => appendPaper({})}
        >
          Add Paper
        </button>

        <h1>RP2: Patents and Books</h1>
        {patentFields.map((field, index) => (
          <div key={field.id}>
            <h3>Patent #{index + 1}</h3>
            <label className="form-label">Title</label>
            <input
              {...register(`RP2.patents[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Inventor</label>
            <input
              {...register(`RP2.patents[${index}].inventor`)}
              className="form-input"
            />

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removePatent(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => appendPatent({})}
        >
          Add Patent
        </button>

        {bookFields.map((field, index) => (
          <div key={field.id}>
            <h3>Book #{index + 1}</h3>
            <label className="form-label">Title</label>
            <input
              {...register(`RP2.books[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Author</label>
            <input
              {...register(`RP2.books[${index}].author`)}
              className="form-input"
            />

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeBook(index)}
            >
              Remove Book
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => appendBook({})}
        >
          Add Book
        </button>

        {moocFields.map((field, index) => (
          <div key={field.id}>
            <h3>MOOC #{index + 1}</h3>
            <label className="form-label">Title</label>
            <input
              {...register(`RP2.moocs[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Platform</label>
            <input
              {...register(`RP2.moocs[${index}].platform`)}
              className="form-input"
            />

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeMOOC(index)}
            >
              Remove MOOC
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => appendMOOC({})}
        >
          Add MOOC
        </button>

        <h1>Sponsored Research</h1>
        {sponsoredFields.map((field, index) => (
          <div key={field.id}>
            <h3>Sponsored Research #{index + 1}</h3>
            <label className="form-label">Title</label>
            <input
              {...register(`sponsored[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Sponsor</label>
            <input
              {...register(`sponsored[${index}].sponsor`)}
              className="form-input"
            />

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeSponsored(index)}
            >
              Remove Sponsored Research
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => appendSponsored({})}
        >
          Add Sponsored Research
        </button>

        <h1>Citations</h1>
        {citationsFields.map((field, index) => (
          <div key={field.id}>
            <h3>Citation #{index + 1}</h3>
            <label className="form-label">Title</label>
            <input
              {...register(`citations[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Author</label>
            <input
              {...register(`citations[${index}].author`)}
              className="form-input"
            />

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeCitations(index)}
            >
              Remove Citation
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => appendCitations({})}
        >
          Add Citation
        </button>

        <h1>Development</h1>
        {developmentFields.map((field, index) => (
          <div key={field.id}>
            <h3>Development #{index + 1}</h3>
            <label className="form-label">Title</label>
            <input
              {...register(`development[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Description</label>
            <input
              {...register(`development[${index}].description`)}
              className="form-input"
            />

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeDevelopment(index)}
            >
              Remove Development
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => appendDevelopment({})}
        >
          Add Development
        </button>

        <h1>Soft and Hard Skills Development</h1>
        {soft_hard_devFields.map((field, index) => (
          <div key={field.id}>
            <h3>Skill #{index + 1}</h3>
            <label className="form-label">Skill Name</label>
            <input
              {...register(`soft_hard_dev[${index}].skillName`)}
              className="form-input"
            />

            <label className="form-label">Level</label>
            <input
              {...register(`soft_hard_dev[${index}].level`)}
              className="form-input"
            />

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeSoftHardDev(index)}
            >
              Remove Skill
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => appendSoftHardDev({})}
        >
          Add Skill
        </button>

        <h1>Extras</h1>
        {extrasFields.map((field, index) => (
          <div key={field.id}>
            <h3>Extra #{index + 1}</h3>
            <label className="form-label">Title</label>
            <input
              {...register(`extras[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Description</label>
            <input
              {...register(`extras[${index}].description`)}
              className="form-input"
            />

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeExtras(index)}
            >
              Remove Extra
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => appendExtras({})}
        >
          Add Extra
        </button>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default StepTwo;

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "../styles/Appraisal2.css";
import { DevTool } from "@hookform/devtools";

function StepTwo() {
  const [dimension2, setDimension2] = useState([{}]);
  const { register, control, handleSubmit } = useForm();
  const {
    fields: paperFields,
    append: appendPaper,
    remove: removePaper,
  } = useFieldArray({
    control,
    name: "papers",
  });
  const {
    fields: patentFields,
    append: appendPatent,
    remove: removePatent,
  } = useFieldArray({
    control,
    name: "patents",
  });
  const {
    fields: bookFields,
    append: appendBook,
    remove: removeBook,
  } = useFieldArray({
    control,
    name: "books",
  });
  const {
    fields: moocFields,
    append: appendMOOC,
    remove: removeMOOC,
  } = useFieldArray({
    control,
    name: "moocs",
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
    name: 'extras',
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
              {...register(`papers[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Journal</label>
            <input
              {...register(`papers[${index}].journal`)}
              className="form-input"
            />

            <label className="form-label">Author</label>
            <input
              {...register(`papers[${index}].author`)}
              className="form-input"
            />

            <label className="form-label">Publisher</label>
            <input
              {...register(`papers[${index}].publisher`)}
              className="form-input"
            />

            <label className="form-label">Paper Link</label>
            <input
              {...register(`papers[${index}].paperLink`)}
              className="form-input"
            />

            <button type="button" onClick={() => removePaper(index)}>
              Remove Paper
            </button>
          </div>
        ))}

        <button type="button" onClick={() => appendPaper({})}>
          Add Paper
        </button>

        <h1>RP2: Patents</h1>
        {patentFields.map((field, index) => (
          <div key={field.id}>
            <label className="form-label">Patent Obtained {index + 1}</label>
            <input
              type="text"
              {...register(`patents[${index}].name`)}
              className="form-input"
            />
            <label className="form-label">Patent details</label>
            <input
              type="text"
              {...register(`patents[${index}].details`)}
              className="form-input"
            />

            <button type="button" onClick={() => removePatent(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={() => appendPatent({})}>
          Add Patent
        </button>

        <h1>RP3: Books</h1>
        {bookFields.map((field, index) => (
          <div key={field.id}>
            <h3>Book #{index + 1}</h3>
            <label className="form-label">Title</label>
            <input
              type="text"
              {...register(`books[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Author</label>
            <input
              type="text"
              {...register(`books[${index}].author`)}
              className="form-input"
            />

            <label className="form-label">Publisher</label>
            <input
              type="text"
              {...register(`books[${index}].publisher`)}
              className="form-input"
            />

            <button type="button" onClick={() => removeBook(index)}>
              Remove Book
            </button>
          </div>
        ))}

        <button type="button" onClick={() => appendBook({})}>
          Add Book
        </button>

        <h1>RP4: MOOC</h1>
        {moocFields.map((field, index) => (
          <div key={field.id}>
            <h3>MOOC #{index + 1}</h3>
            <label className="form-label">Name</label>
            <input
              type="text"
              {...register(`moocs[${index}].name`)}
              className="form-input"
            />

            <label className="form-label">Duration</label>
            <input
              type="text"
              {...register(`moocs[${index}].duration`)}
              className="form-input"
            />

            <label className="form-label">Details</label>
            <input
              type="text"
              {...register(`moocs[${index}].details`)}
              className="form-input"
            />

            <button type="button" onClick={() => removeMOOC(index)}>
              Remove MOOC
            </button>
          </div>
        ))}

        <button type="button" onClick={() => appendMOOC({})}>
          Add MOOC
        </button>

        <h1>RP5: Sponsored</h1>
        {sponsoredFields.map((field, index) => (
          <div key={field.id}>
            <h3>Sponsored #{index + 1}</h3>
            <label className="form-label">Date</label>
            <input
              type="text"
              {...register(`sponsored[${index}].date`)}
              className="form-input"
            />

            <label className="form-label">Title</label>
            <input
              type="text"
              {...register(`sponsored[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Agency</label>
            <input
              type="text"
              {...register(`sponsored[${index}].agency`)}
              className="form-input"
            />

            <label className="form-label">Details</label>
            <input
              type="text"
              {...register(`sponsored[${index}].details`)}
              className="form-input"
            />

            <label className="form-label">Amount</label>
            <input
              type="text"
              {...register(`sponsored[${index}].amount`)}
              className="form-input"
            />

            <button type="button" onClick={() => removeSponsored(index)}>
              Remove Sponsored
            </button>
          </div>
        ))}

        <button type="button" onClick={() => appendSponsored({})}>
          Add Sponsored
        </button>

        <div>
          <h1>RP6: Citations</h1>
          <label className="form-label">
            Number of citations in the previous calendar year
          </label>
          <input
            type="text"
            {...register(`citations.number`)}
            className="form-input"
          />
        </div>

        <h1>RP7: Development</h1>
        {developmentFields.map((field, index) => (
          <div key={field.id}>
            <h3>Development #{index + 1}</h3>
            <label className="form-label">Title</label>
            <input
              type="text"
              {...register(`development[${index}].title`)}
              className="form-input"
            />

            <label className="form-label">Organization</label>
            <input
              type="text"
              {...register(`development[${index}].organization`)}
              className="form-input"
            />

            <label className="form-label">Dates</label>
            <input
              type="text"
              {...register(`development[${index}].dates`)}
              className="form-input"
            />

            <label className="form-label">Days</label>
            <input
              type="text"
              {...register(`development[${index}].days`)}
              className="form-input"
            />

            <button type="button" onClick={() => removeDevelopment(index)}>
              Remove Development
            </button>
          </div>
        ))}

        <button type="button" onClick={() => appendDevelopment({})}>
          Add Development
        </button>

        <h1>RP8: Soft/Hard Dev</h1>
        {soft_hard_devFields.map((field, index) => (
          <div key={field.id}>
            <h3>Soft/Hard Dev #{index + 1}</h3>
            <label className="form-label">Type</label>
            <input
              type="text"
              {...register(`soft_hard_dev[${index}].type`)}
              className="form-input"
            />

            <label className="form-label">Model</label>
            <input
              type="text"
              {...register(`soft_hard_dev[${index}].model`)}
              className="form-input"
            />

            <label className="form-label">Details</label>
            <input
              type="text"
              {...register(`soft_hard_dev[${index}].details`)}
              className="form-input"
            />

            <button type="button" onClick={() => removeSoftHardDev(index)}>
              Remove Soft/Hard Dev
            </button>
          </div>
        ))}

        <button type="button" onClick={() => appendSoftHardDev({})}>
          Add Soft/Hard Dev
        </button>

        <h1>RP9: Extras</h1>
        {extrasFields.map((field, index) => (
          <div key={field.id}>
            <h3>Extra #{index + 1}</h3>
            <label className="form-label">Date</label>
            <input
              type="text"
              {...register(`extras[${index}].date`)}
              className="form-input"
            />

            <label className="form-label">Details</label>
            <input
              type="text"
              {...register(`extras[${index}].details`)}
              className="form-input"
            />

            <button type="button" onClick={() => removeExtras(index)}>
              Remove Extra
            </button>
          </div>
        ))}

        <button type="button" onClick={() => appendExtras({})}>
          Add Extra
        </button>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default StepTwo;
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "../styles/Appraisal2.css";

function StepTwo() {
  const [dimension2, setDimension2] = useState([{}]);
  const { register, control, handleSubmit, setValue } = useForm();
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
    name: "RP3.sponsored",
  });
  const {
    fields: citationsFields,
    append: appendCitations,
    remove: removeCitations,
  } = useFieldArray({
    control,
    name: "RP4.citations",
  });
  const {
    fields: developmentFields,
    append: appendDevelopment,
    remove: removeDevelopment,
  } = useFieldArray({
    control,
    name: "RP5.development",
  });
  const {
    fields: soft_hard_devFields,
    append: appendSoftHardDev,
    remove: removeSoftHardDev,
  } = useFieldArray({
    control,
    name: "RP6.soft_hard_dev",
  });
  const {
    fields: extrasFields,
    append: appendExtras,
    remove: removeExtras,
  } = useFieldArray({
    control,
    name: 'RP7.extras',
  });


  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem('dim2Data', JSON.stringify(data));
    setDimension2(data);
  };

  useEffect(() => {
    console.log("dimension2=", dimension2);
  }, [dimension2]);

  useEffect(() => {
    const storedData = localStorage.getItem('dim2Data');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, []);

  return (
    <>
      <h1>RP1: Publications</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {paperFields.map((field, index) => (
          <div key={field.id}>
            <h3>Paper #{index + 1}</h3>
            <label className="form-label">
              Title
              <input
                {...register(`RP1.papers[${index}].title`)}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Journal
              <input
                {...register(`RP1.papers[${index}].journal`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Author
              <input
                {...register(`RP1.papers[${index}].author`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Publisher
              <input
                {...register(`RP1.papers[${index}].publisher`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Paper Link
              <input
                {...register(`RP1.papers[${index}].paperLink`)}
                className="form-input"
              />
            </label>

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
            <label className="form-label">Patent Obtained {index + 1}
              <input
                type="text"
                {...register(`RP2.patents[${index}].name`)}
                className="form-input"
              />
            </label>
            <label className="form-label">Patent details
              <input
                type="text"
                {...register(`RP2.patents[${index}].details`)}
                className="form-input"
              />
            </label>

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
            <label className="form-label">Title
              <input
                type="text"
                {...register(`RP2.books[${index}].title`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Author
              <input
                type="text"
                {...register(`RP2.books[${index}].author`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Publisher
              <input
                type="text"
                {...register(`RP2.books[${index}].publisher`)}
                className="form-input"
              />
            </label>

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
            <label className="form-label">Name
              <input
                type="text"
                {...register(`RP2.moocs[${index}].name`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Duration
              <input
                type="text"
                {...register(`RP2.moocs[${index}].duration`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Details
              <input
                type="text"
                {...register(`RP2.moocs[${index}].details`)}
                className="form-input"
              />
            </label>

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
            <label className="form-label">Date
              <input
                type="text"
                {...register(`RP3.sponsored[${index}].date`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Title
              <input
                type="text"
                {...register(`RP3.sponsored[${index}].title`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Agency
              <input
                type="text"
                {...register(`RP3.sponsored[${index}].agency`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Details
              <input
                type="text"
                {...register(`RP3.sponsored[${index}].details`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Amount
              <input
                type="text"
                {...register(`RP3.sponsored[${index}].amount`)}
                className="form-input"
              />
            </label>

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
            <input
              type="text"
              {...register(`RP4.citations.number`)}
              className="form-input"
            />
          </label>
        </div>

        <h1>RP7: Development</h1>
        {developmentFields.map((field, index) => (
          <div key={field.id}>
            <h3>Development #{index + 1}</h3>
            <label className="form-label">Title
              <input
                type="text"
                {...register(`RP5.development[${index}].title`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Organization
              <input
                type="text"
                {...register(`RP5.development[${index}].organization`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Dates
              <input
                type="text"
                {...register(`RP5.development[${index}].dates`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Days
              <input
                type="text"
                {...register(`RP5.development[${index}].days`)}
                className="form-input"
              />
            </label>

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
            <label className="form-label">Type
              <input
                type="text"
                {...register(`RP6.soft_hard_dev[${index}].type`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Model
              <input
                type="text"
                {...register(`RP6.soft_hard_dev[${index}].model`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Details
              <input
                type="text"
                {...register(`RP6.soft_hard_dev[${index}].details`)}
                className="form-input"
              />
            </label>

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
            <label className="form-label">Date
              <input
                type="text"
                {...register(`RP7.extras[${index}].date`)}
                className="form-input"
              />
            </label>

            <label className="form-label">Details
              <input
                type="text"
                {...register(`RP7.extras[${index}].details`)}
                className="form-input"
              />
            </label>

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
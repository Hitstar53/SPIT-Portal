import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";

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
    name: "RP7.extras",
  });

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("dim2Data", JSON.stringify(data));
    setDimension2(data);
  };

  useEffect(() => {
    console.log("dimension2=", dimension2);
  }, [dimension2]);

  useEffect(() => {
    const storedData = localStorage.getItem("dim2Data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>RP1: Publications</h1>

        <Table striped bordered>
          <thead>
            <tr>
              <th>Paper Title</th>
              <th>Journal/ Conference Name</th>
              <th>Authors</th>
              <th>Publisher</th>
              <th>Paper Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paperFields.map((field, index) => (
              <tr key={field.id}>
                {/* <div key={field.id}> */}
                <td className="text-center align-middle">
                  <label className="form-label">
                    <input
                      {...register(`RP1.papers[${index}].title`)}
                      className="form-input"
                    />
                  </label>
                </td>
                <td className="text-center align-middle">
                  <label className="form-label">
                    <input
                      {...register(`RP1.papers[${index}].journal`)}
                      className="form-input"
                    />
                  </label>
                </td>

                <td className="text-center align-middle">
                  <label className="form-label">
                    <input
                      {...register(`RP1.papers[${index}].author`)}
                      className="form-input"
                    />
                  </label>
                </td>

                <td className="text-center align-middle">
                  <label className="form-label">
                    <input
                      {...register(`RP1.papers[${index}].publisher`)}
                      className="form-input"
                    />
                  </label>
                </td>

                <td className="text-center align-middle">
                  <label className="form-label">
                    <input
                      {...register(`RP1.papers[${index}].paperLink`)}
                      className="form-input"
                    />
                  </label>
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removePaper(index)}>
                    <DeleteIcon sx={{ color: "red", fontSize: "2rem" }} />
                  </button>
                </td>
                {/* </div> */}
              </tr>
            ))}
          </tbody>
        </Table>

        <button
          className="btn btn-success"
          type="button"
          onClick={() => appendPaper({})}
          style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
        >
          Add Paper
        </button>

        <h1> RP 2: -Patent/books/Monograms/ MOOC (30 marks)</h1>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Patent Obtained</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patentFields.map((field, index) => (
              <tr key={field.id}>
                <td>
                  <label className="form-label">
                    <input
                      type="text"
                      {...register(`RP2.patents[${index}].name`)}
                      className="form-input"
                    />
                  </label>
                </td>
                <td>
                  <label className="form-label">
                    <input
                      type="text"
                      {...register(`RP2.patents[${index}].details`)}
                      className="form-input"
                    />
                  </label>
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removePatent(index)}>
                    <DeleteIcon sx={{ color: "red", fontSize: "2rem" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <button
          className="btn btn-success"
          type="button"
          onClick={() => appendPatent({})}
          style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
        >
          Add Patent
        </button>

        <Table striped bordered>
          <thead>
            <tr>
              <th>Books published</th>
              <th>Authors</th>
              <th>Publisher</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookFields.map((field, index) => (
              <tr key={field.id}>
                <td>
                  <label className="form-label">
                    <input
                      type="text"
                      {...register(`RP2.books[${index}].title`)}
                      className="form-input"
                    />
                  </label>
                </td>
                <td>
                  <label className="form-label">
                    <input
                      type="text"
                      {...register(`RP2.books[${index}].author`)}
                      className="form-input"
                    />
                  </label>
                </td>
                <td>
                  <label className="form-label">
                    <input
                      type="text"
                      {...register(`RP2.books[${index}].publisher`)}
                      className="form-input"
                    />
                  </label>
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removeBook(index)}>
                    <DeleteIcon sx={{ color: "red", fontSize: "2rem" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        <button
          className="btn btn-success"
          type="button"
          onClick={() => appendBook({})}
          style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
        >
          Add Book
        </button>

        <Table striped bordered>
          <thead>
            <tr>
              <th>Books published</th>
              <th>Authors</th>
              <th>Publisher</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        {moocFields.map((field, index) => (
          <tr key={field.id}>
            <td>
            <label className="form-label">
              Name
              <input
                type="text"
                {...register(`RP2.moocs[${index}].name`)}
                className="form-input"
              />
            </label>
            </td>

            <td>
            <label className="form-label">
              Duration
              <input
                type="text"
                {...register(`RP2.moocs[${index}].duration`)}
                className="form-input"
              />
            </label>
            </td>

            <td>
            <label className="form-label">
              Details
              <input
                type="text"
                {...register(`RP2.moocs[${index}].details`)}
                className="form-input"
              />
            </label>
            </td>
            <td className="text-center align-middle">
                  <button type="button" onClick={() => removeMOOC(index)}>
                    <DeleteIcon sx={{ color: "red", fontSize: "2rem" }} />
                  </button>
                </td>
          </tr>
        ))}
        </tbody>
        </Table>

        <button
          className="btn btn-success"
          type="button"
          onClick={() => appendMOOC({})}
          style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
        >
          Add MOOC
        </button>

        <h1>RP3: Sponsored Research and Consultancy</h1>
        {sponsoredFields.map((field, index) => (
          <div key={field.id}>
            <h3>Sponsored #{index + 1}</h3>
            <label className="form-label">
              Date
              <input
                type="text"
                {...register(`RP3.sponsored[${index}].date`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Title
              <input
                type="text"
                {...register(`RP3.sponsored[${index}].title`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Agency
              <input
                type="text"
                {...register(`RP3.sponsored[${index}].agency`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Details
              <input
                type="text"
                {...register(`RP3.sponsored[${index}].details`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Amount
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
        <button
          className="btn btn-success"
          type="button"
          onClick={() => appendSponsored({})}
          style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
        >
          Add Sponsored
        </button>

        <div>
          <h1>RP4: Citations</h1>
          <label className="form-label">
            Number of citations in the previous calendar year
            <input
              type="text"
              {...register(`RP4.citations.number`)}
              className="form-input"
            />
          </label>
        </div>

        <h1>RP5: Self Development</h1>
        {developmentFields.map((field, index) => (
          <div key={field.id}>
            <h3>Development #{index + 1}</h3>
            <label className="form-label">
              Title
              <input
                type="text"
                {...register(`RP5.development[${index}].title`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Organization
              <input
                type="text"
                {...register(`RP5.development[${index}].organization`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Dates
              <input
                type="text"
                {...register(`RP5.development[${index}].dates`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Days
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

        <button
          className="btn btn-success"
          type="button"
          onClick={() => appendDevelopment({})}
          style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
        >
          Add Development
        </button>

        <h1>RP6: New Software development / Hardware lab setup development</h1>
        {soft_hard_devFields.map((field, index) => (
          <div key={field.id}>
            <h3>Soft/Hard Dev #{index + 1}</h3>
            <label className="form-label">
              Type
              <input
                type="text"
                {...register(`RP6.soft_hard_dev[${index}].type`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Model
              <input
                type="text"
                {...register(`RP6.soft_hard_dev[${index}].model`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Details
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

        <button
          className="btn btn-success"
          type="button"
          onClick={() => appendSoftHardDev({})}
          style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
        >
          Add Soft/Hard Dev
        </button>

        <h1>RP7: Any activity not covered.</h1>
        {extrasFields.map((field, index) => (
          <div key={field.id}>
            <h3>Extra #{index + 1}</h3>
            <label className="form-label">
              Date
              <input
                type="text"
                {...register(`RP7.extras[${index}].date`)}
                className="form-input"
              />
            </label>

            <label className="form-label">
              Details
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

        <button
          className="btn btn-success"
          type="button"
          onClick={() => appendExtras({})}
          style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
        >
          Add Extra
        </button>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default StepTwo;

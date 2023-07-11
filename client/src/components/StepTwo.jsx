import React, { useEffect, useState, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

function StepTwo({ setDimension2, yr }) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const { register, control, handleSubmit, setValue, getValues, reset } =
    useForm({
      defaultValues: JSON.parse(localStorage.getItem("dim2Data")) || {},
    });

  useEffect(() => {
    toast.info('Please Save Changes Before Leaving!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    const getData = async () => {
      await axios
        .post("http://localhost:5000/api/faculty/appraisal/get/dim2", {
          name: user.fullName,
          yearofAssesment: yr,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("dim2Data", JSON.stringify(res.data));
          reset(JSON.parse(localStorage.getItem("dim2Data")));
          const storedData = localStorage.getItem("dim2Data");
          console.log(storedData);
          if (storedData) {
            Object.keys(JSON.parse(storedData)).map((key) => {
              setValue(key, JSON.parse(storedData)[key]);
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

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
    name: "RP4",
  });
  const {
    fields: developmentFields,
    append: appendDevelopment,
    remove: removeDevelopment,
  } = useFieldArray({
    control,
    name: "RP5.selfDevelopment",
  });
  const {
    fields: soft_hard_devFields,
    append: appendSoftHardDev,
    remove: removeSoftHardDev,
  } = useFieldArray({
    control,
    name: "RP6.softHardDev",
  });
  const {
    fields: extrasFields,
    append: appendExtras,
    remove: removeExtras,
  } = useFieldArray({
    control,
    name: "RP7.activityNotCovered",
  });

  const onSubmit = async (data) => {
    console.log(data);
    setDimension2(data);
    localStorage.setItem("dim2Data", JSON.stringify(data));
    axios
      .post("http://localhost:5000/api/faculty/appraisal/dim2", {
        yearofAssesment: yr,
        faculty: user,
        Dimension2: data,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Step Two Saved", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // toast.success("Form submitted successfully!");
    // await sendToServer()
  };

  // useEffect(() => {
  //   console.log("changed");
  //   localStorage.setItem("dim2Data", JSON.stringify(getValues()));
  //   setDimension2(getValues());
  // }, [paperFields]);

  // useEffect(() => {
  //   console.log("dimension2=", dimension2);
  // }, [dimension2]);

  return (
    <>
      {loading ? (
        <CircularProgress color="success" />
      ) : (
        <>
          <form className="stepTwo" onSubmit={handleSubmit(onSubmit)}>
            <h1>RP1: Publications</h1>

            {paperFields.length > 0 && (
              <Table striped bordered>
                <thead>
                  <tr>
                    <th className='table-header text-center align-middle'>Paper Title</th>
                    <th className='table-header text-center align-middle'>Journal/ Conference Name</th>
                    <th className='table-header text-center align-middle'>Type</th>
                    <th className='table-header text-center align-middle'>Authors</th>
                    <th className='table-header text-center align-middle'>Publisher</th>
                    <th className='table-header text-center align-middle'>Reputation</th>
                    <th className='table-header text-center align-middle'>Paper Link</th>
                    <th className='table-header text-center align-middle'></th>
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
                            {...register(
                              `RP1.papers[${index}].conferenceOrJournal.name`
                            )}
                            className="form-input"
                          />
                        </label>
                      </td>
                      <td>
                        <select
                          {...register(
                            `RP1.papers[${index}].conferenceOrJournal.type`
                          )}
                        >
                          <option value="Conference">Conference</option>
                          <option value="Journal">Journal</option>
                        </select>
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
                      <td>
                        <select
                          {...register(
                            `RP1.papers[${index}].conferenceOrJournal.reputation`
                          )}
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="None ">None </option>
                        </select>
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
                        <button
                          type="button"
                          onClick={() => {
                            removePaper(index);
                          }}
                        >
                          <DeleteIcon sx={{ color: "red", fontSize: "25px" }} />
                        </button>
                      </td>
                      {/* </div> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <button
              className="add-btn"
              type="button"
              onClick={() => appendPaper({})}
              // style={{
              //   padding: "10px 25px",
              //   borderRadius: "10px",
              //   margin: "0px",
              // }}
            >
              Add Paper
            </button>

            <h1> RP 2: Patent/books/Monograms/ MOOC (30 marks)</h1>
            {patentFields.length > 0 && (
              <Table striped bordered>
                <thead>
                  <tr>
                    <th className='table-header text-center align-middle'>Patent Obtained</th>
                    <th className='table-header text-center align-middle'>Details</th>
                    <th className='table-header text-center align-middle'>Status</th>
                    <th className='table-header text-center align-middle'></th>
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
                      <td>
                        <select {...register(`RP2.patents[${index}].status`)}>
                          <option value="Obtained">Obtained</option>
                          <option value="Published">Published</option>
                        </select>
                      </td>
                      <td className="text-center align-middle">
                        <button
                          type="button"
                          onClick={() => removePatent(index)}
                        >
                          <DeleteIcon sx={{ color: "red", fontSize: "25px" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <button
              className="add-btn"
              type="button"
              onClick={() => appendPatent({})}
              // style={{
              //   padding: "10px 25px",
              //   borderRadius: "10px",
              //   margin: "0px",
              // }}
            >
              Add Patent
            </button>

            {bookFields.length > 0 && (
              <Table striped bordered>
                <thead>
                  <tr>
                    <th className='table-header text-center align-middle'>Books published</th>
                    <th className='table-header text-center align-middle'>Authors</th>
                    <th className='table-header text-center align-middle'>Publisher</th>
                    <th className='table-header text-center align-middle'>Status</th>
                    <th className='table-header text-center align-middle'></th>
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
                      <td>
                        <select {...register(`RP2.books[${index}].status`)}>
                          <option value="Published">Published</option>
                          <option value="Book Chapter/Monograms/Copyright">
                            Book Chapter/Monograms/Copyright
                          </option>
                        </select>
                      </td>
                      <td className="text-center align-middle">
                        <button type="button" onClick={() => removeBook(index)}>
                          <DeleteIcon sx={{ color: "red", fontSize: "25px" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <button
              className="add-btn"
              type="button"
              onClick={() => appendBook({})}
              // style={{
              //   padding: "10px 25px",
              //   borderRadius: "10px",
              //   margin: "0px",
              // }}
            >
              Add Book
            </button>

            {moocFields.length > 0 && (
              <Table striped bordered>
                <thead>
                  <tr>
                    <th className='table-header text-center align-middle'>MOOC’s attended</th>
                    <th className='table-header text-center align-middle'>Duration (days/weeks)</th>
                    <th className='table-header text-center align-middle'>Details (Grade,certificate etc)</th>
                    <th className='table-header text-center align-middle'></th>
                  </tr>
                </thead>
                <tbody>
                  {moocFields.map((field, index) => (
                    <tr key={field.id}>
                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(`RP2.moocs[${index}].name`)}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="number"
                  onWheel={(e) => e.target.blur()}
                            {...register(`RP2.moocs[${index}].duration`)}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(`RP2.moocs[${index}].details`)}
                            className="form-input"
                          />
                        </label>
                      </td>
                      <td className="text-center align-middle">
                        <button type="button" onClick={() => removeMOOC(index)}>
                          <DeleteIcon sx={{ color: "red", fontSize: "25px" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <button
              className="add-btn"
              type="button"
              onClick={() => appendMOOC({})}
              // style={{
              //   padding: "10px 25px",
              //   borderRadius: "10px",
              //   margin: "0px",
              // }}
            >
              Add MOOC
            </button>

            <h1>RP3: Sponsored Research and Consultancy</h1>
            {sponsoredFields.length > 0 && (
              <Table striped bordered>
                <thead>
                  <tr>
                    <th className='table-header text-center align-middle'>Date</th>
                    <th className='table-header text-center align-middle'>Project Title/Consultancy</th>
                    <th className='table-header text-center align-middle'>Sponsoring Agency/Consultant</th>
                    <th className='table-header text-center align-middle'>Details (Govt/ Non-Govt)</th>
                    <th className='table-header text-center align-middle'>Funded Amount</th>
                    <th className='table-header text-center align-middle'>Status</th>
                    <th className='table-header text-center align-middle'></th>
                  </tr>
                </thead>
                <tbody>
                  {sponsoredFields.map((field, index) => (
                    <tr key={field.id}>
                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(`RP3.sponsored[${index}].date`)}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(`RP3.sponsored[${index}].title`)}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(`RP3.sponsored[${index}].agency`)}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(`RP3.sponsored[${index}].details`)}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="number"
                  onWheel={(e) => e.target.blur()}
                            {...register(`RP3.sponsored[${index}].amount`)}
                            className="form-input"
                          />
                        </label>
                      </td>
                      <td>
                        <select {...register(`RP3.sponsored[${index}].status`)}>
                          <option value="Submitted">Submitted</option>
                          <option value="Submitted and Approved">
                            Submitted and Approved
                          </option>
                        </select>
                      </td>
                      <td className="text-center align-middle">
                        <button
                          type="button"
                          onClick={() => removeSponsored(index)}
                        >
                          <DeleteIcon sx={{ color: "red", fontSize: "25px" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <button
              className="add-btn"
              type="button"
              onClick={() => appendSponsored({})}
              // style={{
              //   padding: "10px 25px",
              //   borderRadius: "10px",
              //   margin: "0px",
              // }}
            >
              Add Sponsored
            </button>

            <div>
              <h1>RP4: Citations</h1>
              <label className="form-label">
                Number of citations in the previous calendar year:
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  {...register(`RP4.number`)}
                  className="form-input citation"
                />
              </label>
            </div>

            <h1>RP5: Self Development</h1>
            {developmentFields.length > 0 && (
              <Table striped bordered>
                <thead>
                  <tr>
                    <th className='table-header text-center align-middle'>Type</th>
                    <th className='table-header text-center align-middle'>STTP/FDP/MOOC Courses/Industry Internship Title</th>
                    <th className='table-header text-center align-middle'>Organization details </th>
                    <th className='table-header text-center align-middle'>Dates</th>
                    <th className='table-header text-center align-middle'>No. of days Participation</th>
                    <th className='table-header text-center align-middle'></th>
                  </tr>
                </thead>
                <tbody>
                  {developmentFields.map((field, index) => (
                    <tr key={field.id}>
                      <td>
                        <select
                          {...register(`RP5.selfDevelopment[${index}].type`)}
                        >
                          <option value="STTP">STTP</option>
                          <option value="FDP">FDP</option>
                          <option value="MOOC">MOOC</option>
                          <option value="Industry_Internship">
                            Industry Internship
                          </option>
                        </select>
                      </td>
                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(`RP5.selfDevelopment[${index}].title`)}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(
                              `RP5.selfDevelopment[${index}].organization`
                            )}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(`RP5.selfDevelopment[${index}].dates`)}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="number"
                  onWheel={(e) => e.target.blur()}
                            {...register(
                              `RP5.selfDevelopment[${index}].duration`
                            )}
                            className="form-input"
                          />
                        </label>
                      </td>
                      <td className="text-center align-middle">
                        <button
                          type="button"
                          onClick={() => removeDevelopment(index)}
                        >
                          <DeleteIcon sx={{ color: "red", fontSize: "25px" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <button
              className="add-btn"
              type="button"
              onClick={() => appendDevelopment({})}
              // style={{
              //   padding: "10px 25px",
              //   borderRadius: "10px",
              //   margin: "0px",
              // }}
            >
              Add Development
            </button>

            <h1>
              RP6: New Software development / Hardware lab setup development
            </h1>
            {soft_hard_devFields.length > 0 && (
              <Table striped bordered>
                <thead>
                  <tr>
                    <th className='table-header text-center align-middle'>Software Developed /Hardware lab setup</th>
                    <th className='table-header text-center align-middle'>Model/ Portal</th>
                    <th className='table-header text-center align-middle'>Details of the setup</th>
                    <th className='table-header text-center align-middle'></th>
                  </tr>
                </thead>
                <tbody>
                  {soft_hard_devFields.map((field, index) => (
                    <tr key={field.id}>
                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(`RP6.softHardDev[${index}].type`)}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(`RP6.softHardDev[${index}].model`)}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(`RP6.softHardDev[${index}].details`)}
                            className="form-input"
                          />
                        </label>
                      </td>
                      <td className="text-center align-middle">
                        <button
                          type="button"
                          onClick={() => removeSoftHardDev(index)}
                        >
                          <DeleteIcon sx={{ color: "red", fontSize: "25px" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <button
              className="add-btn"
              type="button"
              onClick={() => appendSoftHardDev({})}
              // style={{
              //   padding: "10px 25px",
              //   borderRadius: "10px",
              //   margin: "0px",
              // }}
            >
              Add Soft/Hard Dev
            </button>

            <h1>RP7: Any activity not covered.</h1>
            {extrasFields.length > 0 && (
              <Table striped bordered>
                <thead>
                  <tr>
                    <th className='table-header text-center align-middle'>Date</th>
                    <th className='table-header text-center align-middle'>
                      Details (Faculty claim needs to be approved by HOD /Senior
                      most faculty)
                    </th>
                    <th className='table-header text-center align-middle'></th>
                  </tr>
                </thead>
                <tbody>
                  {extrasFields.map((field, index) => (
                    <tr key={field.id}>
                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(
                              `RP7.activityNotCovered[${index}].date`
                            )}
                            className="form-input"
                          />
                        </label>
                      </td>

                      <td>
                        <label className="form-label">
                          <input
                            type="text"
                            {...register(
                              `RP7.activityNotCovered[${index}].details`
                            )}
                            className="form-input"
                          />
                        </label>
                      </td>
                      <td className="text-center align-middle">
                        <button
                          type="button"
                          onClick={() => removeExtras(index)}
                        >
                          <DeleteIcon sx={{ color: "red", fontSize: "25px" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <button
              className="add-btn"
              type="button"
              onClick={() => appendExtras({})}
              // style={{
              //   padding: "10px 25px",
              //   borderRadius: "10px",
              //   margin: "0px",
              // }}
            >
              Add Extra
            </button>

            {/* <input
        className="btn btn-primary"
        type="submit"
        value="Save Changes"
        style={{ display: "block", width: "100px" }}
      /> */}
      <div className="center">

            <button
              className="save-btn"
              type="submit"
            >
              Save Changes
            </button>
      </div>
          </form>
        </>
      )}
    </>
  );
}

export default StepTwo;

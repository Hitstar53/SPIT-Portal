import React, { useEffect, useState, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UserContext } from '../context/UserContext';
import { ip1, ip2, dp1 } from "../data/Dim3";
import "../styles/Appraisal3.css";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';

function StepThree({setDimension3, yr}) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true)
  const { register, control, handleSubmit, setValue, reset } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("dim3Data")) || {},
  });

  useEffect(() => {
    const getData = async () => {
      await axios.post('http://localhost:5000/api/faculty/appraisal/get/dim3',
        { name: user.fullName, yearofAssesment: yr }
      ).then((res) => {
        console.log(res.data)
        localStorage.setItem("dim3Data", JSON.stringify(res.data))
        reset(JSON.parse(localStorage.getItem("dim3Data")))
        const storedData = localStorage.getItem("dim3Data")
        console.log(storedData)
        if(storedData) {
          Object.keys(JSON.parse(storedData)).map((key) => {
            setValue(key, JSON.parse(storedData)[key])
          })
        }
        setLoading(false)
      }).catch((err) => {
        console.log(err)
      })
    }
    getData()
  }, []);


  const {
    fields: organizedFields,
    append: appendOrganized,
    remove: removeOrganized,
  } = useFieldArray({
    control,
    name: "OP1.organized",
  });
  const {
    fields: invitedFields,
    append: appendInvited,
    remove: removeInvited,
  } = useFieldArray({
    control,
    name: "Invited.invitedAt",
  });
  const {
    fields: committeeFields,
    append: appendCommittee,
    remove: removeCommittee,
  } = useFieldArray({
    control,
    name: "Partof.committee",
  });
  const {
    fields: articleFields,
    append: appendArticle,
    remove: removeArticle,
  } = useFieldArray({
    control,
    name: "Article.articleDetails",
  });
  const {
    fields: coGuideFields,
    append: appendCoGuide,
    remove: removeCoGuide,
  } = useFieldArray({
    control,
    name: "coGuide.data",
  });
  const {
    fields: collaborationFields,
    append: appendCollaboration,
    remove: removeCollaboration,
  } = useFieldArray({
    control,
    name: "collaboration.institutionDetails",
  });

  const onSubmit = (data) => {
    console.log(data);
    setDimension3(data)
    localStorage.setItem('dim3Data', JSON.stringify(data));
    axios.post('http://localhost:5000/api/faculty/appraisal/dim3',
      { yearofAssesment: yr, faculty: user, Dimension3: data }
    ).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
    toast.success('Form submitted successfully!');
  };



  // useEffect(() => {
  //   console.log(dimension3);
  // }, [dimension3]);


  

  return (
    <>
    {loading ? <CircularProgress color="success"/> : 
    (
      <form className="stepThree" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="table-title">Administrative role executed</h2>
      <div className="dim3-table">
        <div className="tab">
          <h5 className="tb-title">IP1: Institute level assignments</h5>
          <div className="tab-title">
            <div
              className="form-input-title"
              style={{ border: "none", marginBottom: "0rem" }}
            >
              Role
            </div>
            <div
              className="form-input-title"
              style={{ border: "none", marginBottom: "0rem" }}
            >
              Tick
            </div>
          </div>
          {ip1.map((item, index) => (
            <div key={item}>
              <label className="tb-field">
                {item}
                <input
                  className="form-input-tb"
                  type="text"
                  defaultValue={item}
                  {...register(`IP1[${index}].role`)}
                  readOnly
                />
                <input
                  className="form-input-cb"
                  type="checkbox"
                  placeholder={item}
                  {...register(`IP1[${index}].tick`)}
                />
              </label>
            </div>
          ))}
        </div>

        <div className="tab">
          <h5 className="tb-title">IP2: Other Institute level assignments</h5>
          <div className="tab-title">
            <div
              className="form-input-title"
              style={{ border: "none", marginBottom: "0rem" }}
            >
              Role
            </div>
            <div
              className="form-input-title"
              style={{ border: "none", marginBottom: "0rem" }}
            >
              Tick
            </div>
          </div>
          {ip2.map((item, index) => (
            <div key={item}>
              <label className="tb-field">
                {item}
                <input
                  className="form-input-tb"
                  type="text"
                  defaultValue={item}
                  {...register(`IP2[${index}].role`)}
                  readOnly
                />
                <input
                  className="form-input-cb"
                  type="checkbox"
                  placeholder={item}
                  {...register(`IP2[${index}].tick`)}
                />
              </label>
            </div>
          ))}
        </div>

        <div className="tab">
          <h5 className="tb-title">DP1: Department level assignments</h5>
          <div className="tab-title">
            <div
              className="form-input-title"
              style={{ border: "none", marginBottom: "0rem" }}
            >
              Role
            </div>
            <div
              className="form-input-title"
              style={{ border: "none", marginBottom: "0rem" }}
            >
              Tick
            </div>
          </div>
          {dp1.map((item, index) => (
            <div key={item}>
              <label className="tb-field">
                {item}
                <input
                  className="form-input-tb"
                  type="text"
                  defaultValue={item}
                  {...register(`DP1[${index}].role`)}
                  readOnly
                />
                <input
                  className="form-input-cb"
                  type="checkbox"
                  placeholder={item}
                  {...register(`DP1[${index}].tick`)}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
      <h3>Organized</h3>
      {organizedFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>FDP/Training Organised(Name)</th>
              <th>Type</th>
              <th>Sponser name</th>
              <th>Funds</th>
              <th>No. of days</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {organizedFields.map((item, index) => (
              <tr key={item.id}>
                {/* <label className="form-label">Organised</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Organised"
                    className="form-input"
                    {...register(`OP1.organized[${index}].name`)}
                  />
                </td>
                {/* <label className="form-label">Agency</label> */}
                <td>
                  <select {...register(`OP1.organized[${index}].type`)}>
                    <option value="FDP">FDP</option>
                    <option value="Training Organised">
                      Training Organised
                    </option>
                  </select>
                </td>
                {/* <label className="form-label">Funds</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="sponsorer name"
                    className="form-input"
                    {...register(`OP1.organized[${index}].sponsorerName`)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Funds"
                    className="form-input"
                    {...register(`OP1.organized[${index}].fund`)}
                  />
                </td>
                {/* <label className="form-label">Days</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Days"
                    className="form-input"
                    {...register(`OP1.organized[${index}].days`)}
                  />
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removeOrganized(index)}>
                    <DeleteIcon sx={{ color: "red", fontSize: "2rem" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <button
        className="btn btn-success"
        type="button"
        onClick={() => appendOrganized({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Organized
      </button>

      {/* Invited */}
      <h3>Invited</h3>
      {invitedFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Industry/ Institution Name</th>
              <th>Dates</th>
              <th>Details (No. of participants, affiliation)</th>
              <th>Type</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invitedFields.map((item, index) => (
              <tr key={item.id}>
                {/* <label className="form-label">Name</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-input"
                    {...register(`Invited.invitedAt[${index}].industryName`)}
                  />
                </td>
                {/* <label className="form-label">Dates</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Dates"
                    className="form-input"
                    {...register(`Invited.invitedAt[${index}].dates`)}
                  />
                </td>
                {/* <label className="form-label">Details</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Details"
                    className="form-input"
                    {...register(`Invited.invitedAt[${index}].details`)}
                  />
                </td>
                <td>
                  <select {...register(`Invited.invitedAt[${index}].type`)}>
                    <option value="Guest Faculty">Guest Faculty</option>
                    <option value="Visiting Professor">
                      Visiting Professor
                    </option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Duration"
                    className="form-input"
                    {...register(`Invited.invitedAt[${index}].duration`)}
                  />
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removeInvited(index)}>
                    <DeleteIcon sx={{ color: "red", fontSize: "2rem" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <button
        className="btn btn-success"
        type="button"
        onClick={() => appendInvited({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Invited
      </button>

      {/* Selection Committee */}
      <h3>Selection Committee</h3>
      {committeeFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Name of selection committee</th>
              <th>Details (Nature of work)</th>
              <th>Organization</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {committeeFields.map((item, index) => (
              <tr key={item.id}>
                {/* <label className="form-label">Committee</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Committee"
                    className="form-input"
                    {...register(`Partof.committee[${index}].name`)}
                  />
                </td>
                {/* <label className="form-label">Details</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Details"
                    className="form-input"
                    {...register(`Partof.committee[${index}].details`)}
                  />
                </td>
                {/* <label className="form-label">Organization</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Organization"
                    className="form-input"
                    {...register(`Partof.committee[${index}].organization`)}
                  />
                </td>
                {/* <label className="form-label">Date</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Date"
                    className="form-input"
                    {...register(`Partof.committee[${index}].date`)}
                  />
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removeCommittee(index)}>
                    <DeleteIcon sx={{ color: "red", fontSize: "2rem" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <button
        className="btn btn-success"
        type="button"
        onClick={() => appendCommittee({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Selection Committee
      </button>

      {/* Article */}
      <h3>Article</h3>
      {articleFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articleFields.map((item, index) => (
              <tr key={item.id}>
                {/* <label className="form-label">Details</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Details"
                    className="form-input"
                    {...register(`Article.articleDetails[${index}].name`)}
                    />
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removeArticle(index)}>
                    <DeleteIcon sx={{ color: "red", fontSize: "2rem" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <button
        className="btn btn-success"
        type="button"
        onClick={() => appendArticle({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Article
      </button>

      {/* CoGuide */}
      <h3>CoGuide</h3>
      {coGuideFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Peer Institution Name</th>
              <th>Details (Program etc)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coGuideFields.map((item, index) => (
              <tr key={item.id}>
                {/* <label className="form-label">Institute</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Institute"
                    className="form-input"
                    {...register(`CoGuide[${index}].institutionName`)}
                  />
                </td>
                {/* <label className="form-label">Details</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Details"
                    className="form-input"
                    {...register(`CoGuide[${index}].details`)}
                  />
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removeCoGuide(index)}>
                    <DeleteIcon sx={{ color: "red", fontSize: "2rem" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <button
        className="btn btn-success"
        type="button"
        onClick={() => appendCoGuide({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add CoGuide
      </button>

      {/* Collaboration */}
      <h3>Collaboration</h3>
      {collaborationFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Industry/ Institution Name</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {collaborationFields.map((item, index) => (
              <tr key={item.id}>
                {/* <label className="form-label">Name</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-input"
                    {...register(`collaboration.institutionDetails[${index}].name`)}
                  />
                </td>
                {/* <label className="form-label">Details</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Details"
                    className="form-input"
                    {...register(`collaboration.institutionDetails[${index}].details`)}
                  />
                </td>
                <td className="text-center align-middle">
                  <button
                    type="button"
                    onClick={() => removeCollaboration(index)}
                  >
                    <DeleteIcon sx={{ color: "red", fontSize: "2rem" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <button
        className="btn btn-success"
        type="button"
        onClick={() => appendCollaboration({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Collaboration
      </button>

      <input
        className="btn btn-primary"
        type="submit"
        value="Save Changes"
        style={{ display: "block", width: "100px" }}
      />
    </form>
    )}
    </>
  );
}

export default StepThree;

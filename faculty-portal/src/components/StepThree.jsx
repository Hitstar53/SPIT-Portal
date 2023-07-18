import React, { useEffect, useState, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UserContext } from '../context/UserContext';
import { ip1, ip2, dp1 } from "../data/Dim3";
import "../styles/Appraisal3.css";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
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
    fields: receivedFDPFields,
    append: appendReceivedFDP,
    remove: removeReceivedFDP,
  } = useFieldArray({
    control,
    name: "op3.receivedFDP",
  });
  const {
    fields: invitedTalkFields,
    append: appendinvitedTalk,
    remove: removeinvitedTalk,
  } = useFieldArray({
    control,
    name: "op4.invidedTalk",
  });
  const {
    fields: dataFields,
    append: appendData,
    remove: removeData,
  } = useFieldArray({
    control,
    name: "ngo.data",
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
      toast.success('Step Three Saved!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }).catch((err) => {
      console.log(err)
    })
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
      <h1>Outreach Activities(40 Marks)</h1>
      <h1>OP1: Organized training for Industry/External learners</h1>
      {organizedFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th className='table-header text-center align-middle'>FDP/Training Organised(Name)</th>
              <th className='table-header text-center align-middle'>Type</th>
              <th className='table-header text-center align-middle'>Sponsering Agency</th>
              <th className='table-header text-center align-middle'>Funds</th>
              <th className='table-header text-center align-middle'>No. of days</th>
              <th className='table-header text-center align-middle'></th>
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
                    {...register(`op3.receivedFDP[${index}].name`)}
                  />
                </td>
                {/* <label className="form-label">Agency</label> */}
                <td>
                  <select {...register(`op3.receivedFDP[${index}].type`)}>
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
                    placeholder="Sponsering Agency"
                    className="form-input"
                    {...register(`op3.receivedFDP[${index}].sponsorerName`)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                  onWheel={(e) => e.target.blur()}
                    placeholder="Funds"
                    className="form-input"
                    {...register(`op3.receivedFDP[${index}].fund`)}
                  />
                </td>
                {/* <label className="form-label">Days</label> */}
                <td>
                  <input
                    type="number"
                  onWheel={(e) => e.target.blur()}
                    placeholder="Days"
                    className="form-input"
                    {...register(`op3.receivedFDP[${index}].days`)}
                  />
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removeOrganized(index)}>
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
        onClick={() => appendOrganized({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Organized
      </button>

      {/* Invited */}
      <h1>OP2: Invited as visiting /Guest faculty for delivering a course in industry/ institute of repute</h1>
      {invitedFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th className='table-header text-center align-middle'>Industry/ Institution Name</th>
              <th className='table-header text-center align-middle'>Dates</th>
              <th className='table-header text-center align-middle'>Details (No. of participants, affiliation)</th>
              <th className='table-header text-center align-middle'>Type</th>
              <th className='table-header text-center align-middle'>Duration (Days)</th>
              <th className='table-header text-center align-middle'></th>
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
                    type="number"
                  onWheel={(e) => e.target.blur()}
                    placeholder="Duration"
                    className="form-input"
                    {...register(`Invited.invitedAt[${index}].duration`)}
                  />
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removeInvited(index)}>
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
        onClick={() => appendInvited({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Invited
      </button>

      {/* Received Sponsored FDP */}
      <h1>OP3: Received Sponsored FDP</h1>
      {receivedFDPFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th className='table-header text-center align-middle'>FDP/Training Organised(Name)</th>
              <th className='table-header text-center align-middle'>Type</th>
              <th className='table-header text-center align-middle'>Sponsering Agency</th>
              <th className='table-header text-center align-middle'>Funded Amount</th>
              <th className='table-header text-center align-middle'>No. of days</th>
              <th className='table-header text-center align-middle'></th>
            </tr>
          </thead>
          <tbody>
            {receivedFDPFields.map((item, index) => (
              <tr key={item.id}>
                {/* <label className="form-label">Organised</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Organised"
                    className="form-input"
                    {...register(`op3.receivedFDP[${index}].name`)}
                  />
                </td>
                {/* <label className="form-label">Agency</label> */}
                <td>
                  <select {...register(`op3.receivedFDP[${index}].type`)}>
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
                    placeholder="Sponsering Agency"
                    className="form-input"
                    {...register(`op3.receivedFDP[${index}].sponsorerName`)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                  onWheel={(e) => e.target.blur()}
                    placeholder="Funds"
                    className="form-input"
                    {...register(`op3.receivedFDP[${index}].fund`)}
                  />
                </td>
                {/* <label className="form-label">Days</label> */}
                <td>
                  <input
                    type="number"
                  onWheel={(e) => e.target.blur()}
                    placeholder="Days"
                    className="form-input"
                    {...register(`op3.receivedFDP[${index}].days`)}
                  />
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removeReceivedFDP(index)}>
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
        onClick={() => appendReceivedFDP({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Sponsership
      </button>

      {/* Invited talk as Guest faculty */}
      <h1>OP4: Invited talk as Guest faculty</h1>
      {invitedTalkFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th className='table-header text-center align-middle'>Dates</th>
              <th className='table-header text-center align-middle'>Industry/ Institution Name</th>
              <th className='table-header text-center align-middle'>Details (Title , No. of participants, affiliation) etc</th>
              <th className='table-header text-center align-middle'></th>
            </tr>
          </thead>
          <tbody>
            {invitedTalkFields.map((item, index) => (
              <tr key={item.id}>
                {/* <label className="form-label">Organised</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Dates"
                    className="form-input"
                    {...register(`op4.invidedTalk[${index}].industryName`)}
                  />
                </td>
                {/* <label className="form-label">Funds</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Industry/ Institution Name"
                    className="form-input"
                    {...register(`op4.invidedTalk[${index}].dates`)}
                  />
                </td>
                {/* <label className="form-label">Funds</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Details"
                    className="form-input"
                    {...register(`op4.invidedTalk[${index}].details`)}
                  />
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removeinvitedTalk(index)}>
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
        onClick={() => appendinvitedTalk({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Talks
      </button>

      {/* Selection Committee */}
      <h1>OP5: Part of selection committee / inquiry/ academic audit / examiner panel/ 
		BOS /AC/LIC/ RRC meetings/ external Auditor
</h1>
      {committeeFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th className='table-header text-center align-middle'>Name of selection committee</th>
              <th className='table-header text-center align-middle'>Details (Nature of work)</th>
              <th className='table-header text-center align-middle'>Organization</th>
              <th className='table-header text-center align-middle'>Date</th>
              <th className='table-header text-center align-middle'></th>
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
        onClick={() => appendCommittee({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Selection Committee
      </button>

      {/* Article */}
      <h1>OP6: Article in media/ newspaper to boost Institution’s Image</h1>
      {articleFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th className='table-header text-center align-middle'>Details</th>
              <th className='table-header text-center align-middle'></th>
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
        onClick={() => appendArticle({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Article
      </button>

      {/* Article */}
      <h1>OP7: Any noteworthy work with NGO</h1>
      {dataFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th className='table-header text-center align-middle'>Details</th>
              <th className='table-header text-center align-middle'></th>
            </tr>
          </thead>
          <tbody>
            {dataFields.map((item, index) => (
              <tr key={item.id}>
                {/* <label className="form-label">Details</label> */}
                <td>
                  <input
                    type="text"
                    placeholder="Details"
                    className="form-input"
                    {...register(`ngo.data[${index}].details`)}
                    />
                </td>
                <td className="text-center align-middle">
                  <button type="button" onClick={() => removeData(index)}>
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
        onClick={() => appendData({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Work
      </button>

      {/* CoGuide */}
      <h1>OP8: Co-guide for student projects and dissertations in the peer institutions </h1>
      {coGuideFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th className='table-header text-center align-middle'>Peer Institution Name</th>
              <th className='table-header text-center align-middle'>Details (Program etc)</th>
              <th className='table-header text-center align-middle'></th>
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
        onClick={() => appendCoGuide({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add CoGuide
      </button>

      {/* Collaboration */}
      <h1>OP9: Any academic collaboration with the other institutions</h1>
      {collaborationFields.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th className='table-header text-center align-middle'>Industry/ Institution Name</th>
              <th className='table-header text-center align-middle'>Details</th>
              <th className='table-header text-center align-middle'></th>
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
        onClick={() => appendCollaboration({})}
        style={{ padding: "10px 25px", borderRadius: "10px", margin: "0px" }}
      >
        Add Collaboration
      </button>

      {/* <input
        className="btn btn-primary"
        type="submit"
        value="Save Changes"
        style={{ display: "block", width: "100px" }}
      /> */}
      <div className="center">

      <button className="save-btn" type="submit">
          Save Changes
          </button>
      </div>
    </form>
    )}
    </>
  );
}

export default StepThree;

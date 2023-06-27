import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ip1, ip2, dp1 } from "../data/Dim3";
import "../styles/Appraisal3.css";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";

function StepThree() {
  const [dimension3, setDimension3] = useState([{}]);
  const { register, control, handleSubmit } = useForm();
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
    name: "OP1.invited",
  });
  const {
    fields: committeeFields,
    append: appendCommittee,
    remove: removeCommittee,
  } = useFieldArray({
    control,
    name: "OP1.selectionCommittee",
  });
  const {
    fields: articleFields,
    append: appendArticle,
    remove: removeArticle,
  } = useFieldArray({
    control,
    name: "OP1.Article",
  });
  const {
    fields: coGuideFields,
    append: appendCoGuide,
    remove: removeCoGuide,
  } = useFieldArray({
    control,
    name: "OP1.CoGuide",
  });
  const {
    fields: collaborationFields,
    append: appendCollaboration,
    remove: removeCollaboration,
  } = useFieldArray({
    control,
    name: "OP1.collaboration",
  });

  const onSubmit = (data) => {
    console.log(data);
    setDimension3(data);
  };

  useEffect(() => {
    console.log(dimension3);
  }, [dimension3]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Table striped bordered>
        <thead>
          <tr>
            <th>FDP/Training Organised</th>
            <th>Sr. No.	FDP/Training Organised Sponsoring Agency	Funds	No. of days</th>
            <th>Funds</th>
            <th>No. of days</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {organizedFields.map((item, index) => (
            <tr key={item.id}>
              <label className="form-label">Organised</label>
              <input
                type="text"
                placeholder="Organised"
                className="form-input"
                {...register(`OP1.organized[${index}].organised`)}
              />
              <label className="form-label">Agency</label>
              <input
                type="text"
                placeholder="Agency"
                className="form-input"
                {...register(`OP1.organized[${index}].agency`)}
              />
              <label className="form-label">Funds</label>
              <input
                type="text"
                placeholder="Funds"
                className="form-input"
                {...register(`OP1.organized[${index}].funds`)}
              />
              <label className="form-label">Days</label>
              <input
                type="text"
                placeholder="Days"
                className="form-input"
                {...register(`OP1.organized[${index}].days`)}
              />
              <button type="button" onClick={() => removeOrganized(index)}>
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </Table>
      <button type="button" onClick={() => appendOrganized({})}>
        Add Organized
      </button>

      {/* Invited */}
      <h3>Invited</h3>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Industry/ Institution Name</th>
            <th>Dates</th>
            <th>Details (No. of participants, affiliation)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {invitedFields.map((item, index) => (
            <tr key={item.id}>
              <label className="form-label">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="form-input"
                {...register(`invited[${index}].name`)}
              />
              <label className="form-label">Dates</label>
              <input
                type="text"
                placeholder="Dates"
                className="form-input"
                {...register(`invited[${index}].dates`)}
              />
              <label className="form-label">Details</label>
              <input
                type="text"
                placeholder="Details"
                className="form-input"
                {...register(`invited[${index}].details`)}
              />
              <button type="button" onClick={() => removeInvited(index)}>
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </Table>
      <button type="button" onClick={() => appendInvited({})}>
        Add Invited
      </button>

      {/* Selection Committee */}
      <h3>Selection Committee</h3>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Part of any selection committee</th>
            <th>Details (Nature of work)</th>
            <th>Organization</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {committeeFields.map((item, index) => (
            <tr key={item.id}>
              <label className="form-label">Committee</label>
              <input
                type="text"
                placeholder="Committee"
                className="form-input"
                {...register(`selectionCommittee[${index}].committee`)}
              />
              <label className="form-label">Details</label>
              <input
                type="text"
                placeholder="Details"
                className="form-input"
                {...register(`selectionCommittee[${index}].details`)}
              />
              <label className="form-label">Organization</label>
              <input
                type="text"
                placeholder="Organization"
                className="form-input"
                {...register(`selectionCommittee[${index}].organization`)}
              />
              <label className="form-label">Date</label>
              <input
                type="text"
                placeholder="Date"
                className="form-input"
                {...register(`selectionCommittee[${index}].date`)}
              />
              <button type="button" onClick={() => removeCommittee(index)}>
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </Table>
      <button type="button" onClick={() => appendCommittee({})}>
        Add Selection Committee
      </button>

      {/* Article */}
      <h3>Article</h3>
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
              <label className="form-label">Details</label>
              <input
                type="text"
                placeholder="Details"
                className="form-input"
                {...register(`Article[${index}].details`)}
              />
              <button type="button" onClick={() => removeArticle(index)}>
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </Table>
      <button type="button" onClick={() => appendArticle({})}>
        Add Article
      </button>

      {/* CoGuide */}
      <h3>CoGuide</h3>
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
              <label className="form-label">Institute</label>
              <input
                type="text"
                placeholder="Institute"
                className="form-input"
                {...register(`CoGuide[${index}].institute`)}
              />
              <label className="form-label">Details</label>
              <input
                type="text"
                placeholder="Details"
                className="form-input"
                {...register(`CoGuide[${index}].details`)}
              />
              <button type="button" onClick={() => removeCoGuide(index)}>
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </Table>
      <button type="button" onClick={() => appendCoGuide({})}>
        Add CoGuide
      </button>

      {/* Collaboration */}
      <h3>Collaboration</h3>
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
              <label className="form-label">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="form-input"
                {...register(`collaboration[${index}].name`)}
              />
              <label className="form-label">Details</label>
              <input
                type="text"
                placeholder="Details"
                className="form-input"
                {...register(`collaboration[${index}].details`)}
              />
              <button type="button" onClick={() => removeCollaboration(index)}>
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </Table>
      <button type="button" onClick={() => appendCollaboration({})}>
        Add Collaboration
      </button>

      <button type="submit">Submit</button>
    </form>
  );
}

export default StepThree;

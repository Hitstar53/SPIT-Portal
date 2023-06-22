import React from "react";
import styles from "./EduCard.module.css";
import { useState } from "react";
import { TextField } from "@mui/material";
import { FaEdit, FaSave } from "react-icons/fa";
import { Fab, Box} from '@mui/material';


const EduCard = (props) => {
    const [edit, setEdit] = useState(false);
    const handleClickEdit = () => {
      if (!edit) {
        setEdit(true);
      } else {
        setEdit(false);
      }
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      setEdit(false);
    }
  const key = props.index;
  return (
    <Box component='form' onSubmit={handleSubmit} autoComplete="off" className={styles.card}>
      <div>
        <div className={styles.header}>
        <h3 className={styles.heading}>{props?.info?.edulevel} </h3>
        {!edit ? (
            <FaEdit onClick={handleClickEdit} className={styles.titleIcon} />
          ) : (
            <Fab
              type="submit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: "bold",
                borderRadius: "12px",
                backgroundColor: "var(--primary-color)",
                color: "var(--bg-color)",
                padding: "0.5rem 1rem",
                ":hover": {
                  backgroundColor: "var(--tertiary-color)",
                },
              }}
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
            >
              <FaSave />
              Save
            </Fab>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.twoCol} style={{display:'flex', alignItems:'center'}}>
            {!edit && (<p><label className={styles.label}>Institute:&nbsp;&nbsp;</label>{props?.info?.inst}</p>)}
            {edit && (
            <TextField
              id="outlined-required"
              label="Institute"
              type="text"
              name="inst"
              defaultValue={props?.info?.inst}
              onChange={props?.handleChange}
            />
          )}
          </div>
          {key === 0 && (
            <div className={styles.twoCol} style={{display:'flex', alignItems:'center'}}>
              {!edit && (<p><label>Degree:&nbsp;&nbsp;</label>{props?.info?.degree}</p>)}
            {edit && (
            <TextField
              id="outlined-required"
              label="Degree"
              type="text"
              name="degree"
              defaultValue={props?.info?.degree}
              onChange={props?.handleChange}
            />
          )}
            </div>
          )}
          {(key === 1 || key === 2) && (
            <div className={styles.twoCol} style={{display:'flex', alignItems:'center'}}>
              {!edit && (<p><label>Qualification:&nbsp;&nbsp;</label>{props.info.qualification}</p>)}
            {edit && (
            <TextField
              id="outlined-required"
              label="Qualification"
              type="text"
              name="qualification"
              defaultValue={props?.info?.qualification}
              onChange={props?.handleChange}
            />
          )}
            </div>
          )}
        </div>
        {key === 0 && (
          <div className={styles.row}>
            <div className={styles.threeCol} style={{display:'flex', alignItems:'center'}}>
              {!edit && (<p><label>Branch:&nbsp;&nbsp;</label>{props?.info?.branch}</p>)}
            {edit && (
            <TextField
              id="outlined-required"
              label="Branch"
              type="text"
              name="branch"
              defaultValue={props?.info?.branch}
              onChange={props?.handleChange}
            />
          )}
            </div>
            <div className={styles.threeCol} style={{display:'flex', alignItems:'center'}}>
              {!edit && (<p><label>Division:&nbsp;&nbsp;</label>{props?.info?.div}</p>)}
            {edit && (
            <TextField
              id="outlined-required"
              label="Division"
              type="text"
              name="div"
              defaultValue={props?.info?.div}
              onChange={props?.handleChange}
            />
          )}
            </div>
            <div className={styles.threeCol} style={{display:'flex', alignItems:'center'}}>
              {!edit && (<p><label>Semester:&nbsp;&nbsp;</label>{props?.info?.sem}</p>)}
            {edit && (
            <TextField
              id="outlined-required"
              label="Semester"
              type="text"
              name="sem"
              defaultValue={props?.info?.sem}
              onChange={props?.handleChange}
            />
          )}
            </div>
          </div>
        )}
        <div className={styles.row}>
          {key === 0 && (
            <div className={styles.threeCol} style={{display:'flex', alignItems:'center'}}>
              {!edit && (<p><label>Admission Year:&nbsp;&nbsp;</label>{props?.info?.admyear}</p>)}
            {edit && (
            <TextField
              id="outlined-required"
              label="Admission Year"
              type="text"
              name="admyear"
              defaultValue={props?.info?.admyear}
              onChange={props?.handleChange}
            />
          )}
            </div>
          )}
          <div className={styles.threeCol} style={{display:'flex', alignItems:'center'}}>
            {!edit && (<p><label>Passing Year:&nbsp;&nbsp;</label>{props?.info?.passyear}</p>)}
            {edit && (
            <TextField
              id="outlined-required"
              label="Passing Year"
              type="text"
              name= "passyear"
              defaultValue={props?.info?.passyear}
              onChange={props?.handleChange}
            />
          )}
          </div>
          {key === 0 && (
            <div className={styles.threeCol} style={{display:'flex', alignItems:'center'}}>
              {!edit && (<p><label>CGPA:&nbsp;&nbsp;</label>{props?.info?.cgpa}</p>)}
            {edit && (
            <TextField
              id="outlined-required"
              label="CGPA"
              type="text"
              name="cgpa"
              defaultValue={props?.info?.cgpa}
              onChange={props?.handleChange}
            />
          )}
            </div>
          )}
          {(key === 1 || key === 2) && (
            <div className={styles.threeCol} style={{display:'flex', alignItems:'center'}}>
              {!edit && (<p><label>Score:&nbsp;&nbsp;</label>{props?.info?.score}</p>)}
            {edit && (
            <TextField
              id="outlined-required"
              label="Score"
              type="text"
              name="score"
              defaultValue={props?.info?.score}
              onChange={props?.handleChange}
            />
          )}
            </div>
          )}
          {(key === 1 || key === 2) && (
            <div className={styles.threeCol} style={{display:'flex', alignItems:'center'}}>
              {!edit && (<p><label>Percentage:&nbsp;&nbsp;</label>{props?.info?.percentage}</p>)}
            {edit && (
            <TextField
              id="outlined-required"
              label="Percentage"
              type="text"
              name="percentage"
              defaultValue={props?.info?.percentage}
              onChange={props?.handleChange}
            />
          )}
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default EduCard;

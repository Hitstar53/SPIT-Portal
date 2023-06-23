import React from 'react';
import styles from './Placement.module.css';
import { useState, useEffect } from 'react';
import Fab from "@mui/material/Fab";
import { FaEdit, FaSave } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Placement = () => {
    const container = styles.container + " flex flex-col gap-8 p-8"
    const companyinfo = {
        companyName: "Deloittee Bank",
        contactNo: "9099845001",
        address:"26/A, Shanti Niketan C.H.S., Gulmohar Road, Lower Parel - 28."
    }
    const roleinfo = {
        role:"Software Developer Engineer (S.D.E)",
        jobDescription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        joinDate: "28/01/2003",
        ctc: "19 LPA"
    }
    const [edit,setEdit] = useState(false); 
    const [roleInfo,setRoleInfo] = useState({});
    const [companyInfo,setCompanyInfo] = useState({});
    const handleClickEdit = () => {
        if (!edit) {
          setEdit(true);
        } else {
          setEdit(false);
        }
      };
    useEffect(() => {
        setRoleInfo({
            role: roleinfo.role,
            jobDescription: roleinfo.jobDescription,
            joinDate: roleinfo.joinDate,
            ctc: roleinfo.ctc,
        })
        setCompanyInfo({
            companyName: companyinfo.companyName,
            contactInfo: companyinfo.contactInfo,
            address: companyinfo.address,
        })
    }); 
    const handleChange = (e) => {
        console.log(e.target.value);
        setRoleInfo({ ...roleInfo, [e.target.name]: e.target.value});
        setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value});
      }
    const handleSubmit = (event) => {
        event.preventDefault();
        setEdit(false)
      };
  return (
    <div className={container}>
    <Box component='form'
    sx={{
        "& .MuiTextField-root": { m: 1, width: "90%" },
        "& .MuiOutlinedInput-input": { color: "var(--text-color) !important" },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--dark-override-color) !important",
        },
        "& .MuiInputLabel-root": { color: "var(--text-color) !important" },
        "& .Mui-focused": { color: "var(--dark-override-color) !important" },
      }}
      noValidate
      onSubmit={handleSubmit}
      autoComplete="off"
    >
        <div className={styles.header}>
            <h1 className="text-4xl font-semibold">Placement</h1>
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
              borderRadius: "10px",
              backgroundColor: "var(--secondary-color)",
              color: "var(--text-color)",
              padding: "0.5rem 1rem",
              ":hover": {
                backgroundColor: "var(--secondary-color)",
              },
            }}
            variant="extended"
            size="small"
            aria-label="add"
          >
            <FaSave />
            Save
          </Fab>
        )}
        </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl p-1 font-semibold heading">Company Information</h1>
        <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding:'0.25rem'}}>
            <div style={{width:'50%'}}>
            {!edit && (
              <span>Company Name:&nbsp;&nbsp;{companyinfo.companyName}</span>
            )}
            {edit && (
              <TextField
                name="companyName"
                id="outlined-required"
                label="Company Name"
                type="text"
                defaultValue={companyinfo.companyName}
                onChange={handleChange}
              />
            )}
            </div>
            <div style={{width:'50%'}}>
            {!edit && (
              <span>Contact Information:&nbsp;&nbsp;{companyinfo.contactNo}</span>
            )}
            {edit && (
              <TextField
                name="contactNo"
                id="outlined-required"
                label="Contact Number"
                type="text"
                defaultValue={companyinfo.contactNo}
                onChange={handleChange}
              />
            )}
            </div>    
      </div>
        <div style={{padding:'0.25rem'}}>
        {!edit && (
              <span>Address:&nbsp;&nbsp;{companyinfo.address}</span>
            )}
            {edit && (
              <TextField
                name="address"
                id="outlined-required"
                label="Address"
                type="text"
                defaultValue={companyinfo.address}
                onChange={handleChange}
              />
            )}
        </div>
        </div>
      <div className="flex flex-col gap-6 mt-6">
        <h1 className="text-xl p-1 font-semibold heading">Role Information</h1>
        <div>
        <div style={{padding:'0.25rem'}}>
        {!edit && (
              <span>Role:&nbsp;&nbsp;{roleinfo.role}</span>
            )}
            {edit && (
              <TextField
                name="role"
                id="outlined-required"
                label="Role"
                type="text"
                defaultValue={roleinfo.role}
                onChange={handleChange}
              />
            )}
        </div>
        <div style={{padding:'0.25rem'}}>
        {!edit && (
              <span>Job Description:&nbsp;&nbsp;{roleinfo.jobDescription}</span>
            )}
            {edit && (
              <TextField
                name="jobDescription"
                id="outlined-required"
                label="Job Description"
                type="text"
                defaultValue={roleinfo.jobDescription}
                onChange={handleChange}
              />
            )}
        </div>
        <div style={{padding:'0.25rem'}}>
        {!edit && (
              <span>Joining Date:&nbsp;&nbsp;{roleinfo.joinDate}</span>
            )}
            {edit && (
              <TextField
                name="joinDate"
                id="outlined-required"
                label="Joining Date"
                type="text"
                defaultValue={roleinfo.joinDate}
                onChange={handleChange}
              />
            )}
        </div>
        <div style={{padding:'0.25rem'}}>
        {!edit && (
              <span>C.T.C.:&nbsp;&nbsp;{roleinfo.ctc}</span>
            )}
            {edit && (
              <TextField
                name="ctc"
                id="outlined-required"
                label="C.T.C."
                type="text"
                defaultValue={roleinfo.ctc}
                onChange={handleChange}
              />
            )}
        </div>   
        </div>
      </div>
    </div>
    </Box>
    </div>
  ) 
}

export default Placement
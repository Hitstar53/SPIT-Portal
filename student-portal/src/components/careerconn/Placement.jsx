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
            contactNo: companyinfo.contactNo,
            address: companyinfo.address,
        })
    },[]); 
    const handleChangeRole = (event) => {
        setRoleInfo({ ...roleInfo, [event.target.name]: event.target.value});
        
    }
    const handleChangeCompany = (event) => {
        setCompanyInfo({ ...companyInfo, [event.target.name]: event.target.value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setEdit(false)
    };
  return (
    <div className={container} style={{height:'calc(100%-64px)'}}>
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
              <span>Company Name:&nbsp;&nbsp;{companyInfo.companyName}</span>
            )}
            {edit && (
              <TextField
                name="companyName"
                id="outlined-required"
                label="Company Name"
                type="text"
                defaultValue={companyInfo.companyName}
                onChange={handleChangeCompany}
              />
            )}
            </div>
            <div style={{width:'50%'}}>
            {!edit && (
              <span>Contact Information:&nbsp;&nbsp;{companyInfo.contactNo}</span>
            )}
            {edit && (
              <TextField
                name="contactNo"
                id="outlined-required"
                label="Contact Number"
                type="text"
                defaultValue={companyInfo.contactNo}
                onChange={handleChangeCompany}
              />
            )}
            </div>    
      </div>
        <div style={{padding:'0.25rem'}}>
        {!edit && (
              <span>Address:&nbsp;&nbsp;{companyInfo.address}</span>
            )}
            {edit && (
              <TextField
                name="address"
                id="outlined-required"
                label="Address"
                type="text"
                defaultValue={companyInfo.address}
                onChange={handleChangeCompany}
              />
            )}
        </div>
        </div>
      <div className="flex flex-col gap-6 mt-6">
        <h1 className="text-xl p-1 font-semibold heading">Role Information</h1>
        <div>
        <div style={{padding:'0.25rem'}}>
        {!edit && (
              <span>Role:&nbsp;&nbsp;{roleInfo.role}</span>
            )}
            {edit && (
              <TextField
                name="role"
                id="outlined-required"
                label="Role"
                type="text"
                defaultValue={roleInfo.role}
                onChange={handleChangeRole}
              />
            )}
        </div>
        <div style={{padding:'0.25rem'}}>
        {!edit && (
              <span>Job Description:&nbsp;&nbsp;{roleInfo.jobDescription}</span>
            )}
            {edit && (
              <TextField
                name="jobDescription"
                id="outlined-required"
                label="Job Description"
                type="text"
                defaultValue={roleInfo.jobDescription}
                onChange={handleChangeRole}
              />
            )}
        </div>
        <div style={{padding:'0.25rem'}}>
        {!edit && (
              <span>Joining Date:&nbsp;&nbsp;{roleInfo.joinDate}</span>
            )}
            {edit && (
              <TextField
                name="joinDate"
                id="outlined-required"
                label="Joining Date"
                type="text"
                defaultValue={roleInfo.joinDate}
                onChange={handleChangeRole}
              />
            )}
        </div>
        <div style={{padding:'0.25rem'}}>
        {!edit && (
              <span>C.T.C.:&nbsp;&nbsp;{roleInfo.ctc}</span>
            )}
            {edit && (
              <TextField
                name="ctc"
                id="outlined-required"
                label="C.T.C."
                type="text"
                defaultValue={roleInfo.ctc}
                onChange={handleChangeRole}
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
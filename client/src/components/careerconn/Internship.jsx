import React from 'react';
import { json, useNavigate, useLoaderData } from "react-router-dom";
import CustAlert from "../UI/CustAlert";
import AddButton from '../UI/AddButton';
import styles from './Internship.module.css';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import MultiFieldModal from '../UI/Modals/MultiFieldModal';
import TextField from '@mui/material/TextField';
import MenuItem  from '@mui/material/MenuItem';
import NoData from '../UI/NoData';
import ServerUrl from '../../constants';

const Internship = () => {
  const [open, setOpen] = React.useState(false);
  const [index,setIndex] = React.useState(0);
  const data = useLoaderData();
  const [internships, setInternships] = React.useState(
    data ? data.internship : []
  );
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
    navigate(0);
  };
  function handleClickOpen(index) {
    setIndex(index);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = async ()=> {
    const arr = [...internships];
    arr.splice(index, 1);
    const deleteInternship = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/deleteInternship`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            internships:arr
          }),
        }
      );
      if (!response.ok) {
        setAlertOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        setAlertOpen(true);
        setSeverity("success");
        setMessage("Internship deleted successfully");
      }
    };
    deleteInternship();
    setOpen(false);
  };
  // Functions for dialog (copy from here )
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [newData, setNewData] = React.useState({})
  const handleDataChange = (e) => {
    setNewData({...newData,[e.target.name]:e.target.value})
  }
  const handleDataSubmit = (e) => {
    e.preventDefault();
    const arr = [...internships]
    arr.unshift(newData)
    setInternships(arr)
    const updateInternship = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/setInternship`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            organization:newData.organization,
            duration:newData.duration,
            position:newData.position,
            financed:newData.financed,
            mode:newData.mode,
            description:newData.description
          }),
        }
      );
      if (!response.ok) {
        setAlertOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        setAlertOpen(true);
        setSeverity("success");
        setMessage("Internship Added Successfully");
      }
    };
    updateInternship();
  }
  // Functions for dialog (copy till here )
  const dashboard = styles.dashboard + " flex flex-col p-8"

  return (
    <React.Fragment>
        <div className={dashboard}>
          <h1 className="text-4xl text-center md:text-left font-semibold pb-8 flex flex-col gap-4 md:gap-0 md:flex-row justify-between">
            Internships
            <AddButton
              onClick={handleClickOpenDialog}
              btntext="Add Internship"
            />
          </h1>
          {
            internships.length == 0 && 
              <NoData 
                title="No Internships Added"
                message="You have not added any internships yet. Click on the button above to add one."
              />
          }
          {internships.map((info, index) => {
            return (
              <div
                key={index}
                style={
                  index == 0 ? { borderTop: "1px solid var(--text-color)" } : {}
                }
                className={styles.internshipCard}
              >
                <div className={styles.heading}>
                  <div className={styles.org}>
                    <div>{info.organization}</div>
                    <DeleteIcon
                      sx={{ color: "var(--text-color)", cursor: "pointer" }}
                      onClick={() => {
                        handleClickOpen(index);
                      }}
                    />
                  </div>
                  <div>{info.duration}</div>
                </div>
                <div className={styles.details}>
                  <div>
                    <Chip
                      sx={{
                        backgroundColor: "var(--pill-color)",
                        color: "var(--text-color)",
                      }}
                      label={info.position}
                    />
                  </div>
                  <div className={styles.fdetails}>
                    <Chip
                      sx={{
                        backgroundColor: "var(--pill-color)",
                        color: "var(--text-color)",
                      }}
                      label={info.financed}
                    />
                    <Chip
                      sx={{
                        backgroundColor: "var(--pill-color)",
                        color: "var(--text-color)",
                      }}
                      label={info.mode}
                    />
                  </div>
                </div>
                <div className={styles.desc}>{info.description}</div>
              </div>
            );
          })}
          <MultiFieldModal
            handleDataSubmit={handleDataSubmit}
            openDialog={openDialog}
            handleClickOpenDialog={handleClickOpenDialog}
            handleCloseDialog={handleCloseDialog}
            title="Add new internship"
          >
            <TextField
              required
              autoFocus
              margin="dense"
              name="organization"
              label="Organization"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              helperText="Enter name of the organization"
              onChange={handleDataChange}
            />
            <TextField
              required
              margin="dense"
              name="duration"
              label="Academic Year"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              helperText="Enter Year of the internship, Eg: 2023"
              onChange={handleDataChange}
            />
            <TextField
              required
              margin="dense"
              name="position"
              label="Position"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              helperText="Enter your position, Eg: Software Developer"
              onChange={handleDataChange}
            />
            <TextField
              name="financed"
              id="outlined-required"
              select
              fullWidth
              autocomplete="off"
              sx={{ margin: "1rem 0 0 0" }}
              label="Paid or Unpaid"
              helperText="Select if the internship is paid or unpaid"
              onChange={handleDataChange}
            >
              <MenuItem key="Paid" value="Paid">
                Paid
              </MenuItem>
              <MenuItem key="UnPaid" value="UnPaid">
                Unpaid
              </MenuItem>
            </TextField>
            <TextField
              name="mode"
              id="outlined-required"
              select
              fullWidth
              sx={{ margin: "1rem 0 0 0" }}
              label="Mode"
              helperText="Select mode of work"
              onChange={handleDataChange}
            >
              <MenuItem key="Online" value="Online">
                Online
              </MenuItem>
              <MenuItem key="Offline" value="Offline">
                Offline
              </MenuItem>
              <MenuItem key="Hybrid" value="Hybrid">
                Hybrid
              </MenuItem>
            </TextField>
            <TextField
              multiline
              required
              margin="dense"
              name="description"
              label="Description"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              helperText="Briefly describe your work, what tasks you performed, etc."
              onChange={handleDataChange}
            />
          </MultiFieldModal>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent sx={{ background: "var(--bg-color)", pb: 0 }}>
              <DialogContentText
                sx={{ color: "var(--text-color)" }}
                id="alert-dialog-description"
              >
                Do you want to delete this record?
              </DialogContentText>
            </DialogContent>
            <DialogActions
              sx={{ background: "var(--bg-color)", color: "var(--text-color)" }}
            >
              <Button sx={{ color: "var(--text-color)" }} onClick={handleClose}>
                No
              </Button>
              <Button
                sx={{ color: "var(--text-color)" }}
                onClick={handleChange}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      <CustAlert
        open={alertOpen}
        onClose={handleAlertClose}
        severity={severity}
        message={message}
      />
    </React.Fragment>
  );
}

export default Internship

export async function loader() {
  const response = await fetch(
    `${ServerUrl}/api/student/getInternship`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("userinfo")).email,
      }),
    }
  );
  if (!response.ok) {
    throw json({ message: "Error fetching internship information" }, 422);
  }
  if (response.ok) {
    const internshipData = await response.json();
    return internshipData;
  }
}
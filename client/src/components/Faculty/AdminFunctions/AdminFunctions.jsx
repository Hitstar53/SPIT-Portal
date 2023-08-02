import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from "@mui/material/TextField";
import MultiFieldModal from "../../UI/Modals/MultiFieldModal";
import CustAlert from "../../UI/CustAlert";
import UploadMarks from './UploadMarks'
import AddButton from '../../UI/AddButton'
import styles from './AdminFunctions.module.css'
import ServerUrl from '../../../constants';

const AdminFunctions = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");
    const [openAdminDialog, setOpenAdminDialog] = useState(false);
    const [openFacultyDialog, setOpenFacultyDialog] = useState(false);
    const navigate = useNavigate();
    const handleAlertClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setAlertOpen(false);
    };
    const handleAdminClickOpenDialog = () => {
      setOpenAdminDialog(true);
    };
    const handleAdminCloseDialog = () => {
      setOpenAdminDialog(false);
    };
    const handleFacultyClickOpenDialog = () => {
      setOpenFacultyDialog(true);
    }
    const handleFacultyCloseDialog = () => {
      setOpenFacultyDialog(false);
    }
    const [newAdminData, setAdminNewData] = useState({});
    const [newFacultyData, setFacultyNewData] = useState({});
    const handleAdminDataChange = (e) => {
      setAdminNewData({ ...newAdminData, [e.target.name]: e.target.value });
    };
    const handleAdminSubmit = (e) => {
        e.preventDefault();
        const setNewAdmin = async () => {
            const response = await fetch(`${ServerUrl}/api/admin/makeAdmin`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: newAdminData.email,
                }),
            });
            if (!response.ok) {
                const data = await response.json();
                setAlertOpen(true);
                setSeverity("error");
                setMessage(data.message || "Something went wrong");
            }
            if (response.ok) {
                const data = await response.json();
                setAlertOpen(true);
                setSeverity("success");
                setMessage(data.message);
            }
        };
        setNewAdmin();
    };
    const handleFacultyDataChange = (e) => {
        setFacultyNewData({ ...newFacultyData, [e.target.name]: e.target.value });
    };
    const handleFacultySubmit = (e) => {
        e.preventDefault();
        const setNewFaculty = async () => {
            const response = await fetch(`${ServerUrl}/api/admin/initializeFaculty`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: newFacultyData.email,
                    name: newFacultyData.name,
                }),
            });
            if (!response.ok) {
                const data = await response.json();
                setAlertOpen(true);
                setSeverity("error");
                setMessage(data.message || "Something went wrong");
            }
            if (response.ok) {
                const data = await response.json();
                setAlertOpen(true);
                setSeverity("success");
                setMessage(data.message);
            }
        };
        setNewFaculty();
    };
    const dashboard = styles.dashboard + " flex flex-col gap-8 p-8";
    return (
      <div className={dashboard}>
        <h1 className="text-4xl font-semibold">Admin Functions</h1>
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-between items-center text-2xl p-1 font-semibold heading">
            Add Admin
            <AddButton
              onClick={handleAdminClickOpenDialog}
              btntext="NEW ADMIN"
            />
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-between items-center text-2xl p-1 font-semibold heading">
            Add Faculty
            <AddButton
              onClick={handleFacultyClickOpenDialog}
              btntext="NEW FACULTY"
            />
          </h1>
        </div>
        <div className="flex flex-col gap-6 mt-2">
          <h1 className="text-2xl p-1 font-semibold heading">Upload Marks</h1>
          <UploadMarks />
        </div>
        <MultiFieldModal
          handleDataSubmit={handleAdminSubmit}
          openDialog={openAdminDialog}
          handleClickOpenDialog={handleAdminClickOpenDialog}
          handleCloseDialog={handleAdminCloseDialog}
          title="New Admin Details"
        >
          <TextField
            required
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            autoComplete="off"
            type="email"
            fullWidth
            variant="standard"
            helperText="Email id of the new admin"
            onChange={handleAdminDataChange}
          />
        </MultiFieldModal>
        <MultiFieldModal
          handleDataSubmit={handleFacultySubmit}
          openDialog={openFacultyDialog}
          handleClickOpenDialog={handleFacultyClickOpenDialog}
          handleCloseDialog={handleFacultyCloseDialog}
          title="New Faculty Details"
          content="Please enter the following details to add a new faculty"
        >
          <TextField
            required
            autoFocus
            margin="dense"
            name="name"
            label="Faculty Name"
            autoComplete="off"
            type="text"
            fullWidth
            variant="standard"
            helperText="Name of new Faculty, as per S.P.I.T records"
            onChange={handleFacultyDataChange}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            autoComplete="off"
            type="email"
            fullWidth
            variant="standard"
            helperText="Email id of the new admin"
            onChange={handleFacultyDataChange}
          />
        </MultiFieldModal>
        <CustAlert
          open={alertOpen}
          onClose={handleAlertClose}
          severity={severity}
          message={message}
        />
      </div>
    );
}

export default AdminFunctions
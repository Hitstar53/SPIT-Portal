import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { json, useNavigate, useLoaderData } from "react-router-dom";
import CustAlert from "../UI/CustAlert";
import styles from "./Placement.module.css";
import Fab from "@mui/material/Fab";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { BsPersonWorkspace } from "react-icons/bs";
import {
  FaMapMarkerAlt,
  FaUserTie,
  FaCalendarAlt,
  FaRupeeSign,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { RiInformationLine } from "react-icons/ri";
import ServerUrl from "../../constants";

const Placement = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  const theme = useTheme();
  const extractedQuery = theme.breakpoints.down("sm").substring(7);
  const isMobile = useMediaQuery({ query: extractedQuery });
  const data = useLoaderData();
  const [roleInfo, setRoleInfo] = useState(
    data ? data : {}
  );
  const [companyInfo, setCompanyInfo] = useState(
    data ? data : {}
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
  const [edit, setEdit] = useState(false);
  const handleClickEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };
  const handleChangeRole = (event) => {
    setRoleInfo({ ...roleInfo, [event.target.name]: event.target.value });
  };
  const handleChangeCompany = (event) => {
    setCompanyInfo({ ...companyInfo, [event.target.name]: event.target.value });
  };
  const handleChangeDate = (event) => {
    setRoleInfo({
      ...roleInfo,
      doj: `${event.$M + 1}/${event.$D}/${event.$y}`,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatePlacementInfo = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/updatePlacement`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            companyName: companyInfo.companyName,
            contactNo: companyInfo.contactNo,
            address: companyInfo.address,
            role: roleInfo.role,
            description: roleInfo.description,
            doj: roleInfo.doj,
            ctc: roleInfo.ctc,
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
        setMessage("Placement information updated successfully");
      }
    };
    updatePlacementInfo();
    setEdit(false);
  };
  return (
    <React.Fragment>
      <div className={container} style={{ height: "calc(100%-64px)" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "90%" },
            "& .MuiOutlinedInput-input": {
              color: "var(--text-color) !important",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--dark-override-color) !important",
            },
            "& .MuiInputLabel-root": { color: "var(--text-color) !important" },
            "& .Mui-focused": {
              color: "var(--dark-override-color) !important",
            },
          }}
          noValidate
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className={styles.header}>
            <h1 className="font-semibold">Placement</h1>
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
            <h1 className="text-xl p-1 font-semibold md:text-2xl">
              Company Information
            </h1>
            <div className="flex flex-col text-base md:text-lg">
              <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between p-1">
                <div className="w-full md:w-1/2">
                  {!edit && (
                    <span className="flex flex-row gap-2 items-center">
                      <BsPersonWorkspace className="text-xl" />
                      {companyInfo.companyName}
                    </span>
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
                <div className="w-full flex justify-start md:w-1/2 md:justify-end">
                  {!edit && (
                    <span className="flex flex-row gap-2 items-center">
                      <GrContact className="text-xl" />
                      Contact Information:&nbsp;&nbsp;{companyInfo.contactNo}
                    </span>
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
              <div className="p-1">
                {!edit && (
                  <span className="flex flex-row gap-2 items-center">
                    <FaMapMarkerAlt className="text-xl" />
                    Address:&nbsp;&nbsp;{companyInfo.address}
                  </span>
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
              <h1 className="text-xl p-1 font-semibold md:text-2xl">
                Role Information
              </h1>
              <div className="text-base md:text-lg">
                <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between p-1">
                  <div className="w-full md:w-1/2">
                    {!edit && (
                      <span className="flex flex-row gap-2 items-center">
                        <FaUserTie className="text-xl" />
                        Role:&nbsp;&nbsp;{roleInfo.role}
                      </span>
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
                  <div className="w-full md:w-1/4 flex justify-start md:justify-center">
                    {!edit && (
                      <span className="flex flex-row gap-2 items-center">
                        <FaCalendarAlt className="text-xl" />
                        Joining Date:&nbsp;&nbsp;{roleInfo.doj}
                      </span>
                    )}
                    {edit && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                          name="doj"
                          label="Date Of Joining"
                          value={dayjs(roleInfo.doj)}
                          onChange={handleChangeDate}
                        />
                      </LocalizationProvider>
                    )}
                  </div>
                  <div className="w-full md:w-1/4 flex justify-start md:justify-end">
                    {!edit && (
                      <span className="flex flex-row gap-2 items-center">
                        <FaRupeeSign className="text-xl" />
                        C.T.C.:&nbsp;&nbsp;{roleInfo.ctc}
                      </span>
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
                <div className="p-1">
                  {!edit && isMobile && (
                    <span className="flex flex-col md:flex-row gap-2">
                      <span className="flex flex-row gap-2 items-center">
                        <RiInformationLine className="text-lg" />
                        Job Description:
                      </span>
                      <p className="flex-1 text-justify">
                        {roleInfo.description}
                      </p>
                    </span>
                  )}
                  {!edit && !isMobile && (
                    <span className="flex flex-row gap-2 items-center">
                      <RiInformationLine className="text-xl" />
                      <p className="flex-1 text-justify">
                        Job Description:&nbsp;&nbsp;{roleInfo.description}
                      </p>
                    </span>
                  )}
                  {edit && (
                    <TextField
                      name="description"
                      id="outlined-required"
                      label="Job Description"
                      type="text"
                      defaultValue={roleInfo.description}
                      onChange={handleChangeRole}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>
      <CustAlert
        open={alertOpen}
        onClose={handleAlertClose}
        severity={severity}
        message={message}
      />
    </React.Fragment>
  );
};

export default Placement;

export async function loader() {
  const response = await fetch(
    `${ServerUrl}/api/student/getPlacement`,
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
    throw json({ message: "Error fetching placement information" }, 422);
  }
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

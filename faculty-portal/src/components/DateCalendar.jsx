import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import enUS from "date-fns/locale/en-US";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import { TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "../styles/DateCalendar.css"

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const DateCalendar = () => {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState([]);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handleAddEvent = async () => {
        console.log(newEvent)
        if (newEvent.title === "" || newEvent.start === "" || newEvent.end === "") {
            toast("Please enter all the Event Fields", {
                position: 'top-center',
            });
            return;
        }
        // await axios.post()
        setAllEvents([...allEvents, newEvent]);
        setNewEvent({ title: "", start: "", end: "" });
    };

    return (
        <div className="calendar-container">
            <Calendar
                className="calendar"
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 480, width: "100%", margin: "50px", padding: "0 1rem" }} />
            <Fab variant="extended"
                onClick={toggle}
                sx={{
                    backgroundColor: '#301683',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '1rem',
                    marginTop: "-1.5rem",
                    transition: 'all 0.3s',
                    ':hover': {
                        backgroundColor: '#452B99',
                        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
                        transform: 'scale(1.05)',
                    }
                }}
            >
                <EditIcon sx={{ mr: 1 }} />
                Add Event
            </Fab>
            <ToastContainer />
            <Modal className="modal-main" isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle} className="modal-title">Event Details</ModalHeader>
                <ModalBody>
                    <div>
                        <TextField
                            id="filled-password-input"
                            label="Event Title"
                            type="text"
                            variant="filled"
                            style={{ width: "25rem", marginBottom: "10px" }}
                            value={newEvent.title}
                            onChange={(e) =>
                                setNewEvent({ ...newEvent, title: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem label="Start Date">
                                <MobileDateTimePicker  value={newEvent.start} onChange={(date) => setNewEvent({ ...newEvent, start: date.$d })} />
                            </DemoItem>
                            <DemoItem label="End Date">
                                <MobileDateTimePicker  value={newEvent.end} onChange={(date) => setNewEvent({ ...newEvent, end: date.$d })} />
                            </DemoItem>
                        </LocalizationProvider>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={handleAddEvent}>
                        Add Event
                    </Button>{' '}
                    <Button color="danger" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default DateCalendar;

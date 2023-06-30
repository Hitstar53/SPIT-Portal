import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [newEvent, setNewEvent] = useState({ title: "", startDate: "", endDate: "" });
    const [allEvents, setAllEvents] = useState([]);
    const [modal, setModal] = useState(false);
    const { user } = useContext(UserContext);
    
    useEffect( () => {
        const fetchEvents = async() => {
                await axios.post('http://localhost:5000/api/faculty/get/event', { email: user.email })
                .then((res) => {
                    console.log(res.data);
                    setAllEvents(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        fetchEvents();
    }, []);


    const toggle = () => setModal(!modal);

    const handleAddEvent = async () => {
        console.log(newEvent)
        if (newEvent.title === "" || newEvent.startDate === "" || newEvent.endDate === "") {
            toast.error('Please enter all the Event Fields!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }
        // await axios.post()
        // setAllEvents([...allEvents, newEvent]);
        await axios.post('http://localhost:5000/api/faculty/add/event', { email: user.email, events: newEvent })
        .then((res) => {
            console.log(res.data);
            setAllEvents([...allEvents, newEvent]);
        })
        .catch((err) => {
            console.log(err);
        });
        setNewEvent({ title: "", startDate: "", endDate: "" });
        toggle();
    };

    return (
        <div className="calendar-container">
            <Calendar
                className="calendar"
                localizer={localizer}
                events={allEvents}
                startAccessor="startDate"
                endAccessor="endDate"
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
                                <MobileDateTimePicker value={newEvent.startDate} onChange={(date) => setNewEvent({ ...newEvent, startDate: date.$d })} />
                            </DemoItem>
                            <DemoItem label="End Date">
                                <MobileDateTimePicker value={newEvent.endDate} onChange={(date) => setNewEvent({ ...newEvent, endDate: date.$d })} />
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

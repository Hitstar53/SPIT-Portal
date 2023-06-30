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
import enUS from "date-fns/locale/en-US";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewEvent from './ViewEvent';
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
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchEvents = async () => {
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

    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    };

    const toggle1 = () => setModal1(!modal1);
    const toggle2 = () => setModal2(!modal2);

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
        await axios.post('http://localhost:5000/api/faculty/add/event', { email: user.email, events: newEvent })
            .then((res) => {
                console.log(res.data);
                setAllEvents(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setNewEvent({ title: "", startDate: "", endDate: "" });
        toggle1();
    };

    const displayEvents = allEvents.map((event) => {
        return <ViewEvent key={event._id} id={event._id} title={event.title} start={event.startDate} end={event.endDate} />
    })

    return (
        <div className="calendar-container">
            <Calendar
                className="calendar"
                localizer={localizer}
                events={allEvents}
                startAccessor="startDate"
                endAccessor="endDate"
                style={{ height: 480, width: "100%", margin: "50px", padding: "0 1rem" }} />
            <div className='button-container'>

                <Fab variant="extended"
                    onClick={toggle1}
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
                <Fab variant="extended"
                    onClick={toggle2}
                    sx={{
                        backgroundColor: '#B22222',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '1rem',
                        marginTop: "-1.5rem",
                        transition: 'all 0.3s',
                        ':hover': {
                            backgroundColor: '#DC143C',
                            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
                            transform: 'scale(1.05)',
                        }
                    }}
                >
                    <DeleteIcon sx={{ mr: 1 }} />
                    Delete Event
                </Fab>
            </div>
            <Modal className="modal-main" isOpen={modal1} toggle={toggle1} >
                <ModalHeader toggle1={toggle1} className="modal-title">Event Details</ModalHeader>
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
                    <Button color="danger" onClick={toggle1}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal className="modal-main" isOpen={modal2} toggle={toggle2} >
                <ModalHeader toggle1={toggle1} className="modal-title">Event Details</ModalHeader>
                <ModalBody>
            <hr style={{margin: 0, padding: 0, border: "1px solid black", width: "100%"}}/>
                        {displayEvents}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle2}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default DateCalendar;

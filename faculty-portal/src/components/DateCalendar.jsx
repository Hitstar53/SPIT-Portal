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

    const handleAddEvent = () => {
        setAllEvents([...allEvents, newEvent]);
        setNewEvent({ title: "", start: "", end: "" });
    };

    return (
        <div className="calendar-container">
            {/* <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input
                    type="text"
                    placeholder="Event Title"
                    style={{ width: "20%", marginRight: "10px" }}
                    value={newEvent.title}
                    onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                    }
                />
            </div>
            <div>

                <DatePicker
                    placeholderText="Start Date"
                    style={{ marginRight: "10px" }}
                    selected={newEvent.start}
                    onChange={(date) =>
                        setNewEvent({ ...newEvent, start: date })
                    }
                />
                <DatePicker
                    placeholderText="End Date"
                    style={{ marginRight: "10px" }}
                    selected={newEvent.end}
                    onChange={(date) =>
                        setNewEvent({ ...newEvent, end: date })
                    }
                />
                <button onClick={handleAddEvent}>
                    Add Event
                </button>
            </div> */}
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
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default DateCalendar;
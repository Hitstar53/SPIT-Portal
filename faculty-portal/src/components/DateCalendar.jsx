import React, { useState } from "react";
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

    const handleAddEvent = () => {
        setAllEvents([...allEvents, newEvent]);
        setNewEvent({ title: "", start: "", end: "" });
    };

    return (
        <div>
            <h1>Calendar</h1>
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
            </div>
            <Calendar 
            localizer={localizer} 
            events={allEvents} 
            startAccessor="start" 
            endAccessor="end" 
            style={{ height: 500, margin: "50px" }} />
        </div>
    );
};

export default DateCalendar;
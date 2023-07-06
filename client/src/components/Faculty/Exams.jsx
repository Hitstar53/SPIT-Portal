import React, { useState } from 'react'
import styles from './Exams.module.css'
import AddButton from '../UI/AddButton.jsx'
import TextField from '@mui/material/TextField'
import MultiFieldModal from '../UI/Modals/MultiFieldModal'
import { InputLabel } from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AncmntExam from './Card'

const exam = [
    {
        subject: "Database and Management Systems",
        date: "23/6/23",
        syllabus:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        type: "MSE",
        sendTo: "All",
        year: "",
        branch: "",
        division: "",
        uid: "",
    },
];

const Exams = () => {
    const [exams, setExams] = useState(exam);
    const [openExamDialog, setOpenExamDialog] = useState(false);

    const handleExamClickOpenDialog = () => {
        setOpenExamDialog(true);
        setYear(false);
        setStudent(false);
    };
    const handleExamCloseDialog = () => {
        setOpenExamDialog(false);
    };

    const [newExamData, setExamNewData] = useState({});

    const handleExamDataChange = (e) => {
        setExamNewData({ ...newExamData, [e.target.name]: e.target.value });
    };
    const handleExamSubmit = (e) => {
        e.preventDefault();
        const arr = [...exams];
        arr.unshift(newExamData);
        setExams(arr);
        setOpen(false);
    };

    const allHandler = () => {
        setYear(false);
        setStudent(false);
    }

    const [year, setYear] = useState(false);
    const yearHandler = () => {
        setYear(true);
        setStudent(false);
    }

    const [student, setStudent] = useState(false);
    const studentHandler = () => {
        setYear(false);
        setStudent(true);
    }

    return (
        <div className={styles.facultyExam}>
            <div className={styles.header}>
                <h2 className={styles.subheading}>Exams</h2>
                <AddButton onClick={handleExamClickOpenDialog} btntext="ADD" />
            </div>
            {exams.map((exam, index) => (
                <AncmntExam
                    key={index}
                    title={exam.subject}
                    date={exam.date}
                    ancmnt={exam.syllabus}
                    type={exam.type}
                    sendTo={exam.sendTo}
                    year={exam.year}
                    branch={exam.branch}
                    division={exam.division}
                    uid={exam.uid}
                />
            ))}
            <MultiFieldModal
                handleDataSubmit={handleExamSubmit}
                openDialog={openExamDialog}
                handleClickOpenDialog={handleExamClickOpenDialog}
                handleCloseDialog={handleExamCloseDialog}
                title="Add new exam"
            >
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    name="title"
                    label="Subject"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleExamDataChange}
                />
                <TextField
                    required
                    margin="dense"
                    name="date"
                    label="Date"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleExamDataChange}
                />
                <TextField
                    required
                    margin="dense"
                    name="syllabus"
                    label="Syllabus"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleExamDataChange}
                />
                <InputLabel id="demo-simple-select-label">Send To</InputLabel>
                <Select
                    required
                    name="sendTo"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    label="Send To"
                    onChange={handleExamDataChange}
                >
                    <MenuItem value="All" onClick={allHandler}>All</MenuItem>
                    <MenuItem value="Class" onClick={yearHandler}>Year</MenuItem>
                    <MenuItem value="Student" onClick={studentHandler}>Student</MenuItem>
                </Select>
                {
                    year ?
                        <div>
                            <span>
                                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                <Select
                                    name="year"
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Year"
                                    fullWidth
                                    onChange={handleExamDataChange}
                                >
                                    <MenuItem value="F.E.">F.E.</MenuItem>
                                    <MenuItem value="S.E.">S.E.</MenuItem>
                                    <MenuItem value="T.E.">T.E.</MenuItem>
                                    <MenuItem value="B.E.">B.E.</MenuItem>
                                </Select>
                            </span>
                            <span>
                                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                                <Select
                                    name="branch"
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Branch"
                                    onChange={handleExamDataChange}
                                >
                                    <MenuItem value="Comps">Comps</MenuItem>
                                    <MenuItem value="AIML">AIML</MenuItem>
                                    <MenuItem value="Data Science">Data Science</MenuItem>
                                    <MenuItem value="EXTC">EXTC</MenuItem>
                                </Select>
                            </span>
                            <span>
                                <InputLabel id="demo-simple-select-label">Division</InputLabel>
                                <Select
                                    name="division"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Division"
                                    fullWidth
                                    onChange={handleExamDataChange}
                                >
                                    <MenuItem value="A">A</MenuItem>
                                    <MenuItem value="B">B</MenuItem>
                                    <MenuItem value="C">C</MenuItem>
                                    <MenuItem value="D">D</MenuItem>
                                    <MenuItem value="E">E</MenuItem>
                                    <MenuItem value="F">F</MenuItem>
                                </Select>
                            </span>
                        </div>
                        : null
                }
                {
                    student ?
                        <div>
                            <TextField
                                name="uid"
                                required
                                margin="dense"
                                label="Enter UID"
                                autoComplete="off"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleExamDataChange}
                            />
                        </div>
                        : null
                }
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="type"
                    fullWidth
                    label="Type"
                    onChange={handleExamDataChange}
                >
                    <MenuItem value="ISE">ISE</MenuItem>
                    <MenuItem value="MSE">MSE</MenuItem>
                </Select>
            </MultiFieldModal>
        </div>
    )
}

export default Exams

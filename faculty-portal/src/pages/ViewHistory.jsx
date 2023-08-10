import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import "../styles/History.css";
import Table from "react-bootstrap/Table";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import DoneIcon from "@mui/icons-material/Done";
import HeaderImage from "../assets/spit.png";
import Autocomplete from "@mui/material/Autocomplete";
import Done from "../assets/project-is-done.png";
import Notfound from "../assets/404-not-found.png";
import AllSteps from "../components/AllSteps";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const ViewHistory = () => {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [history, setHistory] = useState();
    const [selectedValue, setSelectedValue] = useState("");
    //For faculty
    const [year, setYear] = useState("");
    const [years, setYears] = useState([]);
    //For HOD
    const [year2, setYear2] = useState("");
    const [years2, setYears2] = useState([]);
    const [Dim4, setDim4] = useState();
    //for HOD and Principal
    const [isHOD, setIsHOD] = useState(false);
    // For Principal
    const [allDept, setAllDept] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedDept, setSelectedDept] = useState(false);
    const [faculty, setFaculty] = useState([]);
    const [report, setReport] = useState();
    const [selectedFaculty, setSelectedFaculty] = useState(false);
    const [nameForPrincipal, setNameForPrincipal] = useState("");
    const [year3, setYear3] = useState("");
    const [years3, setYears3] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [principalDepartment, setPrincipalDepartment] = useState("");
    const [toggle, setToggle] = useState(false);

    function togglecheckbox(e) {
        console.log(e.target.checked)
        setToggle(e.target.checked)
    }

    const [facultyName, setfacultyName] = useState([]);
    // const pdfExportComponent = useRef(null);
    //for adding print function
    const myvar = "HOD";
    const elementRefHOD = useRef();
    const elementRefPrincipal = useRef();
    const elementRefFaculty = useRef();

    const handleExportPDFHOD = useReactToPrint({
        content: () => elementRefHOD.current,
        // onAfterPrint: alert("Printed Successfully"),
        documentTitle: `${user.department}_${name}_${year2}_AppraisalForm_byHOD`,
    });
    const handleExportPDFPrincipal = useReactToPrint({
        content: () => elementRefPrincipal.current,
        // onAfterPrint: alert("Printed Successfully"),
        documentTitle: `${principalDepartment}_${nameForPrincipal}_${year3}_AppraisalForm_byPrincipal`,
    });
    const handleExportPDFFaculty = useReactToPrint({
        content: () => elementRefFaculty.current,
        // onAfterPrint: alert("Printed Successfully"),
        documentTitle: `${user.department}_${user.fullName}_${year}_AppraisalForm_bySelf`,
    });

    if (user.designation == "HOD") {
        useEffect(() => {
            fetch("http://localhost:5000/api/faculty/get/faculty/by-dept", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    department: user.department,
                }),
            })
                .then((res) => res.json())
                .then((data) => setfacultyName(data.sort()));
        }, []);

        useEffect(() => {
            console.log("name: ", name);
        }, [name]);
        useEffect(() => {
            console.log("Years of that teacher : ", years2);
        }, [years2]);

        // const handleOption = async () => {
        //     const fetchDim4 = async () => {
        //         const endpoint = 'http://localhost:5000/api/faculty/appraisal/get/dim4';
        //         await axios.post(endpoint, {
        //             yearofAssesment: year2,
        //             facultyName: "Sudhir Namdeorao Dhage",
        //             // facultyName: "Mahesh Patil"
        //         }).then((response) => {
        //             console.log(response.data);
        //             setDim4(response.data);
        //             console.log(Dim4);
        //         }).catch((err) => {
        //             console.log(err);
        //         });
        //     }
        //     fetchDim4();
        // }
    } else {
        useEffect(() => {
            console.log("Inside UseEffect");
            fetch("http://localhost:5000/api/faculty/appraisal/getallappraisal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    facultyName: user.fullName,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setYears(data);
                });

            const fetchHistory = async () => {
                const endpoint =
                    "http://localhost:5000/api/faculty/appraisal/getappraisal";
                // const payload = JSON.parse(localStorage.getItem('user'));
                await axios
                    .post(endpoint, {
                        facultyName: user.fullName,
                        yearofAssesment: year,
                    })
                    .then((response) => {
                        console.log(response.data);
                        setHistory(response.data);
                    });
            };
            fetchHistory();
        }, [year]);
    }

    const handleOption = async () => {
        console.log(year3);
        const fetchHODData = async () => {
            const endpoint =
                "http://localhost:5000/api/faculty/appraisal/getappraisal";
            await axios
                .post(endpoint, {
                    yearofAssesment: year2,
                    facultyName: name,
                    // facultyName: "Mahesh Patil"
                })
                .then((response) => {
                    console.log("here");
                    console.log(response.data);
                    if (response.data.designation == "HOD") {
                        setIsHOD(true);
                    } else {
                        setDim4(response.data.Dimension4);
                    }
                    console.log(Dim4);
                });
        };

        const fetchPrincipalData = async () => {
            const endpoint =
                "http://localhost:5000/api/faculty/appraisal/getappraisal";
            await axios
                .post(endpoint, {
                    yearofAssesment: year3,
                    facultyName: nameForPrincipal,
                    // facultyName: "Mahesh Patil"
                })
                .then((response) => {
                    console.log("here");
                    console.log(response.data);
                    setReport(response.data);
                    if (response.data.designation == "HOD") {
                        setIsHOD(true);
                    }
                    console.log(Dim4);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        if (user.designation === "HOD") {
            fetchHODData();
        }
        if (user.designation === "Principal") {
            fetchPrincipalData();
        }
    };
    useEffect(() => {
        console.log("Faculty Year :", year);
        handleOption();
    }, [year2, year3]);

    // useEffect(() => {
    //     console.log("Faculty Year :", year);
    //     handleOption();
    // }, [year])

    // For Principal Select Box
    if (user.designation === "Principal") {
        useEffect(() => {
            const getDept = async () => {
                await axios
                    .get(
                        "http://localhost:5000/api/faculty/get/faculty/getalldepartments"
                    )
                    .then((res) => {
                        console.log(res.data);
                        setAllDept(res.data);
                    })
                    .catch((err) => console.log(err));
            };
            getDept();
        }, []);
        // useEffect(() => {
        //     fetch("http://localhost:5000/api/faculty/get/faculty/submitted", {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     })
        //         .then((res) => res.json())
        //         .then((data) => setFaculty(data.sort()));
        // }, [])
    }

    const getPrincipalFaculty = async (dept) => {
        console.log(dept);
        await axios
            .post("http://localhost:5000/api/faculty/get/faculty/submitted", {
                department: dept,
            })
            .then((res) => {
                console.log(res.data);
                setFaculty(res.data.sort());
                setSelectedDept(true);
            })
            .catch((err) => {
                console.log(err);
                setFaculty([]);
                setSelectedDept(false);
                setMessage("No Faculty Found");
            });
    };

    const getYears = async (name) => {
        console.log("Inside GetYears");
        console.log("Name on LIne 86", name);
        await fetch(
            "http://localhost:5000/api/faculty/appraisal/get-hod-appraisal-year",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    facultyName: name,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => setYears2(data));
    };

    const getPrincipalYears = async (name) => {
        console.log("Inside GetYears");
        console.log("Name on LIne 86", name);
        await fetch("http://localhost:5000/api/faculty/appraisal/getallappraisal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                facultyName: name,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setYears3(data),
                    data.length > 0 && setSelectedFaculty(true),
                    data.length == 0 && setNotFound(true);
            });
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target[0].value);
        setName(e.target[0].value);
        setYear2(null);
        getYears(e.target[0].value);
        setSelectedFaculty(true);
    }

    const handleDeptSubmit = (e) => {
        e.preventDefault();
        console.log("You clicked submit.");
        console.log(e.target[0].value);
        setPrincipalDepartment(e.target[0].value);
        getPrincipalFaculty(e.target[0].value);
    };

    const handlePrincipalSubmit = (e) => {
        e.preventDefault();
        console.log("You clicked submit.");
        console.log(e.target[0].value);
        setYear3(null);
        setNameForPrincipal(e.target[0].value);
        getPrincipalYears(e.target[0].value);
        // setSelectedFaculty(true);
    };

    useEffect(() => {
        console.log(years2);
    }, [years2]);

    return (
        <>
            {/* {if(user.designation == "HOD"){
                
            }
            } */}
            {user.designation === "HOD" && (
                <>
                    <div
                        style={{
                            display: "flex flex-col items-center justify-center",
                            justifyContent: "space-around",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <div className="dept-appraisal2">
                            <form onSubmit={handleSubmit}>
                                <div
                                    className="dept-appraisal-header"
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={facultyName}
                                        sx={{ width: 300, display: "inline-block" }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Faculty Name" />
                                        )}
                                    />
                                    <button
                                        type="submit"
                                        className="find-faculty-btn"
                                        style={{
                                            display: "inline-block",
                                            width: "200px",
                                        }}
                                    >
                                        Find Faculty
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* {( */}
                        {selectedFaculty && (
                            <div className="dropdown justify-center pt-0">
                                <div>Select a Year:</div>
                                <select
                                    id="dropdown"
                                    value={year2}
                                    onChange={(e) => setYear2(e.target.value)}
                                >
                                    <option value="">--Select Assessment year--</option>
                                    {years2.map((item) => {
                                        return (
                                            <option value={item.yearofAssesment}>
                                                {item.yearofAssesment}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}
                    </div>
                    {/* )} */}

                    {!year2 || !name ? (
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: "20px",
                            }}
                        >
                            Please Select Faculty Name and the Year of Assessment.
                        </p>
                    ) : (
                        ""
                    )}

                    {/* tables start here */}

                    <div>
                        {Dim4 ? (
                            <>
                                <div className="switch-container">
                                    {/* <h4>Hide Previous Dimensions</h4> */}
                                    <label class="switch">
                                        <input type="checkbox" value={toggle} onChange={togglecheckbox} />
                                        <span class="slider round"></span>
                                    </label>
                                    <h4>Show Previous Dimensions</h4>
                                </div>
                                {toggle && (
                                    <div
                                        style={{
                                            width: "95%",
                                            border: "1px solid black",
                                            margin: "1em auto",
                                        }}
                                    >
                                        <AllSteps fullName={name} year={year2} showComments={true} />
                                    </div>
                                )}
                                <div
                                    ref={elementRefHOD}
                                    style={{
                                        width: "95%",
                                        // padding:"0 0 2em 0",
                                        border: "1px solid black",
                                        margin: "1em auto",
                                    }}
                                >
                                    <img
                                        src={HeaderImage}
                                        style={{
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            width: "70%",
                                        }}
                                    />

                                    <h1
                                        className="text-xl font-extrabold mt-3"
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        Feedback Marks for {name} ({year2})
                                    </h1>
                                    {/* <Table striped bordered style={{ margin: "1rem", width: "95%" }}> */}
                                    <div
                                        className="dimhead"
                                        style={{
                                            backgroundColor: "#fabf8f",
                                            margin: "1em",
                                            padding: "0.4em 0.4em",
                                        }}
                                    >
                                        <strong>
                                            {" "}
                                            Dimension 4: Perception/ 360 degree feedback{" "}
                                        </strong>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Perception 360 degree feedback</th>

                                                    <th>Bright students’ feedback (A)</th>

                                                    <th>Peer Feedback(B)</th>

                                                    <th>HOD feedback (C)</th>
                                                    <th>Total (E) E=A+B+C</th>
                                                </tr>
                                            </thead>

                                            <thead>
                                                <tr>
                                                    <th>Max Marks</th>

                                                    <th>25</th>

                                                    <th>25</th>

                                                    <th>50</th>
                                                    <th>100</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Marks</td>
                                                    <td>{Dim4.feedbackMarks.A}</td>
                                                    <td>{Dim4.feedbackMarks.B}</td>
                                                    <td>{Dim4.feedbackMarks.C}</td>

                                                    <td>{Dim4.feedbackMarks.E}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            alignItems: "center",
                                            margin: "7em 2em",
                                            marginBottom: "1em",
                                        }}
                                    >
                                        <div
                                            style={{
                                                borderTop: "1px solid black",
                                                width: "15%",
                                                textAlign: "center",
                                            }}
                                        >
                                            Signature
                                        </div>
                                        <div
                                            style={{
                                                borderTop: "1px solid black",
                                                width: "15%",
                                                textAlign: "center",
                                            }}
                                        >
                                            Date
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleExportPDFHOD}
                                    style={{
                                        backgroundColor: "#f32236",
                                        color: "white",
                                        padding: "10px",
                                        // borderRadius: "5px",
                                        border: "none",
                                        width: "150px",
                                        margin: "1em auto",
                                        display: "block",
                                    }}
                                >
                                    Export to PDF
                                </button>
                            </>
                        ) : (
                            ""
                        )}
                        {isHOD && (
                            <div
                                ref={elementRefFaculty}
                                style={{
                                    width: "95%",
                                    // padding:"0 0 2em 0",
                                    border: "1px solid black",
                                    margin: "1em auto",
                                }}
                            >
                                <AllSteps fullName={name} year={year2} showComments={true} />
                                <button
                                    onClick={handleExportPDFFaculty}
                                    style={{
                                        backgroundColor: "#f32236",
                                        color: "white",
                                        padding: "10px",
                                        // borderRadius: "5px",
                                        border: "none",
                                        width: "150px",
                                        margin: "1em auto",
                                        display: "block",
                                    }}
                                >
                                    Export to PDF
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {user.designation === "Principal" && (
                <div className="flex flex-col items-center justify-center gap-4">
                    {/* Principal content */}
                    <div className="flex flex-col items-center justify-evenly m-4">
                        <form
                            className="flex items-center justify-center"
                            onSubmit={handleDeptSubmit}
                        >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={allDept}
                                sx={{ width: 300, display: "inline-block" }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Enter Department" />
                                )}
                            />
                            <button type="submit" className="find-faculty-btn">
                                View Faculty
                            </button>
                        </form>
                        {selectedDept && (
                            <form
                                className="flex items-center justify-center mt-4"
                                onSubmit={handlePrincipalSubmit}
                            >
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={faculty}
                                    sx={{ width: 300, display: "inline-block" }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Enter Faculty Name" />
                                    )}
                                />
                                <button type="submit" className="find-faculty-btn">
                                    Find Faculty
                                </button>
                            </form>
                        )}
                        {!selectedFaculty && (
                            <div className="flex flex-col items-center justify-center mt-8">
                                <h2>
                                    {notFound
                                        ? "No Faculty Found"
                                        : "Select Department and Faculty to view and print their Confidential Report"}
                                </h2>
                                <img
                                    src={notFound ? Notfound : Done}
                                    alt="not found"
                                    width="550px"
                                />
                            </div>
                        )}
                        {selectedFaculty && (
                            <div className="dropdown">
                                <div>Select a Year:</div>
                                <select
                                    id="dropdown"
                                    value={year3}
                                    onChange={(e) => setYear3(e.target.value)}
                                >
                                    <option value="">--Select Assessment year--</option>
                                    {years3.map((item) => {
                                        return (
                                            <option value={item.yearofAssesment}>
                                                {item.yearofAssesment}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}
                    </div>

                    {report && (
                        <>
                            <div className="switch-container">
                                {/* <h4>Hide Previous Dimensions</h4> */}
                                <label class="switch">
                                    <input type="checkbox" value={toggle} onChange={togglecheckbox} />
                                    <span class="slider round"></span>
                                </label>
                                <h4>Show Previous Dimensions</h4>
                            </div>
                            {toggle && (
                                <div
                                    style={{
                                        width: "95%",
                                        border: "1px solid black",
                                        margin: "1em auto",
                                    }}
                                >
                                    <AllSteps fullName={nameForPrincipal} year={year3} isPrincipal={!isHOD} />
                                </div>
                            )}
                            <div
                                ref={elementRefPrincipal}
                                style={{
                                    width: "95%",
                                    // padding:"0 0 2em 0",
                                    border: "1px solid black",
                                    margin: "1em auto",
                                }}
                            >
                                <img
                                    src={HeaderImage}
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        width: "70%",
                                    }}
                                />

                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="text-xl font-extrabold mt-3">
                                        Confidential Report for {report.facultyName} (
                                        {report.yearofAssesment})
                                    </h1>
                                    {/* <Table striped bordered style={{ margin: "1rem", width: "95%" }}> */}
                                    {isHOD && (
                                        <table>
                                            <thead>
                                                <th colSpan={5} className="table-heading">
                                                    Dimension 4: Perception/ 360 degree feedback
                                                </th>
                                            </thead>
                                            <thead>
                                                <tr>
                                                    <th>Perception 360 degree feedbacks</th>
                                                    <th>Bright students’ feedback (A)</th>
                                                    <th>Peer Feedback (B)</th>
                                                    <th>HOD feedback (C)</th>
                                                    <th>Total (E) E=A+B+C</th>
                                                </tr>
                                                <tr>
                                                    <th>Max Marks</th>
                                                    <th>25</th>
                                                    <th>25</th>
                                                    <th>50</th>
                                                    <th>100</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Marks</td>
                                                    {Object.keys(report.Dimension4.feedbackMarks).map(
                                                        (mark, index) => {
                                                            return (
                                                                <td key={index}>
                                                                    {report.Dimension4.feedbackMarks[mark]}
                                                                </td>
                                                            );
                                                        }
                                                    )}
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}

                                    <table
                                        style={{
                                            maxWidth: "95%",
                                            // margin: "0em auto",
                                            marginTop: "1em",
                                        }}
                                    >
                                        <thead>
                                            {!isHOD && (
                                                <tr>
                                                    <th
                                                        className="table-header text-center align-middle"
                                                        style={{ overflowWrap: "anywhere" }}
                                                    >
                                                        HOD Remarks
                                                    </th>
                                                    <th
                                                        className="table-header text-left align-middle"
                                                        colSpan={3}
                                                    >
                                                        {report.Dimension4.confidentialReport.HODRemarks}
                                                    </th>
                                                </tr>
                                            )}
                                            <tr>
                                                <th
                                                    className="table-header text-center align-middle"
                                                    rowSpan={6}
                                                >
                                                    Principal Remarks
                                                </th>
                                                <th className="table-header text-center align-middle">
                                                    Multiplier factor (F)
                                                </th>
                                                <th className="table-header text-center align-middle">
                                                    Details
                                                </th>
                                                <th
                                                    className="table-header text-center align-middle"
                                                    rowSpan={6}
                                                >
                                                    Marks E * F
                                                </th>
                                            </tr>
                                            <tr>
                                                <td className="table-content table-data text-center align-middle">
                                                    1
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    Strongly agree: Contributor/ motivate others
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="table-content table-data text-center align-middle">
                                                    0.95
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    Agree: performer / self-motivated
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="table-content table-data text-center align-middle">
                                                    0.90
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    Neutral: committed / complete the tasks
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="table-content table-data text-center align-middle">
                                                    0.85
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    Disagree: low commitments/ needs follow ups{" "}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="table-content table-data text-center align-middle">
                                                    0.80
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    Strongly disagree: not committed / needs frequent
                                                    follow up
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                    {/* </Table> */}
                                    <div
                                        className="dimhead"
                                        style={{
                                            backgroundColor: "#fabf8f",
                                            margin: "0em auto",
                                            padding: "0.4em 0.4em",
                                            width: "95%",
                                        }}
                                    >
                                        <strong>
                                            {" "}
                                            Perception Marks out of 100 (G) :{" "}
                                            {
                                                report.Dimension4.confidentialReport.perceptionMarks
                                            }{" "}
                                        </strong>
                                    </div>
                                    <table
                                        style={{
                                            width: "95%",
                                            margin: "0em auto",
                                        }}
                                    >
                                        {/* <Table bordered style={{ margin: "1rem", width: "95%" }}> */}
                                        <thead>
                                            <tr>
                                                <th className="table-header text-center align-middle">
                                                    Dimension
                                                </th>
                                                <th className="table-header text-center align-middle">
                                                    Total Marks
                                                </th>
                                                <th className="table-header text-center align-middle">
                                                    Multiplying factor as per cadre
                                                </th>
                                                <th className="table-header text-center align-middle">
                                                    Total Marks
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="table-content table-data text-center align-middle">
                                                    Academics
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension1.totalMarks.toFixed(
                                                        2
                                                    )}
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension1.multiplyingFactor.toFixed(
                                                        2
                                                    )}
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension1.finalMarks.toFixed(
                                                        2
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="table-content table-data text-center align-middle">
                                                    Research and Development
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension2.totalMarks.toFixed(
                                                        2
                                                    )}
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension2.multiplyingFactor.toFixed(
                                                        2
                                                    )}
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension2.finalMarks.toFixed(
                                                        2
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="table-content table-data text-center align-middle">
                                                    Administration and Outreach
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension3.totalMarks.toFixed(
                                                        2
                                                    )}
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension3.multiplyingFactor.toFixed(
                                                        2
                                                    )}
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension3.finalMarks.toFixed(
                                                        2
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="table-content table-data text-center align-middle">
                                                    Perception/ 360 degree feedback
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension4.totalMarks.toFixed(
                                                        2
                                                    )}
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension4.multiplyingFactor.toFixed(
                                                        2
                                                    )}
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.dimension4.finalMarks.toFixed(
                                                        2
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3} className="table-content table-data text-center align-middle">
                                                    Bonus Marks Given By Principal
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.Dimension4.confidentialReport.bonusMarks.toFixed(2)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className="table-content table-data text-center align-middle"
                                                    colSpan={3}
                                                >
                                                    Grand Total (Faculty rating out of 100)
                                                </td>
                                                <td className="table-content table-data text-center align-middle">
                                                    {report.finalGrandTotal.GrandTotal.toFixed(2)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="table-content table-data text-center align-middle">
                                                    Principal Remarks
                                                </td>
                                                <td
                                                    className="table-content table-data text-center align-middle"
                                                    colSpan={3}
                                                >
                                                    {report.Dimension4.confidentialReport.principalComments}
                                                </td>
                                            </tr>
                                        </tbody>
                                        {/* </Table> */}
                                    </table>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            alignItems: "center",
                                            margin: "7em 2em",
                                            marginBottom: "1em",
                                            width: "95%",
                                        }}
                                    >
                                        <div
                                            style={{
                                                borderTop: "1px solid black",
                                                width: "15%",
                                                textAlign: "center",
                                            }}
                                        >
                                            Signature
                                        </div>
                                        <div
                                            style={{
                                                borderTop: "1px solid black",
                                                width: "15%",
                                                textAlign: "center",
                                            }}
                                        >
                                            Date
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {report ? (
                                <button
                                    onClick={handleExportPDFPrincipal}
                                    style={{
                                        backgroundColor: "#f32236",
                                        color: "white",
                                        padding: "10px",
                                        // borderRadius: "5px",
                                        border: "none",
                                        width: "150px",
                                        margin: "1em auto",
                                        display: "block",
                                    }}
                                >
                                    Export to PDF
                                </button>
                            ) : (
                                ""
                            )}
                        </>
                    )}
                </div>
            )}

            {user.designation != "HOD" && user.designation != "Principal" && (
                <>
                    <div>{/* Faculty content */}</div>
                    {years ? (
                        <div className="dropdown">
                            <div>Select a Year:</div>
                            <select
                                id="dropdown"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <option value="">--Select Assessment year--</option>
                                {years.map((item) => {
                                    return (
                                        <option value={item.yearofAssesment}>
                                            {item.yearofAssesment}
                                        </option>
                                    );
                                })}
                                {/* // <option value="">-- Select Assessment Year --</option>
                    // <option value="Existing Client">Existing Client</option>
                    // <option value="Potential Client">Potential Client</option> */}
                            </select>
                        </div>
                    ) : (
                        <div>LOADING</div>
                    )}
                    <div>
                        {history ? (
                            <>
                                <div style={{
                                    margin: "1em",
                                    padding: "0.4em 0.4em",
                                }}>
                                    <Stack sx={{ width: "100%", margin: "1rem 0", textAlign: 'left' }} spacing={2}>
                                        <Alert severity="error">
                                            <AlertTitle><h4 style={{ fontWeight: 'bolder', fontSize: '23px' }}>Comments (Latest to Oldest)</h4></AlertTitle>
                                            {history.HODcomments.map((comment, index) => (
                                                <h4 style={{ fontWeight: 'bolder', fontSize: '20px' }}>{index + 1}. {comment}</h4>
                                            ))}
                                        </Alert>
                                    </Stack>
                                </div>
                                <div
                                    ref={elementRefFaculty}
                                    style={{
                                        width: "95%",
                                        // padding:"0 0 2em 0",
                                        border: "1px solid black",
                                        margin: "1em auto",
                                    }}
                                >
                                    <AllSteps fullName={user.fullName} year={year} />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            alignItems: "center",
                                            margin: "7em 2em",
                                            marginBottom: "1em",
                                        }}
                                    >
                                        <div
                                            style={{
                                                borderTop: "1px solid black",
                                                width: "15%",
                                                textAlign: "center",
                                            }}
                                        >
                                            Signature
                                        </div>
                                        <div
                                            style={{
                                                borderTop: "1px solid black",
                                                width: "15%",
                                                textAlign: "center",
                                            }}
                                        >
                                            Date
                                        </div>
                                    </div>
                                </div>

                            </>) : (
                            ""
                        )}
                    </div>
                </>
            )}
            {history ? (
                <button
                    onClick={handleExportPDFFaculty}
                    style={{
                        backgroundColor: "#f32236",
                        color: "white",
                        padding: "10px",
                        // borderRadius: "5px",
                        border: "none",
                        width: "150px",
                        margin: "1em auto",
                        display: "block",
                    }}
                >
                    Export to PDF
                </button>
            ) : (
                ""
            )}
        </>
    );
};

{
    /* <th colSpan={10} className="table-heading">Total Marks: {history.Dimension2.RP5.totalMarks}</th> */
}

{
    /* <th colSpan={10} className="table-heading">Total Marks: {history.Dimension2.RP5.totalMarks}</th> */
}
export default ViewHistory;

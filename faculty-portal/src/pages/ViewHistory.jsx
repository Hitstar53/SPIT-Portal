import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import TextField from "@mui/material/TextField";
import { useRef } from 'react';
import "../styles/History.css"
import Table from "react-bootstrap/Table";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import DoneIcon from '@mui/icons-material/Done';
import HeaderImage from '../assets/spit.png';
import Autocomplete from "@mui/material/Autocomplete";
import Done from "../assets/project-is-done.png"
import Notfound from "../assets/404-not-found.png" 

const ViewHistory = () => {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("")
    const [history, setHistory] = useState();
    const [selectedValue, setSelectedValue] = useState("");
    //For faculty
    const [year, setYear] = useState("");
    const [years, setYears] = useState([])
    //For HOD
    const [year2, setYear2] = useState("");
    const [years2, setYears2] = useState([]);
    const [Dim4, setDim4] = useState();
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

    const [facultyName, setfacultyName] = useState([]);
    // const pdfExportComponent = useRef(null);
    //for adding print function
    const myvar = "HOD"
    const elementRefHOD = useRef();
    const elementRefPrincipal = useRef();
    const elementRefFaculty = useRef();

    const handleExportPDFHOD = useReactToPrint({
        content: () => elementRefHOD.current,
        // onAfterPrint: alert("Printed Successfully"),
        documentTitle: `${user.department}_${name}_${year2}_AppraisalForm_byHOD`,
    })
    const handleExportPDFPrincipal = useReactToPrint({
        content: () => elementRefPrincipal.current,
        // onAfterPrint: alert("Printed Successfully"),
        documentTitle: `${principalDepartment}_${nameForPrincipal}_${year3}_AppraisalForm_byPrincipal`,
    })
    const handleExportPDFFaculty = useReactToPrint({
        content: () => elementRefFaculty.current,
        // onAfterPrint: alert("Printed Successfully"),
        documentTitle: `${user.department}_${user.fullName}_${year}_AppraisalForm_bySelf`,
    })

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
        }, [])

        useEffect(() => {
            console.log("name: ", name);
        }, [name])
        useEffect(() => {
            console.log("Years of that teacher : ", years2);
        }, [years2])

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





    }
    else {
        useEffect(() => {
            console.log("Inside UseEffect")
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
                const endpoint = 'http://localhost:5000/api/faculty/appraisal/getappraisal';
                // const payload = JSON.parse(localStorage.getItem('user'));
                await axios.post(endpoint, {
                    facultyName: user.fullName,
                    yearofAssesment: year,

                }).then((response) => {
                    console.log(response.data);
                    setHistory(response.data);
                });
            }
            fetchHistory();
        }, [year])
    }


    const handleOption = async () => {
        console.log(year3)
        const fetchHODData = async () => {
            const endpoint = 'http://localhost:5000/api/faculty/appraisal/getappraisal';
            await axios.post(endpoint, {
                yearofAssesment: year2,
                facultyName: name,
                // facultyName: "Mahesh Patil"
            }).then((response) => {
                console.log("here");
                console.log(response.data);
                setDim4(response.data.Dimension4);
                console.log(Dim4);
            });
        }

        const fetchPrincipalData = async () => {
            const endpoint = 'http://localhost:5000/api/faculty/appraisal/getappraisal';
            await axios.post(endpoint, {
                yearofAssesment: year3,
                facultyName: nameForPrincipal,
                // facultyName: "Mahesh Patil"
            }).then((response) => {
                console.log("here");
                console.log(response.data);
                setReport(response.data);
                console.log(Dim4);
            }).catch((err) => {
                console.log(err);
            });
        }
        if (user.designation === "HOD") {
            fetchHODData();
        }
        if (user.designation === "Principal") {
            fetchPrincipalData();
        }
    }
    useEffect(() => {
        console.log("Faculty Year :", year);
        handleOption();
    }, [year2, year3])

    // useEffect(() => {
    //     console.log("Faculty Year :", year);
    //     handleOption();
    // }, [year])

    // For Principal Select Box 
    if (user.designation === "Principal") {
        useEffect (() => {
            const getDept = async () => {
                await axios.get("http://localhost:5000/api/faculty/get/faculty/getalldepartments")
                .then((res) => {
                    console.log(res.data)
                    setAllDept(res.data)
                })
                .catch((err) => console.log(err))
            }
            getDept()
        },[])
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
        console.log(dept)
        await axios.post("http://localhost:5000/api/faculty/get/faculty/submitted", {
            department: dept,
        })
        .then((res) => {
            console.log(res.data)
            setFaculty(res.data.sort())
            setSelectedDept(true)
        })
        .catch((err) => {
            console.log(err)
            setFaculty([])
            setSelectedDept(false)
            setMessage("No Faculty Found")
        })
    }

    const getYears = async (name) => {
        console.log("Inside GetYears")
        console.log("Name on LIne 86", name)
        await fetch("http://localhost:5000/api/faculty/appraisal/get-hod-appraisal-year", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                facultyName: name,
            }),
        })
            .then((res) => res.json())
            .then((data) => setYears2(data))
    }

    const getPrincipalYears = async (name) => {
        console.log("Inside GetYears")
        console.log("Name on LIne 86", name)
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
            .then((data) => {setYears3(data),(data.length > 0 && setSelectedFaculty(true)), (data.length == 0 && setNotFound(true))})
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target[0].value)
        setName(e.target[0].value)
        setYear2(null)
        getYears(e.target[0].value);
        setSelectedFaculty(true);
    }

    const handleDeptSubmit = (e) => {
        e.preventDefault();
        console.log("You clicked submit.");
        console.log(e.target[0].value);
        setPrincipalDepartment(e.target[0].value)
        getPrincipalFaculty(e.target[0].value)
    }

    const handlePrincipalSubmit = (e) => {
        e.preventDefault();
        console.log("You clicked submit.");
        console.log(e.target[0].value);
        setYear3(null)
        setNameForPrincipal(e.target[0].value)
        getPrincipalYears(e.target[0].value);
        // setSelectedFaculty(true);
    }

    useEffect(() => {
        console.log(years2)
    }, [years2])

    return (
        <>
            {/* {if(user.designation == "HOD"){
                
            }
            } */}
            {user.designation === "HOD" && (
                <>

                    {console.log("Inside HOD")}
                    <div style={{
                        display: "flex flex-col items-center justify-center",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "100%",
                    }}>
                        <div className="dept-appraisal2" >
                            <form onSubmit={handleSubmit}>
                                <div className="dept-appraisal-header" style={{
                                    width: "100%",
                                }}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={facultyName}
                                        sx={{ width: 300, display: "inline-block" }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Faculty Name" />
                                        )}
                                    />
                                    <button type="submit" className="find-faculty-btn" style={{
                                        display: "inline-block",
                                        width: "200px",
                                    }}>
                                        Find Faculty
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* {( */}
                        {selectedFaculty && (<div className="dropdown justify-center pt-0">
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
                        </div>)}
                    </div>
                    {/* )} */}

                    {!year2 || !name ? (<p style={{
                        textAlign: "center",
                        fontSize: "20px",
                    }}>Please Select Faculty Name and the Year of Assessment.</p>) : ("")}

                    {/* tables start here */}

                    <div>
                        {
                            Dim4 ? (
                                <>
                                    <div ref={elementRefHOD} style={{
                                        width: "95%",
                                        // padding:"0 0 2em 0",
                                        border: "1px solid black",
                                        margin: "1em auto",
                                    }}>
                                        
                                        <img
                                            src={HeaderImage}
                                            style={{
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                                width: "70%",
                                            }}
                                        />

                                        <h1 className='text-xl font-extrabold mt-3' style={
                                            {
                                                textAlign: "center",
                                            }
                                        }>Feedback Marks for {name} ({year2})</h1>
                                        {/* <Table striped bordered style={{ margin: "1rem", width: "95%" }}> */}
                                        <div
                                            className="dimhead"
                                            style={{
                                                backgroundColor: "#fabf8f",
                                                margin: "1em",
                                                padding: "0.4em 0.4em",
                                            }}
                                        >
                                            <strong> Dimension 4: Perception/ 360 degree feedback </strong>
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

                                                        <th>Bright students’ feedback
                                                            (A)</th>

                                                        <th>Peer Feedback(B)</th>

                                                        <th>HOD feedback
                                                            (C)
                                                        </th>
                                                        <th>Total
                                                            (E)
                                                            E=A+B+C
                                                        </th>
                                                    </tr>

                                                </thead>

                                                <thead>
                                                    <tr>
                                                        <th>Max Marks</th>

                                                        <th>25</th>

                                                        <th>25</th>


                                                        <th>50
                                                        </th>
                                                        <th>100
                                                        </th>
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


                            ) : ("")
                        }
                    </div>
                </>
            )}

            {user.designation === "Principal" && (
                <div className='flex flex-col items-center justify-center gap-4'>
                    {/* Principal content */}
                    {/* {/* <h1>Principal</h1> */}
                    {/* <p>Welcome, Principal!</p> */}
                    <div className='flex flex-col items-center justify-evenly m-4'>

                        <form className='flex items-center justify-center' onSubmit={handleDeptSubmit}>
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
                             <form className='flex items-center justify-center mt-4' onSubmit={handlePrincipalSubmit}>
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
                            <h2>{notFound ? "No Faculty Found" : "Select Department and Faculty to view and print their Confidential Report"}</h2>
                            <img src={notFound ? Notfound : Done} alt="not found" width="550px"/>
                        </div>
                        )}
                        {selectedFaculty &&
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
                            </div>}
                    </div>

                    {report && (
                        <>
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
                                
                                <div className='flex flex-col items-center justify-center'>
                                    <h1 className='text-xl font-extrabold mt-3'>Confidential Report for {report.facultyName} ({report.yearofAssesment})</h1>
                                    {/* <Table striped bordered style={{ margin: "1rem", width: "95%" }}> */}


                                    <table style={{
                                        maxWidth: "95%",
                                        margin: "0em auto",
                                        marginTop: "1em",
                                    }}>
                                        <thead>
                                            <tr>
                                                <th className='table-header text-center align-middle' style={{overflowWrap: "anywhere",}}>HOD Remarks</th>
                                                <th className='table-header text-left align-middle' colSpan={3}>{report.Dimension4.confidentialReport.HODRemarks}</th>
                                            </tr>
                                            <tr>
                                                <th className='table-header text-center align-middle' rowSpan={6}>Principal Remarks</th>
                                                <th className='table-header text-center align-middle'>Multiplier factor (F)</th>
                                                <th className='table-header text-center align-middle'>Details</th>
                                                <th className='table-header text-center align-middle' rowSpan={6}>Marks E * F</th>
                                            </tr>
                                            <tr>
                                                <td className='table-content table-data text-center align-middle'>1</td>
                                                <td className='table-content table-data text-center align-middle'>Strongly agree: Contributor/ motivate others</td>
                                            </tr>
                                            <tr>
                                                <td className='table-content table-data text-center align-middle'>0.95</td>
                                                <td className='table-content table-data text-center align-middle'>Agree: performer / self-motivated</td>
                                            </tr>
                                            <tr>
                                                <td className='table-content table-data text-center align-middle'>0.90</td>
                                                <td className='table-content table-data text-center align-middle'>Neutral: committed / complete the tasks</td>
                                            </tr>
                                            <tr>
                                                <td className='table-content table-data text-center align-middle'>0.85</td>
                                                <td className='table-content table-data text-center align-middle'>Disagree: low commitments/ needs follow ups </td>
                                            </tr>
                                            <tr>
                                                <td className='table-content table-data text-center align-middle'>0.80</td>
                                                <td className='table-content table-data text-center align-middle'>Strongly disagree: not committed / needs frequent follow up</td>
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
                                        <strong> Perception Marks out of 100 (G) : {report.Dimension4.confidentialReport.perceptionMarks} </strong>
                                    </div>
                                    <table style={{
                                        width: "95%",
                                        margin: "0em auto",
                                    }}>
                                        {/* <Table bordered style={{ margin: "1rem", width: "95%" }}> */}
                                        <thead>
                                            <tr>
                                                <th className='table-header text-center align-middle'>Dimension</th>
                                                <th className='table-header text-center align-middle'>Total Marks</th>
                                                <th className='table-header text-center align-middle'>Multiplying factor as per cadre</th>
                                                <th className='table-header text-center align-middle'>Total Marks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='table-content table-data text-center align-middle'>Dimension 1</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension1.totalMarks.toFixed(2)}</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension1.multiplyingFactor.toFixed(2)}</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension1.finalMarks.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className='table-content table-data text-center align-middle'>Dimension 2</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension2.totalMarks.toFixed(2)}</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension2.multiplyingFactor.toFixed(2)}</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension2.finalMarks.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className='table-content table-data text-center align-middle'>Dimension 3</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension3.totalMarks.toFixed(2)}</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension3.multiplyingFactor.toFixed(2)}</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension3.finalMarks.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className='table-content table-data text-center align-middle'>Dimension 4</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension4.totalMarks.toFixed(2)}</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension4.multiplyingFactor.toFixed(2)}</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.dimension4.finalMarks.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className='table-content table-data text-center align-middle' colSpan={3}>Grand Total (Faculty rating out of 100)</td>
                                                <td className='table-content table-data text-center align-middle'>{report.finalGrandTotal.GrandTotal.toFixed(2)}</td>
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
                            {
                                report ? (
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
                                )
                            }
                        </>
                    )}
                </div>
            )}

            {user.designation != "HOD" && user.designation != "Principal" && (
                <>
                    <div>
                        {/* Faculty content */}
                       
                        
                    </div>
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
                            <div
                                ref={elementRefFaculty}
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

                                <div>
                                    <table
                                        style={{
                                            // border:"2px solid red",
                                            margin: "0 auto",
                                            width: "85%",
                                        }}
                                    >
                                        <thead>
                                            <tr>
                                                <th>Year of Assessment:</th>
                                                <th
                                                    style={{
                                                        backgroundColor: "white",
                                                    }}
                                                >
                                                    {history.yearofAssesment}
                                                </th>
                                                <th>Department</th>
                                                <th
                                                    style={{
                                                        backgroundColor: "white",
                                                    }}
                                                >
                                                    {history.department}
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>Name of Faculty</th>
                                                <th
                                                    style={{
                                                        backgroundColor: "white",
                                                    }}
                                                >
                                                    {history.facultyName}
                                                </th>
                                                <th>Designation</th>
                                                <th
                                                    style={{
                                                        backgroundColor: "white",
                                                    }}
                                                >
                                                    {history.designation}
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>

                                    {/* ---------------------------------------------------------- */}
                                    <div
                                        className="dimhead"
                                        style={{
                                            backgroundColor: "#fabf8f",
                                            margin: "1em",
                                            padding: "0.4em 0.4em",
                                        }}
                                    >
                                        <strong> Dimension 1: Academics </strong>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            width: "90%",
                                            
                                            flexDirection: "column",
                                        }}
                                    >
                                        <table
                                            style={{
                                                //margin: "1px 0px 0px 1em",
                                                width: "60%",
                                            }}
                                        >
                                            <thead>
                                                <th colSpan={5} className="table-heading">
                                                    AP1: Courses Conducted
                                                </th>
                                            </thead>
                                            <thead>
                                                <tr>
                                                    <th>Sr. No.</th>
                                                    <th>Course Name</th>
                                                    <th>Class</th>
                                                    <th>Semester</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {history.Dimension1.info.courses.map(
                                                    (course, index) => {
                                                        return (
                                                            <>
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{course.name}</td>
                                                                    <td>{course.class}</td>
                                                                    <td>{course.sem}</td>
                                                                </tr>
                                                            </>
                                                        );
                                                    }
                                                )}
                                                <th colSpan={10} className="table-heading">
                                                    AP1 Marks : {history.Dimension1.info.AP1Marks}
                                                </th>
                                            </tbody>
                                        </table>

                                        {/* ---------------------------------------------------------- */}
                                        {/* AP2 */}
                                        <table
                                            style={{
                                               // margin: "1em 0px 0px 1em",
                                                width: "60%",
                                            }}
                                        >
                                            <thead>
                                                <th colSpan={5} className="table-heading">
                                                    AP2 : Course File
                                                </th>
                                            </thead>
                                            <thead>
                                                <tr>
                                                    <th>Marks Obtained</th>
                                                    <th>Average Marks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {history.Dimension1.info.courses.map(
                                                    (course, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{course.AP2MarksObtained}</td>
                                                                {index === 0 && (
                                                                    <td
                                                                        rowSpan={
                                                                            history.Dimension1.info.courses.length
                                                                        }
                                                                    >
                                                                        {history.Dimension1.info.AP2Average}
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                                <th colSpan={10} className="table-heading">
                                                    AP2 Marks : {history.Dimension1.info.AP2Marks}
                                                </th>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* ---------------------------------------------------------------------------AP3 */}
                                    <table>
                                        <thead>
                                            <th colSpan={8} className="table-heading">
                                                AP3:Lecture target achieved. Average for all the
                                                courses taught in one academic year
                                            </th>
                                        </thead>
                                        <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Course Name</th>
                                                <th>Number of lectures targeted</th>
                                                <th>Number of lectures conducted</th>
                                                <th>% of target target achieved</th>
                                                <th>Average % of all Courses</th>
                                                <th>AP3 Marks</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension1.info.courses.map(
                                                (course, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.name}</td>
                                                            <td>{course.AP3LecturesTarget}</td>
                                                            <td>{course.AP3LectureConducted}</td>
                                                            <td>{course.AP3PercentAchieved}</td>
                                                            
                                                            {index === 0 && (
                                                                <td
                                                                    rowSpan={
                                                                        history.Dimension1.info.courses.length
                                                                    }
                                                                >
                                                                    {history.Dimension1.info.AP3Average}
                                                                </td>
                                                            )}
                                                            {index === 0 && (
                                                                <td
                                                                    rowSpan={
                                                                        history.Dimension1.info.courses.length
                                                                    }
                                                                >
                                                                    {history.Dimension1.info.AP3Average}
                                                                </td>
                                                            )}
                                                        </tr>
                                                    );
                                                }
                                            )}
                                            
                                        </tbody>
                                    </table>

                                    {/* ---------------------------------------------------------- AP4*/}

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "1rem",
                                            flexDirection: "column",
                                            width: "60%",
                                            
                                        }}
                                    >
                                        <table>
                                            <thead>
                                                <th colSpan={5} className="table-heading">
                                                    AP4: Courses conducted
                                                </th>
                                            </thead>

                                            <tr>
                                                <th>Sr No.</th>
                                                <th>Sem</th>
                                                <th>Subject</th>
                                                <th>
                                                    <span
                                                        style={{ fontStyle: "normal", fontWeight: "700" }}
                                                    >
                                                        Percentage
                                                        <br />
                                                        Feedback
                                                    </span>
                                                </th>
                                                {/* <th>Average Marks</th> */}
                                            </tr>

                                            <tbody>
                                                {history.Dimension1.info.courses.map(
                                                    (course, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{course.sem}</td>
                                                                <td>{course.name}</td>
                                                                <td>{course.AP4PercentFeedback}</td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                            <th colSpan={10} className="table-heading">
                                                AP4 Marks: {history.Dimension1.info.AP4Marks}
                                            </th>
                                        </table>

                                        {/* ---------------------------------------------------------- AP5*/}
                                        <table>
                                            <thead>
                                                <th colSpan={5} className="table-heading">
                                                    AP5
                                                </th>
                                            </thead>
                                            <tr>
                                                <th>Attendance of students</th>
                                                <th>Average Students</th>
                                            </tr>

                                            <tbody>
                                                {history.Dimension1.info.courses.map(
                                                    (course, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{course.AP5AttendanceStudent}</td>
                                                                {index === 0 && (
                                                                    <td
                                                                        rowSpan={
                                                                            history.Dimension1.info.courses.length
                                                                        }
                                                                    >
                                                                        {history.Dimension1.info.AP5Average}
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                                <th colSpan={10} className="table-heading">
                                                    AP5 Marks: {history.Dimension1.info.AP5Marks}
                                                </th>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* ----------------------------------------------------------------------------- */}

                                    {/* ---------------------------------------------------------- AP6*/}
                                    <table>
                                        <thead>
                                            <th colSpan={2} className="table-heading">
                                                AP6 : Mentoring : Feedback from mentees
                                            </th>
                                        </thead>

                                       
                                        <tbody>
                                             
                                         <th  className="table-heading">
                                                Mentee Feedback Score Average Marks (Out of 5): 
                                            </th>
                                            <th style={{padding:"10px"}}>{history.Dimension1.AP6.averageMarks}</th>
                                        </tbody>

                                        {/* <tbody>
                                            {history.Dimension1.AP6.menteeFeedback.map(
                                                (mf, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{mf}</td>
                                                            {index === 0 && (
                                                                <td
                                                                    rowSpan={
                                                                        history.Dimension1.AP6.menteeFeedback
                                                                            .length
                                                                    }
                                                                >
                                                                    {history.Dimension1.AP6.averageMarks}
                                                                </td>
                                                            )}
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody> */}
                                    </table>
                                    {/* ----------------------------------------------------------------------------- */}
                                    {/* ----------------------------------------------------------------------------AP7- */}
                                    <table className="page-break">
                                        <thead>
                                            <th colSpan={5} className="table-heading">
                                                AP7:Arrange Guest Lectures / co-teaching from industry
                                                (eminent resource person from the respective domain
                                                industry)
                                            </th>
                                        </thead>
                                        <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Date</th>
                                                <th>
                                                    Title of the Guest Lecture 
                                                </th>
                                                <th>Name & Details of the Speaker</th>
                                                <th>Arranged for students/faculty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension1.AP7.guestLectureData.map(
                                                (cor, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{cor.date}</td>
                                                            <td>{cor.title}</td>
                                                            <td>{cor.speakerName}</td>
                                                            <td>{cor.arrangedFor}</td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                            <th colSpan={10} className="table-heading">
                                                Totals Marks: {history.Dimension1.AP7.totalMarks}
                                            </th>
                                        </tbody>
                                    </table>

                                    {/* ----------------------------------------------------------------------------- */}
                                    {/* ---------------------------------------------------------------------------AP8 */}

                                    <table>
                                        <thead>
                                            <th colSpan={5} className="table-heading">
                                                AP8: Remedial teaching for weak students / efforts
                                                towards bright students
                                            </th>
                                        </thead>
                                        <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Sem</th>
                                                <th>Subject</th>
                                                <th>Activity done for remedial </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension1.AP8.remedialData.map(
                                                (course, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.sem}</td>
                                                            <td>{course.subject}</td>
                                                            <td>{course.activityDetails}</td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                            <th colSpan={10} className="table-heading">
                                                Totals Marks: {history.Dimension1.AP8.totalMarks}
                                            </th>
                                        </tbody>
                                    </table>

                                    {/* ----------------------------------------------------------------------------- */}
                                    {/* ---------------------------------------------------------------------------AP9 */}

                                    <table>
                                        <thead>
                                            <th colSpan={6} className="table-heading">
                                                AP9:Noteworthy efforts towards enriching the learning
                                                experience / innovation in TLE methods
                                            </th>
                                        </thead>
                                        <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Sem</th>
                                                <th>Subject</th>
                                                <th>Activity details </th>
                                                <th>Marks out of 10</th>
                                                <th>Average of all courses (filled by auditor)</th>
                                            </tr>
                                            
                                        </thead>
                                        <tbody>
                                            {history.Dimension1.AP9.noteworthyData.map((ref, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{ref.sem}</td>
                                                        <td>{ref.subject}</td>
                                                        <td>{ref.activityDetails}</td>
                                                        <td>{ref.marksOutOf10}</td>
                                                        {index === 0 && (
                                                            <td
                                                                rowSpan={
                                                                    history.Dimension1.AP9.noteworthyData.length
                                                                }
                                                            >
                                                                {history.Dimension1.AP9.average}
                                                            </td>
                                                        )}
                                                    </tr>
                                                );
                                            })}
                                            <th colSpan={6} className="table-heading">
                                                AP9 Total Marks : {history.Dimension1.AP9.average}
                                            </th>
                                        </tbody>
                                    </table>
                                    {/* ---------------------------------------------------------------------------AP10*/}
                                    <table>
                                        <thead>
                                            <th colSpan={5} className="table-heading">
                                                AP10:Question Paper auditing
                                            </th>
                                        </thead>
                                        <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Paper Set for the Course </th>
                                                <th>
                                                    Sr. No. Paper Set for the Course Marks in audit
                                                    report
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension1.AP10.paper.map((rer, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{rer.course}</td>
                                                        <td>{rer.marks}</td>
                                                    </tr>
                                                );
                                            })}
                                            <th colSpan={5} className="table-heading">
                                                Totals Marks: {history.Dimension1.AP10.averageMarks}
                                            </th>
                                            
                                        </tbody>
                                    </table>
                                </div>

                                <div
                                    className="dimhead"
                                    style={{
                                        backgroundColor: "#fabf8f",
                                        margin: "1em",
                                        padding: "0.4em 0.4em",
                                    }}
                                >
                                    <strong>
                                        Total Marks of Dimension 1 :{" "}
                                        {history.Dimension1.totalMarks}{" "}
                                    </strong>
                                </div>
                                {/* //Dimension2 Starts Here */}

                                {/* //RP1 */}
                                <div
                                    className="dimhead"
                                    style={{
                                        backgroundColor: "#fabf8f",
                                        margin: "1em",
                                        padding: "0.4em 0.4em",
                                    }}
                                >
                                    <strong>Dimension 2: Research and Development</strong>
                                </div>
                                <table>
                                    <thead>
                                        <th colSpan={10} className="table-heading">
                                            RP1: Publications
                                        </th>
                                    </thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Paper Title</th>
                                        <th>Journal/ Conference Name</th>
                                        <th>Journal/ Conference</th>
                                        <th>High / Medium <br/>/ Low Repute</th>
                                        <th>Authors</th>
                                        <th>Publisher</th>
                                        <th>Paper Link</th>
                                    </tr>
                                    <tbody>
                                        {history.Dimension2.RP1.papers.map((rp, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{rp.title}</td>
                                                    <td>{rp.conferenceOrJournal.name}</td>
                                                    <td>{rp.conferenceOrJournal.type}</td>
                                                    <td>{rp.conferenceOrJournal.reputation}</td>
                                                    <td>{rp.author}</td>
                                                    <td>{rp.publisher}</td>
                                                    <td>{rp.paperLink}</td>
                                                </tr>
                                            );
                                        })}
                                        <th colSpan={10} className="table-heading">
                                         RP1   Total Marks: {history.Dimension2.RP1.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                {/* //RP2 */}

                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            RP 2: -Patent/books/Monograms/ MOOC (30 marks)
                                        </th>
                                    </thead>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>Patent Obtained</th>
                                                <th>Details</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension2.RP2.patents.map((patent, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{patent.name}</td>
                                                            <td>{patent.details}</td>
                                                            
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                        </tbody>
                                       
                                        <th colSpan={4} className="table-heading">Marks Obtained : {history.Dimension2.RP2.patentMarks}</th>
                                    </table>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th> Books published &nbsp;(Title of the book)</th>
                                                <th>Authors</th>
                                                <th>Publisher</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension2.RP2.books.map((book, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{book.title}</td>
                                                            <td>{book.author}</td>
                                                            <td>{book.publisher}</td>
                                                           
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                        </tbody>
                                        
                                        <th colSpan={5} className="table-heading">Marks Obtained : {history.Dimension2.RP2.booksMarks}</th>
                                    </table>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>MOOC’s attended</th>
                                                <th>Duration (days/week)</th>
                                                <th>Details (Grade,certificate etc)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension2.RP2.moocs.map((mooc, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{mooc.name}</td>
                                                            <td>{mooc.duration}</td>
                                                            <td>{mooc.details}</td>
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                        
                                        <th colSpan={5} className="table-heading">Marks Obtained : {history.Dimension2.RP2.moocsMarks}</th>
                                        </tbody>

                                        
                                    </table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            RP2 Total Marks: {history.Dimension2.RP2.totalMarks}
                                        </th>
                                    </thead>
                                </table>

                                {/* //RP3 */}
                                <table>
                                    <thead>
                                        <th colSpan={10} className="table-heading">
                                            RP3: Sponsored Research and Consultancy
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr.No</th>
                                            <th>Date</th>
                                            <th>Project Title/Consultancy</th>
                                            <th>Sponsoring Agency/Consultant</th>
                                            <th>Details (Govt/ Non-Govt)</th>
                                            <th>Funded Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension2.RP3.sponsored.map(
                                            (courses, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{courses.date}</td>
                                                        <td>{courses.title}</td>
                                                        <td>{courses.agency}</td>
                                                        <td>{courses.details}</td>
                                                        <td>{courses.amount}</td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                    <th colSpan={6} className="table-heading">
                                            RP3 Total Marks: {history.Dimension2.RP3.totalMarks}
                                        </th>
                                </table>

                                {/* //RP4 */}
                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            RP4: Citations
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>
                                                Number of citations in the previous calendar
                                                year * 0.4 Marks
                                            </th>
                                            <th>RP4 Marks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>{history.Dimension2.RP4.number}</td>
                                        <td>{history.Dimension2.RP4.totalMarks}</td>
                                    </tbody>
                                </table>

                                {/* RP5 */}
                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            RP5: Self Development
                                        </th>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>
                                                <span
                                                    style={{ fontStyle: "normal", fontWeight: "700" }}
                                                >
                                                    STTP/FDP/MOOC Courses/Industry Internship
                                                </span>
                                                <br />
                                            </th>
                                            <th>
                                                <font color="#313030">
                                                    Organization details&nbsp;
                                                </font>
                                                <br />
                                            </th>
                                            <th>Dates</th>
                                            <th>
                                                <font color="#313030">No. of days Participation</font>
                                            </th>
                                        </tr>

                                        {history.Dimension2.RP5.selfDevelopment.map(
                                            (sd, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{sd.type}</td>
                                                        <td>{sd.organization}</td>
                                                        <td>{sd.dates}</td>
                                                        <td>{sd.duration}</td>
                                                    </tr>
                                                );
                                            }
                                        )}

                                        <th colSpan={10} className="table-heading">
                                            RP5 Total Marks: {history.Dimension2.RP5.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                {/* RP6 */}

                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            RP6: New Software development / Hardware lab setup
                                            development
                                        </th>
                                    </thead>

                                    <tr>
                                        <th>Sr No.</th>
                                        <th>
                                            <font color="#313030">
                                                Software Developed /Hardware lab setup
                                            </font>
                                            <br />
                                        </th>
                                        <th>
                                            <font color="#313030">Model/ Portal&nbsp;</font>
                                            <br />
                                        </th>
                                        <th>
                                            <font color="#313030">Details of the setup</font>
                                            <br />
                                        </th>
                                    </tr>
                                    <tbody>
                                        {history.Dimension2.RP6.softHardDev.map((sw, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{sw.type}</td>
                                                    <td>{sw.model}</td>
                                                    <td>{sw.details}</td>
                                                </tr>
                                            );
                                        })}
                                        <th colSpan={10} className="table-heading">
                                           RP6 Total Marks: {history.Dimension2.RP6.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                {/* 
                    RP7 */}
                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            RP7: Any activity not covered.
                                        </th>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Date</th>
                                            <th>
                                                Details &nbsp; (Faculty claim needs to be approved by
                                                HOD /Senior most faculty)
                                            </th>
                                        </tr>
                                        {history.Dimension2.RP7.activityNotCovered.map(
                                            (sd, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{sd.date}</td>
                                                        <td>{sd.details}</td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading">
                                        RP7 Total Marks: {history.Dimension2.RP7.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                <div
                                    className="dimhead"
                                    style={{
                                        backgroundColor: "#fabf8f",
                                        margin: "1em",
                                        padding: "0.4em 0.4em",
                                    }}
                                >
                                    <strong>
                                        Total Marks of Dimension 2 :{" "}
                                        {history.Dimension2.totalMarks}{" "}
                                    </strong>
                                </div>

                                <div
                                    className="dimhead"
                                    style={{
                                        backgroundColor: "#fabf8f",
                                        margin: "1em",
                                        padding: "0.4em 0.4em",
                                    }}
                                >
                                    <strong>Dimension 3: Administration and Outreach</strong>
                                </div>
                                {/* 
                    Dimension 3 starts */}
                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            Dimension 3
                                        </th>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Administrative role executed</th>
                                            <th>Tick</th>
                                            <th>Marks</th>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <th colSpan={5} className="table-heading" style={{textAlign:"center"}}>
                                            IP1 : Institute level assignments
                                        </th>
                                    </thead>

                                    {history.Dimension3.IP1.map((sd, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td className="lefty">{sd.role}</td>
                                                <td>{sd.tick ? <DoneIcon /> : ""}</td>
                                                <td>20</td>
                                            </tr>
                                        );
                                    })}

                                    <thead>
                                        <th colSpan={5} className="table-heading"  style={{textAlign:"center"}}>
                                            IP2 : Other Institute level assignments 
                                        </th>
                                    </thead>

                                    <tbody>
                                        {history.Dimension3.IP2.map((sd, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className="lefty">{sd.role}</td>
                                                    <td>{sd.tick ? <DoneIcon /> : ""}</td>
                                                    <td>10</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <thead>
                                        <th colSpan={5} className="table-heading" style={{textAlign:"center"}}>
                                            DP1 : Other Institute level assignments
                                        </th>
                                    </thead>

                                    <tbody>
                                        {history.Dimension3.DP1.map((sd, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className="lefty">{sd.role}</td>
                                                    <td>{sd.tick ? <DoneIcon /> : ""}</td>
                                                    <td>10</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <th colSpan={10} className="table-heading" style={{textAlign:"center"}}>
                                        Total of IP1, IP2, DP1 :{" "}
                                        {history.Dimension3.totalIP1IP2DP1Marks}
                                    </th>
                                </table>
                                {/* 
                    Dimension 3 OP1*/}
                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            OP1: Organized training for Industry/External learners
                                        </th>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>FDP/Training Organised</th>
                                            <th>Sponsoring Agency</th>
                                            <th>Funds</th>
                                            <th>No. of days</th>
                                        </tr>
                                        {history.Dimension3.OP1.organized.map((sd, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{sd.name}</td>
                                                   
                                                    <td>{sd.sponsorerName}</td>
                                                    <td>{sd.fund}</td>
                                                    <td>{sd.days}</td>
                                                </tr>
                                            );
                                        })}
                                        <th colSpan={10} className="table-heading" >
                                            TotalMarks : {history.Dimension3.OP1.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                {/* Dimension 3 institute */}

                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            OP2:Invited as visiting /Guest faculty for delivering a
                                            course in industry/ institute
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Industry/ Institution Name</th>
                                            <th>Dates</th>
                                            <th>Details (No. of participants, affiliation)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.Invited.invitedAt.map(
                                            (course, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.industryName}</td>
                                                            <td>{course.dates}</td>
                                                            <td>{course.details}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks : {history.Dimension3.Invited.totalMarks}
                                        </th>
                                    </tbody>
                                </table>
                                 {/* Dimension op3  */}
                                 <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            OP3:Received Sponsored FDP
                                        </th>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>FDP/Training Organised</th>
                                            <th>Sponsoring Agency</th>
                                            <th>Funded Amount</th>
                                            <th>No. of days</th>
                                        </tr>
                                        {history.Dimension3.op3.receivedFDP.map((sd, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{sd.name}</td>
                                                   
                                                    <td>{sd.sponsorerName}</td>
                                                    <td>{sd.fund}</td>
                                                    <td>{sd.days}</td>
                                                </tr>
                                            );
                                        })}
                                        <th colSpan={10} className="table-heading" >
                                            TotalMarks : {history.Dimension3.op3.totalMarks}
                                        </th>
                                    </tbody>
                                </table>
                               {/* Dimension 3 invited as */} 
                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                           OP4: Invited talk as Guest faculty
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Industry/ Institution Name</th>
                                            <th>Dates</th>
                                            <th>Details (Title , No. of participants, <br/>affiliation) etc</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.op4.invitedTalk.map(
                                            (course, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.industryName}</td>
                                                            <td>{course.dates}</td>
                                                            <td>{course.details}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks : {history.Dimension3.op4.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                {/* Dimension 3 committee */}

                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            OP5:Part of selection committee / inquiry/ academic audit /
                                            examiner panel/ BOS /AC/LIC/ RRC meetings/ external
                                            Auditor
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Part of any selection committee</th>
                                            <th>Details (Nature of work)</th>
                                            <th>Organization</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.Partof.committee.map(
                                            (course, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.name}</td>
                                                            <td>{course.details}</td>
                                                            <td>{course.organization}</td>

                                                            <td>{course.date}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading" >
                                            Total Marks : {history.Dimension3.Partof.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                {/* Dim 3 Article */}
                                <table>
                                    <thead>
                                        <th colSpan={2} className="table-heading">
                                         OP6:Article in media/ newspaper to boost Institution's Image
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.Article.articleDetails.map(
                                            (art, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{art.name}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks : {history.Dimension3.Article.totalMarks}
                                        </th>
                                    </tbody>
                                </table>
                                {/* Dim 3 NGO */}
                                <table>
                                    <thead>
                                        <th colSpan={2} className="table-heading">
                                         OP7:Any noteworthy work with NGO
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.ngo.data.map(
                                            (art, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{art.details}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks : {history.Dimension3.ngo.totalMarks}
                                        </th>
                                    </tbody>
                                </table>
                                {/* Dim 3 Coguide */}

                                <table>
                                    <thead>
                                        <th colSpan={3} className="table-heading">
                                            OP8:Co-guide for student projects and dissertations in the
                                            peer institutions
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Peer Institution Name</th>
                                            <th>Details (Program etc)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.coGuide.data.map((cg, index) => {
                                            return (
                                                <>
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{cg.institutionName}</td>
                                                        <td>{cg.details}</td>
                                                    </tr>
                                                </>
                                            );
                                        })}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks : {history.Dimension3.coGuide.totalMarks}
                                        </th>
                                        <tr></tr>
                                    </tbody>
                                </table>

                                {/* Dim 3 Academic collabartion */}

                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                         OP9: Any academic collaboration with the other institutions
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Industry/ Institution Name</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.collaboration.institutionDetails.map(
                                            (course, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.name}</td>
                                                            <td>{course.details}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks :{" "}
                                            {history.Dimension3.collaboration.totalMarks}
                                        </th>
                                    </tbody>
                                </table>
                                <div
                                    className="dimhead"
                                    style={{
                                        backgroundColor: "#fabf8f",
                                        margin: "1em",
                                        padding: "0.4em 0.4em",
                                    }}
                                >
                                    <strong>
                                        Total Marks Dimension 3 : {history.Dimension3.totalMarks}
                                    </strong>
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
                        ) : (
                            ""
                        )}
                    </div>
                </>
            )}
            {
                history ? (
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
                )
            }
        </>
    );
}


{/* <th colSpan={10} className="table-heading">Total Marks: {history.Dimension2.RP5.totalMarks}</th> */ }

{/* <th colSpan={10} className="table-heading">Total Marks: {history.Dimension2.RP5.totalMarks}</th> */ }
export default ViewHistory
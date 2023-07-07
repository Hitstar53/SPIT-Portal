import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useRef } from 'react';
import "../styles/History.css"
import { drawDOM, exportPDF } from "@progress/kendo-drawing";
import { saveAs } from "@progress/kendo-file-saver";
import DoneIcon from '@mui/icons-material/Done';

const ViewHistory = () => {
    const { user } = useContext(UserContext);
    const [history, setHistory] = useState();
    const [selectedValue, setSelectedValue] = useState("");
    const [year, setYear] = useState("");
    const [years, setYears] = useState([])
    // const pdfExportComponent = useRef(null);
    const elementRef = useRef(null);
    const exportElement = (element, options) => {
        drawDOM(element, options)
            .then((group) => {
                return exportPDF(group);
            })
            .then((dataUri) => {
                saveAs(dataUri, "export.pdf");
            });
    }
    const handleExportPDF = () => {
        exportElement(elementRef.current, {
            // forcePageBreak: ".page-break",
            paperSize: "A4",
            margin: "2mm"
        });
    };

    useEffect(() => {
        const fetchHistory = async () => {
            const endpoint = 'http://localhost:5000/api/faculty/appraisal/getallappraisal';
            // const payload = JSON.parse(localStorage.getItem('user'));
            await axios.post(endpoint, {
                facultyName: "Mahesh Patil",
            }).then((response) => {
                setYears(response.data);
            });
        };
        fetchHistory();

        // const id = window.location.pathname.split('view-history/:')[1];
        // console.log(id);
        // const fetchData = async () => {
        //     const endpoint = 'http://localhost:5000/api/faculty/appraisal/getappraisal';
        //     await axios.post(endpoint, {
        //         yearofAssesment: id,
        //         facultyName: "Mahesh Patil",
        //         // facultyName: "Mahesh Patil"
        //     }).then((response) => {
        //         console.log(response.data);
        //         setHistory(response.data);
        //     });
        // }
        // fetchData();
    }, [])

    useEffect(() => {
        console.log(year);
        handleOption();
    }, [year])

    const handleOption = () => {
        const fetchData = async () => {
            const endpoint = 'http://localhost:5000/api/faculty/appraisal/getappraisal';
            await axios.post(endpoint, {
                yearofAssesment: year,
                facultyName: "Mahesh Patil",
                // facultyName: "Mahesh Patil"
            }).then((response) => {
                console.log(response.data);
                setHistory(response.data);
                console.log(history);
            });
        }
        fetchData();
    }
    return (
        <>  {
            years ?

                (<div className="dropdown">
                    <select
                        id="dropdown"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value="">--Select Assesment year--</option>
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
                </div >) : (<div>LOADING</div>)
        }
            <div>

                {history ? (
                    <div ref={elementRef}>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Year of Assessment:</th>
                                        <th>{history.yearofAssesment}</th>
                                        <th>Department</th>
                                        <th>{history.department}</th>
                                    </tr>
                                    <tr>
                                        <th>Name of Faculty</th>
                                        <th>{history.facultyName}</th>
                                        <th>Designation</th>
                                        <th>{history.designation}</th>
                                    </tr>
                                </thead>
                            </table>

                            {/* ---------------------------------------------------------- */}
                            <div
                                style={{
                                    display: "flex",
                                }}
                            >
                                <table>
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
                                        {history.Dimension1.info.courses.map((course, index) => {
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
                                        })}
                                        <tr>AP1 Marks : {history.Dimension1.info.AP1Marks}</tr>
                                    </tbody>
                                </table>

                                {/* ---------------------------------------------------------- */}
                                {/* AP2 */}
                                <table>
                                    <thead>
                                        AP2 : Course File
                                        <tr>
                                            <th>Marks Obtained</th>
                                            <th>Average Marks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension1.info.courses.map((course, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{course.AP2MarksObtained}</td>
                                                    {index === 0 && (
                                                        <td
                                                            rowSpan={history.Dimension1.info.courses.length}
                                                        >
                                                            {history.Dimension1.info.AP2Average}
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                        <tr>AP2 Marks : {history.Dimension1.info.AP2Marks}</tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* ---------------------------------------------------------------------------AP3 */}
                            <table>
                                <thead>
                                    AP3:Lecture target achieved. Average for all the courses
                                    taught in one academic year
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Course Name</th>
                                        <th>Number of lectures targeted</th>
                                        <th>Number of lectures conducted</th>
                                        <th>% of target target achieved</th>
                                        <th>Average % of all Courses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.Dimension1.info.courses.map((course, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{course.name}</td>
                                                <td>{course.AP3LecturesTarget}</td>
                                                <td>{course.AP3LectureConducted}</td>
                                                <td>{course.AP3PercentAchieved}</td>
                                                {index === 0 && (
                                                    <td
                                                        rowSpan={history.Dimension1.info.courses.length}
                                                    >
                                                        {history.Dimension1.info.AP3Average}
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })}
                                    <tr>AP3 Marks :{history.Dimension1.info.AP3Marks}</tr>
                                </tbody>
                            </table>

                            {/* ---------------------------------------------------------- AP4*/}

                            <div style={{ display: "flex", gap: "1rem" }}>
                                <table>
                                    <thead>AP4: Courses conducted</thead>
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
                                        {history.Dimension1.info.courses.map((course, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{course.sem}</td>
                                                    <td>{course.name}</td>
                                                    <td>{course.AP4PercentFeedback}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tr>AP4 Marks: {history.Dimension1.info.AP4Marks}</tr>
                                </table>

                                {/* ---------------------------------------------------------- AP5*/}
                                <table>
                                    <thead>AP5</thead>
                                    <tr>
                                        <th>Attendance of Students</th>
                                        <th>Average Students</th>
                                    </tr>

                                    <tbody>
                                        {history.Dimension1.info.courses.map((course, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{course.AP5AttendanceStudent}</td>
                                                    {index === 0 && (
                                                        <td
                                                            rowSpan={history.Dimension1.info.courses.length}
                                                        >
                                                            {history.Dimension1.info.AP5Average}
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                        <tr>AP5 Marks: {history.Dimension1.info.AP5Marks}</tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* ----------------------------------------------------------------------------- */}

                            {/* ---------------------------------------------------------- AP6*/}
                            <table>
                                <thead>AP6 : Mentoring : Feedback from mentees</thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Mentee Feedback</th>
                                    <th>Average Marks(Out of 5)</th>
                                </tr>

                                <tbody>
                                    {history.Dimension1.AP6.menteeFeedback.map((mf, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{mf}</td>
                                                {index === 0 && (
                                                    <td
                                                        rowSpan={
                                                            history.Dimension1.AP6.menteeFeedback.length
                                                        }
                                                    >
                                                        {history.Dimension1.AP6.averageMarks}
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {/* ----------------------------------------------------------------------------- */}
                            {/* ----------------------------------------------------------------------------AP7- */}
                            <table className="page-break">
                                <thead>
                                    AP7:Arrange Guest Lectures / co-teaching from industry
                                    (eminent resource person from the respective domain
                                    industry)
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Date</th>
                                        <th>
                                            Sr. No. Date Title of the Guest Lecture Name & details
                                            of the Speaker Arranged for students/faculty
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

                                    <tr>Totals Marks: {history.Dimension1.AP7.totalMarks}</tr>
                                </tbody>
                            </table>

                            {/* ----------------------------------------------------------------------------- */}
                            {/* ---------------------------------------------------------------------------AP8 */}

                            <table>
                                <thead>
                                    AP8: Remedial teaching for weak students / efforts towards
                                    bright students
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Sem</th>
                                        <th>Subject</th>
                                        <th>Activity done for remedial </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.Dimension1.info.courses.map((course, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{course.sem}</td>
                                                <td>{course.name}</td>
                                                <td>{course.AP8ActivityRemedial}</td>
                                            </tr>
                                        );
                                    })}

                                    <tr>Totals Marks: {history.Dimension1.info.AP8Marks}</tr>
                                </tbody>
                            </table>

                            {/* ----------------------------------------------------------------------------- */}
                            {/* ---------------------------------------------------------------------------AP9 */}

                            <table>
                                <thead>
                                    AP9:Noteworthy efforts towards enriching the learning
                                    experience / innovation in TLE methods
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Sem</th>
                                        <th>Subject</th>
                                        <th>Activity details </th>
                                        <th>Average of all courses (filled by auditor)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.Dimension1.info.courses.map((ref, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{ref.sem}</td>
                                                <td>{ref.name}</td>
                                                <td>{ref.AP9noteworthyDetails}</td>
                                                {index === 0 && (
                                                    <td
                                                        rowSpan={history.Dimension1.info.courses.length}
                                                    >
                                                        {history.Dimension1.info.AP9Marks}
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {/* ---------------------------------------------------------------------------AP10*/}
                            <table>
                                <thead>
                                    AP10:Question Paper auditing
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Paper Set for the Course </th>
                                        <th>
                                            Sr. No. Paper Set for the Course Marks in audit report
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
                                    <tr>AP10 Marks : {history.Dimension1.AP10.averageMarks}</tr>
                                </tbody>
                            </table>
                        </div>

                        {/* //Dimension2 Starts Here */}

                        {/* //RP1 */}
                        <table>
                            <thead>RP1: Publications</thead>

                            <tr>
                                <th>Sr No.</th>
                                <th>Paper Title</th>
                                <th>Journal/ Conference Name</th>
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
                                            <td>{rp.author}</td>
                                            <td>{rp.publisher}</td>
                                            <td>{rp.paperLink}</td>
                                        </tr>
                                    );
                                })}
                                <tr>Total Marks: {history.Dimension2.RP1.totalMarks}</tr>
                            </tbody>
                        </table>

                        {/* //RP2 */}

                        <table>
                            <thead> RP 2: -Patent/books/Monograms/ MOOC (30 marks)</thead>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Patent Obtained</th>
                                        <th>Details</th>
                                        <th>Status</th>
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
                                                    <td>{patent.status}</td>
                                                </tr>
                                            </>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th> Books published &nbsp;(Title of the book)</th>
                                        <th>Authors</th>
                                        <th>Publisher</th>
                                        <th>Status</th>
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
                                                    <td>{book.status}</td>
                                                </tr>
                                            </>
                                        );
                                    })}
                                </tbody>
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
                                </tbody>
                            </table>
                            <tr>Total Marks: {history.Dimension2.RP2.totalMarks}</tr>
                        </table>

                        {/* //RP3 */}
                        <table>
                            <thead>
                                RP3: Sponsored Research and Consultancy
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
                                {history.Dimension2.RP3.sponsored.map((courses, index) => {
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
                                })}
                            </tbody>
                        </table>

                        {/* //RP4 */}
                        <table>
                            <thead>
                                RP4: Citations
                                <tr>
                                    <th>
                                        Sr. No. Number of citations in the previous calendar year
                                        * 0.4 Marks
                                    </th>
                                    <th>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>{history.Dimension2.RP4.number}</td>
                                <td>{history.Dimension2.RP4.totalMarks}</td>
                            </tbody>
                        </table>

                        {/* RP5 */}
                        <table>
                            <thead>RP5: Self Development</thead>
                            <tbody>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>
                                        <span style={{ fontStyle: "normal", fontWeight: "700" }}>
                                            STTP/FDP/MOOC Courses/Industry Internship
                                        </span>
                                        <br />
                                    </th>
                                    <th>
                                        <font color="#313030">Organization details&nbsp;</font>
                                        <br />
                                    </th>
                                    <th>Dates</th>
                                    <th>
                                        <font color="#313030">No. of days Participation</font>
                                    </th>
                                </tr>

                                {history.Dimension2.RP5.selfDevelopment.map((sd, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{sd.type}</td>
                                            <td>{sd.organization}</td>
                                            <td>{sd.dates}</td>
                                            <td>{sd.duration}</td>
                                        </tr>
                                    );
                                })}

                                <tr>Total Marks: {history.Dimension2.RP5.totalMarks}</tr>
                            </tbody>
                        </table>

                        {/* RP6 */}

                        <table>
                            <thead>
                                RP6: New Software development / Hardware lab setup development
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
                                <tr>Total Marks: {history.Dimension2.RP6.totalMarks}</tr>
                            </tbody>
                        </table>

                        {/* 
                    RP7 */}
                        <table>
                            <thead>RP7: Any activity not covered.</thead>
                            <tbody>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Date</th>
                                    <th>
                                        Details &nbsp; (Faculty claim needs to be approved by HOD
                                        /Senior most faculty)
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
                                <tr>Total Marks: {history.Dimension2.RP7.totalMarks}</tr>
                            </tbody>
                        </table>

                        {/* 
                    Dimension 3 starts */}
                        <table>
                            <thead>Dimension 3 </thead>
                            <tbody>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Administrative role executed</th>
                                    <th>Tick</th>
                                    <th>Marks</th>
                                </tr>
                                <thead>IP1</thead>
                                {history.Dimension3.IP1.map((sd, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{sd.role}</td>
                                            <td>{sd.tick ? <DoneIcon /> : ""}</td>
                                            <td>20</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <thead>IP2</thead>
                            <tbody>
                                {history.Dimension3.IP2.map((sd, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{sd.role}</td>
                                            <td>{sd.tick ? <DoneIcon /> : ""}</td>
                                            <td>10</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <thead>DP1</thead>
                            <tbody>
                                {history.Dimension3.DP1.map((sd, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{sd.role}</td>
                                            <td>{sd.tick ? <DoneIcon /> : ""}</td>
                                            <td>10</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tr>
                                Total of IP1,IP2,DP1:{history.Dimension3.totalIP1IP2DP1Marks}
                            </tr>
                        </table>
                        {/* 
                    Dimension 3 OP1*/}
                        <table>
                            <thead>
                                OP1: Organized training for Industry/External learners
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
                                            <td>{sd.type}</td>
                                            <td>{sd.sponsorerName}</td>
                                            <td>{sd.fund}</td>
                                            <td>{sd.days}</td>
                                        </tr>
                                    );
                                })}
                                <tr>TotalMarks:{history.Dimension3.OP1.totalMarks}</tr>
                            </tbody>
                        </table>

                        {/* Dimension 3 institute */}

                        <table>
                            <thead>
                                <th colSpan={5} className="table-heading">
                                    Invited as visiting /Guest faculty for delivering a course
                                    in industry/ institute
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
                                {history.Dimension3.Invited.invitedAt.map((course, index) => {
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
                                })}
                                <tr>Total Marks : {history.Dimension3.Invited.totalMarks}</tr>
                            </tbody>
                        </table>
                        {/* Dimension 3 committee */}

                        <table>
                            <thead>
                                <th colSpan={5} className="table-heading">
                                    Part of selection committee / inquiry/ academic audit /
                                    examiner panel/ BOS /AC/LIC/ RRC meetings/ external Auditor
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
                                {history.Dimension3.Partof.committee.map((course, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{course.name}</td>
                                                <td>{course.organization}</td>
                                                <td>{course.date}</td>
                                            </tr>
                                        </>
                                    );
                                })}
                                <tr>Total Marks : {history.Dimension3.Partof.totalMarks}</tr>
                            </tbody>
                        </table>

                        {/* Dim 3 Article */}
                        {/* <table>
                            <thead>
                                <th colSpan={2} className="table-heading">
                                    Article in media/ newspaper to boost Institution’s Image
                                </th>
                            </thead>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Course Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.Dimension1.Article.articleDetails.map(
                                    (course, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{course.name}</td>
                                                </tr>
                                            </>
                                        );
                                    }
                                )}
                                <tr>AP1 Marks : {history.Dimension3.Article.totalMarks}</tr>
                            </tbody>
                        </table> */}

                        {/* Dim 3 Article */}
                        {/* <table>
                            <thead>
                                <th colSpan={2} className="table-heading">
                                    Article in media/ newspaper to boost Institution’s Image
                                </th>
                            </thead>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Course Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.Dimension1.Article.articleDetails.map(
                                    (course, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{course.name}</td>
                                                </tr>
                                            </>
                                        );
                                    }
                                )}
                                <tr>AP1 Marks : {history.Dimension3.Article.totalMarks}</tr>
                            </tbody>
                        </table> */}

                    </div>

                ) : (
                    "Nahi Aaya"
                )}
            </div>{" "}
            {history ? (
                <button onClick={handleExportPDF} style={{
                    backgroundColor: "#f32236",
                    color: "white",
                    padding: "10px",
                    // borderRadius: "5px",
                    border: "none",
                    width: "150px",
                    margin: "0 auto",
                    display: "block",
                }}  >Export to PDF</button>) : ("")}
        </>
    );
}

export default ViewHistory
import React, { useState, useEffect } from "react";
import HeaderImage from "../assets/spit.png";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";

export default function AllSteps({ fullName, year }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHistory = async () => {
      const endpoint =
        "http://localhost:5000/api/faculty/appraisal/getappraisal";
      // const payload = JSON.parse(localStorage.getItem('user'));
      await axios
        .post(endpoint, {
          facultyName: fullName,
          yearofAssesment: year,
        })
        .then((response) => {
          console.log(response.data);
          setHistory(response.data);
          setLoading(false);
        });
    };
    fetchHistory();
  }, []);
  useEffect(() => {
    console.log(history);
  }, [history]);
  return (
    <>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div
          // ref={elementRef}
          style={{
            // width: "95%",
            // padding:"0 0 2em 0",
            // border: "1px solid black",
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
                  {history.Dimension1.info.courses.map((course, index) => {
                    return (
                      <tr key={index}>
                        <td>{course.AP2MarksObtained}</td>
                        {index === 0 && (
                          <td rowSpan={history.Dimension1.info.courses.length}>
                            {history.Dimension1.info.AP2Average}
                          </td>
                        )}
                      </tr>
                    );
                  })}
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
                  AP3:Lecture target achieved. Average for all the courses
                  taught in one academic year
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
                {history.Dimension1.info.courses.map((course, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course.name}</td>
                      <td>{course.AP3LecturesTarget}</td>
                      <td>{course.AP3LectureConducted}</td>
                      <td>{course.AP3PercentAchieved}</td>

                      {index === 0 && (
                        <td rowSpan={history.Dimension1.info.courses.length}>
                          {history.Dimension1.info.AP3Average}
                        </td>
                      )}
                      {index === 0 && (
                        <td rowSpan={history.Dimension1.info.courses.length}>
                          {history.Dimension1.info.AP3Average}
                        </td>
                      )}
                    </tr>
                  );
                })}
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
                    <span style={{ fontStyle: "normal", fontWeight: "700" }}>
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
                  {history.Dimension1.info.courses.map((course, index) => {
                    return (
                      <tr key={index}>
                        <td>{course.AP5AttendanceStudent}</td>
                        {index === 0 && (
                          <td rowSpan={history.Dimension1.info.courses.length}>
                            {history.Dimension1.info.AP5Average}
                          </td>
                        )}
                      </tr>
                    );
                  })}
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
                <th className="table-heading">
                  Mentee Feedback Score Average Marks (Out of 5):
                </th>
                <th style={{ padding: "10px" }}>
                  {history.Dimension1.AP6.averageMarks}
                </th>
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
                  (eminent resource person from the respective domain industry)
                </th>
              </thead>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Date</th>
                  <th>Title of the Guest Lecture</th>
                  <th>Name & Details of the Speaker</th>
                  <th>Arranged for students/faculty</th>
                </tr>
              </thead>
              <tbody>
                {history.Dimension1.AP7.guestLectureData.map((cor, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{cor.date}</td>
                      <td>{cor.title}</td>
                      <td>{cor.speakerName}</td>
                      <td>{cor.arrangedFor}</td>
                    </tr>
                  );
                })}
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
                  AP8: Remedial teaching for weak students / efforts towards
                  bright students
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
                {history.Dimension1.AP8.remedialData.map((course, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course.sem}</td>
                      <td>{course.subject}</td>
                      <td>{course.activityDetails}</td>
                    </tr>
                  );
                })}
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
                          rowSpan={history.Dimension1.AP9.noteworthyData.length}
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
              Total Marks of Dimension 1 : {history.Dimension1.totalMarks}{" "}
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
              <th>
                High / Medium <br />/ Low Repute
              </th>
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
                RP1 Total Marks: {history.Dimension2.RP1.totalMarks}
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

              <th colSpan={4} className="table-heading">
                Marks Obtained : {history.Dimension2.RP2.patentMarks}
              </th>
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

              <th colSpan={5} className="table-heading">
                Marks Obtained : {history.Dimension2.RP2.booksMarks}
              </th>
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

                <th colSpan={5} className="table-heading">
                  Marks Obtained : {history.Dimension2.RP2.moocsMarks}
                </th>
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
                  Number of citations in the previous calendar year * 0.4 Marks
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

              <th colSpan={10} className="table-heading">
                RP5 Total Marks: {history.Dimension2.RP5.totalMarks}
              </th>
            </tbody>
          </table>

          {/* RP6 */}

          <table>
            <thead>
              <th colSpan={5} className="table-heading">
                RP6: New Software development / Hardware lab setup development
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
                  Details &nbsp; (Faculty claim needs to be approved by HOD
                  /Senior most faculty)
                </th>
              </tr>
              {history.Dimension2.RP7.activityNotCovered.map((sd, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{sd.date}</td>
                    <td>{sd.details}</td>
                  </tr>
                );
              })}
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
              Total Marks of Dimension 2 : {history.Dimension2.totalMarks}{" "}
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
              <th
                colSpan={5}
                className="table-heading"
                style={{ textAlign: "center" }}
              >
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
              <th
                colSpan={5}
                className="table-heading"
                style={{ textAlign: "center" }}
              >
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
              <th
                colSpan={5}
                className="table-heading"
                style={{ textAlign: "center" }}
              >
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
            <th
              colSpan={10}
              className="table-heading"
              style={{ textAlign: "center" }}
            >
              Total of IP1, IP2, DP1 : {history.Dimension3.totalIP1IP2DP1Marks}
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
              <th colSpan={10} className="table-heading">
                TotalMarks : {history.Dimension3.OP1.totalMarks}
              </th>
            </tbody>
          </table>

          {/* Dimension 3 institute */}

          <table>
            <thead>
              <th colSpan={5} className="table-heading">
                OP2:Invited as visiting /Guest faculty for delivering a course
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
              <th colSpan={10} className="table-heading">
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
                <th>
                  Details (Title , No. of participants, <br />
                  affiliation) etc
                </th>
              </tr>
            </thead>
            <tbody>
              {history.Dimension3.op4.invitedTalk.map((course, index) => {
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
                      <td>{course.details}</td>
                      <td>{course.organization}</td>

                      <td>{course.date}</td>
                    </tr>
                  </>
                );
              })}
              <th colSpan={10} className="table-heading">
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
              {history.Dimension3.Article.articleDetails.map((art, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{art.name}</td>
                    </tr>
                  </>
                );
              })}
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
              {history.Dimension3.ngo.data.map((art, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{art.details}</td>
                    </tr>
                  </>
                );
              })}
              <th colSpan={10} className="table-heading">
                Total Marks : {history.Dimension3.ngo.totalMarks}
              </th>
            </tbody>
          </table>
          {/* Dim 3 Coguide */}

          <table>
            <thead>
              <th colSpan={3} className="table-heading">
                OP8:Co-guide for student projects and dissertations in the peer
                institutions
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
                Total Marks : {history.Dimension3.collaboration.totalMarks}
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
      )}
    </>
  );
}

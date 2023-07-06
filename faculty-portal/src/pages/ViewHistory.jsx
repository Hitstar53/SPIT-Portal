import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';
import "../styles/History.css"
const ViewHistory = () => {
    const { user } = useContext(UserContext);
    const [history, setHistory] = useState();
    const pdfExportComponent = useRef(null);

    const handleExportPDF = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    useEffect(() => {
        const id = window.location.pathname.split('view-history/:')[1];
        console.log(id);
        const fetchData = async () => {
            const endpoint = 'http://localhost:5000/api/faculty/appraisal/getappraisal';
            await axios.post(endpoint, {
                yearofAssesment: id,
                facultyName: "Mahesh Patil",
                // facultyName: "Mahesh Patil"
            }).then((response) => {
                console.log(response.data);
                setHistory(response.data);
            });
        }
        fetchData();
    }, [])
    return (
      <div>
        <button onClick={handleExportPDF}>Export to PDF</button>
        {history ? (
          <PDFExport ref={pdfExportComponent}>
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
                    AP1: Courses conducted
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
                              {history.Dimension1.info.AP2AverageMarks}
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
                        <td>{index}</td>
                        <td>{course.name}</td>
                        <td>{course.AP3LecturesTarget}</td>
                        <td>{course.AP3LectureConducted}</td>
                        <td>{course.AP3PercentAchieved}</td>
                        {index === 0 && (
                          <td rowSpan={history.Dimension1.info.courses.length}>
                            {history.Dimension1.AP3Average}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ---------------------------------------------------------- AP4*/}
            <div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <table>
                  <thead>AP4: Courses conducted</thead>
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
                  </tr>

                  <tbody>
                    {history.Dimension1.info.courses.map((course, index) => {
                      return (
                        <tr key={index}>
                          <td>{course.AP4PercentFeedback}</td>
                          <td>{course.sem}</td>
                          <td>{course.name}</td>
                          {index === 0 && (
                            <td
                              rowSpan={history.Dimension1.info.courses.length}
                            >
                              {history.Dimension1.info.AP4Marks}
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tr>AP4 Marks: </tr>
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
                <thead>
                  AP6 : Mentoring : Feedback from mentees
                  <tr>
                    <th>Sr.No</th>
                    <th>Mentee Feedback</th>
                    <th>Average Marks(Out of 5)</th>
                  </tr>
                </thead>
                <tbody>
                  {history.Dimension1.AP6.menteeFeedback.map((index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{history.Dimension1.AP6.menteeFeedback}</td>
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
              <table>
                <thead>
                  AP7:Arrange Guest Lectures / co-teaching from industry
                  (eminent resource person from the respective domain industry)
                  <tr>
                    <th>Sr.No</th>
                    <th>Date</th>
                    <th>
                      Sr. No. Date Title of the Guest Lecture Name & details of
                      the Speaker Arranged for students/faculty
                    </th>
                    <th>Name & Details of the Speaker</th>
                    <th>Arranged for students/faculty</th>
                  </tr>
                </thead>
                <tbody>
                  {history.Dimension1.AP6.menteeFeedback.map((index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{history.Dimension1.AP7.guestLectureData.date}</td>
                        <td>{history.Dimension1.AP7.guestLectureData.title}</td>
                        <td>
                          {history.Dimension1.AP7.guestLectureData.speakerName}
                        </td>
                        <td>
                          {history.Dimension1.AP7.guestLectureData.arrangedFor}
                        </td>
                      </tr>
                    );
                  })}

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
              {/* ---------------------------------------------------------------------------AP8 */}

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
                  {history.Dimension1.info.courses.map((course, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{course.sem}</td>
                        <td>{course.name}</td>
                        <td>{course.AP9noteworthyDetails}</td>
                        {index === 0 && (
                          <td
                            rowSpan={
                              course.length
                            }
                          >
                            {history.Dimension1.info.AP9Marks}
                          </td>
                        )}
                      </tr>
                    );
                  })}

                  

                  
                </tbody>
              </table>
            </div>
          </PDFExport>
        ) : (
          "Nahi Aaya"
        )}
      </div>
    );
}

export default ViewHistory

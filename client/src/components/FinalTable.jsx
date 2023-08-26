import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import { API_URL } from '../config';

const FinalTable = ({ facultyData, change }) => {

    const [report, setReport] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReport = async () => {

            await axios.post(API_URL + "/api/faculty/appraisal/getappraisal", {
                yearofAssesment: facultyData.yearofAssesment,
                facultyName: facultyData.facultyName,
            })
                .then((res) => {

                    setReport(res.data)
                    setLoading(false)
                })
                .catch((err) => console.log(err))
        }
        fetchReport()
    }, [change])

    return (
        <>
            {loading ? (
                <div>
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <div
                        className="dimhead"
                        style={{
                            backgroundColor: "#fabf8f",
                            margin: "0em auto",
                            padding: "0.4em 0.4em",
                            width: "95%",
                            height: "3rem",
                        }}
                    >
                        <h4 className='text-center text-2xl font-bold'>
                            {" "}
                            Perception Marks out of 100 (G) :{" "}
                            {
                                report.Dimension4.confidentialReport.perceptionMarks
                            }{" "}
                        </h4>
                    </div>
                    <table
                        style={{
                            width: "95%",
                            margin: "0em auto",
                        }}
                    >

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
                                    {report.finalGrandTotal.dimension1.totalMarks.toFixed(2)}
                                </td>
                                <td className="table-content table-data text-center align-middle">
                                    {report.finalGrandTotal.dimension1.multiplyingFactor.toFixed(2)}
                                </td>
                                <td className="table-content table-data text-center align-middle">
                                    {report.finalGrandTotal.dimension1.finalMarks.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="table-content table-data text-center align-middle">
                                    Research and Development
                                </td>
                                <td className="table-content table-data text-center align-middle">
                                    {report.finalGrandTotal.dimension2.totalMarks.toFixed(2)}
                                </td>
                                <td className="table-content table-data text-center align-middle">
                                    {report.finalGrandTotal.dimension2.multiplyingFactor.toFixed(2)}
                                </td>
                                <td className="table-content table-data text-center align-middle">
                                    {report.finalGrandTotal.dimension2.finalMarks.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="table-content table-data text-center align-middle">
                                    Administration and Outreach
                                </td>
                                <td className="table-content table-data text-center align-middle">
                                    {report.finalGrandTotal.dimension3.totalMarks.toFixed(2)}
                                </td>
                                <td className="table-content table-data text-center align-middle">
                                    {report.finalGrandTotal.dimension3.multiplyingFactor.toFixed(2)}
                                </td>
                                <td className="table-content table-data text-center align-middle">
                                    {report.finalGrandTotal.dimension3.finalMarks.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="table-content table-data text-center align-middle">
                                    Perception/ 360 degree feedback
                                </td>
                                <td className="table-content table-data text-center align-middle">
                                    {report.finalGrandTotal.dimension4.totalMarks.toFixed(2)}
                                </td>
                                <td className="table-content table-data text-center align-middle">
                                    {report.finalGrandTotal.dimension4.multiplyingFactor.toFixed(2)}
                                </td>
                                <td className="table-content table-data text-center align-middle">
                                    {report.finalGrandTotal.dimension4.finalMarks.toFixed(2)}
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
                        </tbody>

                    </table>
                </div>
            )}
        </>
    );
};

export default FinalTable;
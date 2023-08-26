import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "../styles/Principal.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FinalTable from "../components/FinalTable";
import { API_URL } from '../config';

const Report = ({ facultyData, forHOD = false }) => {

    const [dim4, setDim4] = useState(facultyData.Dimension4);
    const [viewBonus, setViewBonus] = useState(false);
    const [change, setChange] = useState(false);
    const marks = [
        { label: "1" },
        { label: "0.95" },
        { label: "0.90" },
        { label: "0.85" },
        { label: "0.80" },
    ];
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        control,
    } = useForm({
        defaultValues: {},
    });

    const onSubmit = (data) => {


        let dim4 = facultyData.Dimension4
        dim4.confidentialReport.principalRemarks = parseFloat(data.confidentialReport.principalRemarks)
        if (facultyData.designation === "HOD") {
            dim4.feedbackMarks.A = parseFloat(data.feedbackMarks.A)
            dim4.feedbackMarks.B = parseFloat(data.feedbackMarks.B)
            dim4.feedbackMarks.C = parseFloat(data.feedbackMarks.C)
        }


        sendMarks(dim4)
    };

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const sendMarks = async (dim4) => {

        await axios
            .post(API_URL + "/api/faculty/appraisal/principal-review", {
                yearofAssesment: facultyData.yearofAssesment,
                fullName: facultyData.facultyName,
                Dimension4: dim4,
            })
            .then(async (res) => {

                toast.success("Marks Submitted!", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                });
                setChange(!change)
                setViewBonus(true);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error in submitting marks!");
            });
    };

    const sendBonus = async (dim4) => {

        await axios
            .post(API_URL + "/api/faculty/appraisal/principal-submit", {
                yearofAssesment: facultyData.yearofAssesment,
                fullName: facultyData.facultyName,
                Dimension4: dim4,
            })
            .then(async (res) => {

                toast.success("Remarks Submitted!", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                });
                await timeout(1500);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error in submitting marks!");
            });
    }

    const handleBonus = (data) => {

        let dim4 = facultyData.Dimension4
        dim4.confidentialReport.bonusMarks = parseFloat(data.confidentialReport.bonusMarks)
        dim4.confidentialReport.principalComments = data.confidentialReport.principalComments
        sendBonus(dim4)

    }

    return (
        <div>
            <div className="report">

                <form className="marks-sec" onSubmit={handleSubmit(onSubmit)}>

                    {forHOD && (
                        <Table striped bordered style={{ marginTop: "2rem" }}>
                            <thead>
                                <tr>
                                    <th className="table-header text-center align-middle">
                                        Perception 360 degree feedbacks
                                    </th>
                                    <th className="table-header text-center align-middle">
                                        Bright students’ feedback (A)
                                    </th>
                                    <th className="table-header text-center align-middle">
                                        Peer Feedback (B)
                                    </th>
                                    <th className="table-header text-center align-middle">
                                        HOD feedback (C)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="table-header text-center align-middle">
                                        Max Marks
                                    </td>
                                    <td className="table-header text-center align-middle">25</td>
                                    <td className="table-header text-center align-middle">25</td>
                                    <td className="table-header text-center align-middle">50</td>
                                </tr>
                                <tr>
                                    <td className="table-header text-center align-middle">Marks</td>
                                    <td className="table-header text-center align-middle">
                                        <input
                                            className="form-input"
                                            type="number"
                                            onWheel={(e) => e.target.blur()}
                                            {...register("feedbackMarks.A", {
                                                required: true,
                                                max: 25,
                                            })}
                                        />
                                        {errors.feedbackMarks?.A?.type === "required" &&
                                            "Marks is required"}
                                        {errors.feedbackMarks?.A?.type === "max" &&
                                            "Marks should be less than or equal to 25"}
                                    </td>
                                    <td className="table-header text-center align-middle">
                                        <input
                                            className="form-input"
                                            type="number"
                                            onWheel={(e) => e.target.blur()}
                                            {...register("feedbackMarks.B", {
                                                required: true,
                                                max: 25,
                                            })}
                                        />
                                        {errors.feedbackMarks?.B?.type === "required" &&
                                            "Marks is required"}
                                        {errors.feedbackMarks?.B?.type === "max" &&
                                            "Marks should be less than or equal to 25"}
                                    </td>
                                    <td className="table-header text-center align-middle">
                                        <input
                                            className="form-input"
                                            type="number"
                                            onWheel={(e) => e.target.blur()}
                                            {...register("feedbackMarks.C", {
                                                required: true,
                                                max: 50,
                                            })}
                                        />
                                        {errors.feedbackMarks?.C?.type === "required" &&
                                            "Marks is required"}
                                        {errors.feedbackMarks?.C?.type === "max" &&
                                            "Marks should be less than or equal to 50"}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                    <Table striped bordered>
                        <thead>
                            {!forHOD && <tr>
                                <th className="table-header text-center align-middle">
                                    HOD Remarks
                                </th>
                                <th
                                    className="table-header text-center align-middle"
                                    colSpan={3}
                                >
                                    {dim4.confidentialReport.HODRemarks}
                                </th>
                            </tr>}
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
                                    Strongly disagree: not committed / needs frequent follow up
                                </td>
                            </tr>
                        </thead>
                    </Table>
                    <div className="flex flex-col justify-center align-items-center">

                        <label style={{ fontSize: '1.5rem', fontWeight: '600' }} htmlFor="Enter Marks">Enter Multiplier factor:
                            <select style={{ height: 'max-content', fontSize: '1rem', minWidth: '100px', padding: '10px', borderRadius: '8px', margin: '0 10px', border: '2px solid grey' }}
                                id="Enter Marks" {...register("confidentialReport.principalRemarks", { required: true })}>
                                <option value="1">1</option>
                                <option value="0.95">0.95</option>
                                <option value="0.90">0.90</option>
                                <option value="0.85">0.85</option>
                                <option value="0.80">0.80</option>
                            </select>
                        </label>
                        <button style={{ fontSize: '20px', marginTop: '1rem' }} type="submit" className="find-faculty-btn">
                            Submit
                        </button>
                    </div>
                </form>
                <div className="mt-8">
                    {viewBonus && (
                        <div className="flex flex-col justify-center items-center">
                            <FinalTable facultyData={facultyData} change={change} />
                            <div>
                                <form onSubmit={handleSubmit(handleBonus)} className="w-full flex flex-col items-center justify-center">
                                    <div className="flex flex-col items-center justify-center gap-4 mt-8">
                                        <label style={{ fontSize: '1.5rem', fontWeight: '600' }} htmlFor="Enter Marks">Enter Bonus Marks:
                                            <select style={{ height: 'max-content', fontSize: '1rem', minWidth: '100px', padding: '10px', borderRadius: '8px', margin: '0 10px', border: '2px solid grey' }}
                                                id="Enter Marks" {...register("confidentialReport.bonusMarks", { required: true })}>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </label>
                                        <label className="form-label text-3xl" style={{ fontSize: '1.5rem', fontWeight: '600' }} htmlFor="Enter Remarks">
                                            Enter Remarks:
                                            <textarea
                                                className="form-textarea w-96 ml-4"
                                                type="text"
                                                placeholder="Remarks"
                                                {...register("confidentialReport.principalComments", { maxLength: 200 })} />
                                        </label>
                                    </div>
                                    <button style={{ fontSize: '20px', marginTop: '1rem' }} type="submit" className="find-faculty-btn">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Report;

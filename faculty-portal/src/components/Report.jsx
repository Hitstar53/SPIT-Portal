import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import "../styles/Principal.css";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";


const Report = ({ facultyData, name, forHOD = false }) => {
    console.log(facultyData);
    const [dim4, setDim4] = useState(facultyData.Dimension4);
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
        console.log("line 31");
        console.log(data);
        let dim4=facultyData.Dimension4
        dim4.confidentialReport.principalRemarks=parseFloat(data.confidentialReport.principalRemarks)
        dim4.feedbackMarks.A=parseFloat(data.feedbackMarks.A)
        dim4.feedbackMarks.B=parseFloat(data.feedbackMarks.B)
        dim4.feedbackMarks.C=parseFloat(data.feedbackMarks.C)

        // console.log(dim4.confidentialReport.principalRemarks)
        // console.log(data.feedbackMarks)
        console.log(dim4)
        sendMarks(dim4)
        // axios
        //     .post("http://localhost:5000/api/faculty/appraisal/principal-review", {
        //         yearofAssesment: facultyData.yearofAssesment,
        //         fullName: facultyData.facultyName,
        //         Dimension4: dim4,
        //     })
        //     .then((res) => {
        //         console.log(res.data);
        //         setStatus("Step Four Saved");
        //         toast.success("Step Four Saved!", {
        //             position: "top-center",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    const sendMarks = async (dim4) => {
        console.log(dim4);
        await axios
            .post("http://localhost:5000/api/faculty/appraisal/principal-review", {
                yearofAssesment: facultyData.yearofAssesment,
                fullName: facultyData.facultyName,
                Dimension4: dim4,
            })
            .then((res) => {
                console.log(res.data.Dimension4);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // const handleMarks = (e) => {
    //     e.preventDefault();
    //     console.log("You clicked submit.");
    //     const newPrincipalRemarks = parseFloat(e.target[0].value);
    //     const updatedDim4 = {
    //         ...dim4,
    //         confidentialReport: {
    //             ...dim4.confidentialReport,
    //             principalRemarks: newPrincipalRemarks,
    //         },
    //     };
    //     // await setDim4(updatedDim4);
    //     sendMarks(updatedDim4);
    //     window.location.reload();
    // };

    return (
        <div>
            <div className="report">
                {/* <h1>Enter the Marks for {name}</h1> */}
                {/* <form className="marks-sec" onSubmit={handleMarks}> */}
                <form className="marks-sec" onSubmit={handleSubmit(onSubmit)}>
                    {/* <form className="marks-sec" onSubmit={handleSubmit(data => console.log(data))}> */}
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
                        {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={marks}
                            sx={{ width: 300, display: "inline-block" }}
                            renderInput={(params) => (
                                <TextField {...params} label="Enter Marks" />
                            )}
                        /> */}
                        <label style={{ fontSize: '1.5rem', fontWeight: '600' }} htmlFor="Enter Marks">Enter Marks:
                            <select style={{ height: 'max-content', fontSize: '1.5rem', minWidth: '200px', padding: '10px', borderRadius: '8px', margin: '0 10px', border: '2px solid grey' }} 
                            id="Enter Marks" {...register("confidentialReport.principalRemarks", { required: true })}>
                                <option value="1">1</option>
                                <option value="0.95">0.95</option>
                                <option value="0.90">0.90</option>
                                <option value="0.85">0.85</option>
                                <option value="0.80">0.80</option>
                            </select>
                        </label>
                        {/* <Controller
                            render={({ onChange, ...props }) => (
                                <Autocomplete
                                options={marks}
                                    getOptionLabel={getOptionLabel}
                                    renderOption={renderOption}
                                    renderInput={renderInput}
                                    onChange={(e, data) => onChange(data)}
                                    {...props}
                                />
                            )}
                            onChange={([, data]) => data}
                            // defaultValue={defaultValue}
                            name={name}
                            control={control}
                        /> */}
                        <button style={{ fontSize: '20px', marginTop: '1rem' }} type="submit" className="find-faculty-btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Report;

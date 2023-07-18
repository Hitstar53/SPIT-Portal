import React, { useState } from 'react';
import Table from "react-bootstrap/Table";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from 'axios';
import "../styles/Principal.css"

const Report = ({ facultyData, name }) => {
    console.log(facultyData)
    const [dim4, setDim4] = useState(facultyData.Dimension4);
    const marks = [
        { label: '1'},
        { label: '0.95'},
        { label: '0.90'},
        { label: '0.85'},
        { label: '0.80'},
    ]

    const sendMarks = async (dim4) => {
        console.log(dim4)
        await axios.post("http://localhost:5000/api/faculty/appraisal/principal-review", {
            yearofAssesment: facultyData.yearofAssesment,
            fullName: facultyData.facultyName,
            Dimension4: dim4,
        })
        .then((res) => {
            console.log(res.data.Dimension4);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleMarks = (e) => {
        e.preventDefault();
        console.log("You clicked submit.");
        const newPrincipalRemarks = parseFloat(e.target[0].value);
        const updatedDim4 = {
            ...dim4,
            confidentialReport: {
                ...dim4.confidentialReport,
                principalRemarks: newPrincipalRemarks
            }
        };
        // await setDim4(updatedDim4);
        sendMarks(updatedDim4);
        window.location.reload();
    }
    
    

    return (
        <div>
            <div className='report'>
            <h1>Enter the Marks for {name}</h1>
                <Table striped bordered style={{margin: "1rem"}}>
                    <thead>
                        <tr>
                            <th className='table-header text-center align-middle'>HOD Remarks</th>
                            <th className='table-header text-center align-middle' colSpan={3}>{dim4.confidentialReport.HODRemarks}</th>
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
                </Table>
                <form className='marks-sec' onSubmit={handleMarks}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={marks}
                        sx={{ width: 300, display: "inline-block" }}
                        renderInput={(params) => (
                            <TextField {...params} label="Enter Marks" />
                        )}
                    />
                    <button type="submit" className="marks-btn btn btn-primary">
                        Confirm Marks
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Report;

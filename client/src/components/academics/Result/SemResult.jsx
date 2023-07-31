import React, { useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import styles from "./SemResult.module.css";
import { FaArrowLeft } from "react-icons/fa";
import SubColumn from "./SubColumn.jsx";
import CustTable from "../../UI/CustTable";
import ServerUrl from "../../../constants";

const SemResult = () => {
  const { semester } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();
  const [newRows, setNewRows] = useState(
    data.map((course, index) => ({
      id: index,
      coursename: course.courseName,
      ise: course.exams[0].obtainedScore,
      mse: course.exams[1].obtainedScore,
      ese: course.exams[2].obtainedScore,
    }))
  );
  const [headCells, setHeadCells] = useState([
    {
      id: "coursename",
      numeric: false,
      label: "Course Name",
    },
    {
      id: "ise",
      numeric: true,
      label: "ISE (out of "+data[0].exams[0].maxScore+")",
    },
    {
      id: "mse",
      numeric: true,
      label: "MSE (out of "+data[0].exams[1].maxScore+")",
    },
    {
      id: "ese",
      numeric: true,
      label: "ESE (out of "+data[0].exams[2].maxScore+")",
    },
  ]);
  const container = styles.container + " flex flex-col gap-8 p-8";
  return (
    <div className={container}>
      <h1 className="flex items-center gap-4 text-4xl font-semibold">
        <FaArrowLeft
          onClick={() => navigate(-1)}
          className="text-2xl cursor-pointer"
        />
        Semester {semester}
      </h1>
      {/* {data.map((course, index) => (
        <SubColumn key={index} id={index} course={course} />
      ))} */}
      <CustTable
        headCells={headCells}
        rows={newRows}
      />
    </div>
  );
};

export default SemResult;

export async function loader({ params }) {
  const response = await fetch(`${ServerUrl}/api/student/getResults`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: JSON.parse(localStorage.getItem("userinfo")).email,
      semesterNumber: params.semester,
    }),
  });
  if (!response.ok) {
    return json(
      { message: "Could not fetch Semester information" },
      { status: 422 }
    );
  } else {
    const resultData = await response.json();
    return resultData;
  }
}

import React, { useState ,useEffect} from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import styles from "./SemResult.module.css";
import { FaArrowLeft } from "react-icons/fa";
import CustTable from "../../UI/CustTable";
import NoData from "../../UI/NoData";
import ServerUrl from "../../../constants";

const SemResult = () => {
  const { semester } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();
  const [newRows, setNewRows] = useState(
    data.results.map((course, index) => ({
      id: index,
      coursename: course.courseName,
      ise: course.exams[0].obtainedScore,
      mse: course.exams[1].obtainedScore,
      ese: course.exams[2].obtainedScore,
      total: course.exams[3].obtainedScore,
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
      label: "ISE (out of "+data.results[0]?.exams[0]?.maxScore+")",
    },
    {
      id: "mse",
      numeric: true,
      label: "MSE (out of "+data.results[0]?.exams[1]?.maxScore+")",
    },
    {
      id: "ese",
      numeric: true,
      label: "ESE (out of "+data.results[0]?.exams[2]?.maxScore+")",
    },
    {
      id: "total",
      numeric: true,
      label: "Total (out of "+data.results[0]?.exams[3]?.maxScore+")",
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
        Semester {semester},&nbsp;&nbsp;{data?.academicYear}
      </h1>
      {
        data.results.length === 0 && (
          <NoData
            title="No Results Found"
            message="Your results will be displayed here once they are published"
          />
        )
      }
      {
        data.results.length > 0 && 
          <CustTable
            headCells={headCells}
            rows={newRows}
          />
      }
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

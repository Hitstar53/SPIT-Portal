import React from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import styles from "./SemResult.module.css";
import { FaArrowLeft } from "react-icons/fa";
import SubColumn from "./SubColumn.jsx";
import ServerUrl from "../../../constants";

const SemResult = () => {
  const { semester } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();
  console.log(data);
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
      {data.map((course, index) => (
        <SubColumn key={index} id={index} course={course} />
      ))}
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

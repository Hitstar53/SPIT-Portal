import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./SemResult.module.css";
import { FaArrowLeft } from "react-icons/fa";
import SubColumn from "./SubColumn.jsx";

const data = [
  {
    subject: "Design and Analysis of Algorithms",
  },
  {
    subject: "Computer Connection and Networking",
  }
];

const SemResult = () => {
  const { semester } = useParams();
  const navigate = useNavigate();
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
      {data.map((exam, index) => (
        <SubColumn key={index} exam={exam} />
      ))}
    </div>
  );
};

export default SemResult;

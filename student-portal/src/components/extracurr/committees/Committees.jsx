import React from "react";
import styles from "./Committees.module.css";
import CommitteesCard from "./CommitteesCard.jsx";

const cominfo = [
  {
    comname: "Computer Society of India (C.S.I. S.P.I.T.)",
    commen: "Dr. Kailas Devadkar",
  },
  {
    comname: "Entrepreneurship Cell (E-Cell S.P.I.T.) ",
    commen: "Proff. Kaisar Katchi",
  },
  {
    comname: "Mudra",
    commen: "Proff. Kaisar Katchi",
  },
];

const Committees = () => {
  return (
    <div className={styles.committeesPage}>
      <h1 className={styles.heading}>College Committees</h1>
      <div className={styles.comGrid}>
        {cominfo.map((com,index) => (
          <CommitteesCard
            key={index}
            comname={com.comname} 
            commen={com.commen}
            
          />
        ))}
      </div>
    </div>
  );
};

export default Committees;

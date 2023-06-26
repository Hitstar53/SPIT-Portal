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

function createCard(cominfo) {
  return <CommitteesCard comname={cominfo.comname} commen={cominfo.commen} />;
}

const Committees = () => {
  return (
    <div className={styles.committeesPage}>
      <h1 className={styles.heading}>College Committees</h1>
      <div className={styles.comGrid}>{cominfo.map(createCard)}</div>
    </div>
  );
};

export default Committees;

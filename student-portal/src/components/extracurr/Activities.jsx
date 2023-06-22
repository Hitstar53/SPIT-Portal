import React from "react";
import styles from "./Activities.module.css";
import CommitteeCard from "./CommitteeCard";
import VolunteerWork from "./VolunteerWork";
import logo from "../../assets/user.svg";
import AddButton from "./AddButton.jsx";

const cominfo = [
  {
    comlogo: logo,
    comname: "Computer Society of India (C.S.I. S.P.I.T.)",
    compos: "Technical Head",
    comyear: "2022-23",
  },
  {
    comlogo: logo,
    comname: "Oculus S.P.I.T.",
    compos: "Technical Head",
    comyear: "2021-22",
  },
  {
    comlogo: logo,
    comname: "Entrepreneurship Cell (E.Cell S.P.I.T.)",
    compos: "Technical Head",
    comyear: "2021-22",
  },
];

function createCard(cominfo) {
  return (
    <CommitteeCard
      comlogo={cominfo.comlogo}
      comname={cominfo.comname}
      compos={cominfo.compos}
      comyear={cominfo.comyear}
    />
  );
}

const volinfo = [
  {
    volname: "Abhyudaya",
    instructor: "Dr. Y.S. Rao",
    desc: "Teaching underprivedgled school students.",
    voldur: "30 hrs, 2023",
  },
  {
    volname: "Abhyudaya",
    instructor: "Dr. Y.S. Rao",
    desc: "Teaching underprivedgled school students.",
    voldur: "30 hrs, 2023",
  },
  {
    volname: "Abhyudaya",
    instructor: "Dr. Y.S. Rao",
    desc: "Teaching underprivedgled school students.",
    voldur: "30 hrs, 2023",
  },
];

function volCard(volinfo) {
    return (
      <VolunteerWork
        volname={volinfo.volname}
        instructor={volinfo.instructor}
        desc={volinfo.desc}
        voldur={volinfo.voldur}
      />
    );
  }

const Activities = () => {
  return (
    <div className={styles.activitiesPage}>
      <div className={styles.committees}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Committees</h1>
          <div>
            <AddButton />
          </div>
        </div>
        <div className={styles.comGrid}>{cominfo.map(createCard)}</div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.volunteer}>
        <h1 className={styles.heading}>Volunteer Work</h1>
        <VolunteerWork info={volinfo} />
      </div>
    </div>
  );
};

export default Activities;

import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./EventsCard.module.css";
import dayjs from "dayjs"

const Events = (props) => {
  return (
    <div className={styles.eventsCard}>
      <div className={styles.content}>
        <div className={styles.eventcontrol}>
          <div className={styles.position}>
            <div className={styles.eventname}>{props.eventname}</div>
            <div>{dayjs(props.eventdate).format('DD/MM/YYYY')}</div>
          </div>
          <CloseIcon
            sx={{ color: "var(--text-light)", cursor: "pointer" }}
            onClick={() => {
              props.handleClickOpen(props.key);
            }}
          />
        </div>
        <hr className={styles.horizontalLine} />
        <div className={styles.position}>
          <div className={styles.organisation_name}>{props.orgname}</div>
          <div className={styles.organisation_name}>
            {props.type}
          </div>
        </div>
        <div className={styles.position}>
          <div className={styles.descr}>{props.description}</div>
        </div>
      </div>
    </div>
  );
};

export default Events;

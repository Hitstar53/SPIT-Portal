import React, { useState } from "react";
import ScrollModal from "../Modals/ScrollModal";
import styles from "./AnnounceCard.module.css";
import dayjs from "dayjs";
import { Avatar } from "@mui/material";

const Announcement = (props) => {
  const title = "Announcement from " + props.item.by;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div className={styles.cardItem} onClick={handleClickOpen}>
        <Avatar
          alt={props.item.sender}
          src={props.item.senderPhoto}
          sx={{
            width: "3rem",
            height: "3rem",
            marginRight: "1rem",
            alignSelf: "center",
          }}
        />
        <div>
          <div className={styles.cardItemHeader}>
            <h1>{props.item.title}</h1>
            <div className={styles.cardDate}>{dayjs(props.item.postDate).format("DD-MM-YYYY")}</div>
          </div>
          <div className={styles.cardItemSubHeader}>
            <p>From: {props.item.sender}</p>
          </div>
          <p className={styles.cardItemContent}>
            {props.item.description.substring(0, 125) + "..."}
          </p>
        </div>
      </div>
      {open && (
        <ScrollModal
          open={open}
          title={props.item.title}
          content={props.item.description}
          action="Close"
          onClose={handleClose}
        />
      )}
    </React.Fragment>
  );
};

export default Announcement;

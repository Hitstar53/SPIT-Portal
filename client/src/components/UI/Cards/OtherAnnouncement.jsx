import React, { useState } from "react";
import ScrollModal from "../Modals/ScrollModal";
import styles from "./AnnounceCard.module.css";

const OtherAnnouncement = (props) => {
  const title = "Announcement from " + props.item.title;
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleHover = () => {
    setIsHover(true);
  };
  const handleHoverLeave = () => {
    setIsHover(false);
  };
  return (
    <>
      <div
        onClick={handleClickOpen}
        className={styles.cardItem}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverLeave}
        style={{
          backgroundColor: isHover
            ? "var(--secondary-color)"
            : "var(--secondary-color)",
          filter: isHover ? "brightness(0.8)" : "",
        }}
      >
        <div className={styles.cardItemLogo}>
          <img src={props.item.logo} alt="logo" />
        </div>
        <div className={styles.cardItemHeader}>
          <h1>{props.item.title}</h1>
          <p>{props.item.date}</p>
        </div>
        <div className={styles.cardItemSubHeader}>
          <p>From: {props.item.by}</p>
          <p>Type: {props.item.type}</p>
        </div>
        <p className={styles.cardItemContent}>{props.item.description}</p>
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
    </>
  );
};

export default OtherAnnouncement;

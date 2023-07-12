import { useState } from "react";
import ScrollModal from "../Modals/ScrollModal";
import styles from "./AnnounceCard.module.css";
import { Avatar } from "@mui/material";
import dayjs from "dayjs"


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
          <Avatar
            sx={{ width: 75, height: 75, fontSize: "3rem", margin: "0 auto" }}
            alt={props.item.sender}
            src={props.item.senderPhoto}
          />
        </div>
        <div className={styles.cardItemHeader}>
          <h1>{props.item.title}</h1>
          <p>{dayjs(props.item.postDate).format('DD-MM-YYYY')}</p>
        </div>
        <div className={styles.cardItemSubHeader}>
          <p>From: {props.item.sender}</p>
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

import React, { useState } from 'react'
import ScrollModal from '../Modals/ScrollModal'
import styles from './AnnounceCard.module.css'
import dayjs from "dayjs";
import { Avatar } from '@mui/material'

const Announcement = (props) => {
    const title = "Announcement from " + props.item.by
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    console.log(props.item)
    return (
      <React.Fragment>
        <div className={styles.cardItem} onClick={handleClickOpen}>
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
      </React.Fragment>
    );
}

export default Announcement
import React, { useState } from 'react'
import ScrollModal from '../Modals/ScrollModal'
import styles from './AnnounceCard.module.css'

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
                    <img src={props.item.senderPhoto} alt="logo" />
                </div>
                <div className={styles.cardItemHeader}>
                    <h1>{props.item.title}</h1>
                    <p>{props.item.postDate}</p>
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
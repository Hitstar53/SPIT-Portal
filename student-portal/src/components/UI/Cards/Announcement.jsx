import React, { useState } from 'react'
import ScrollModal from '../Modals/ScrollModal'
import styles from './AnnounceCard.module.css'

const Announcement = (props) => {
    const title = "Announcement from " + props.item.title
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <>
            <div className={styles.cardItem} onClick={handleClickOpen}>
                <div className={styles.cardItemLogo}>
                <img src={props.item.logo} alt="logo" />
                </div>
                <h1 className={styles.cardItemHeader}>{props.item.title}</h1>
                <p className={styles.cardItemContent}>{props.item.description}</p>
            </div>
            {open && (
                <ScrollModal
                    open={open}
                    title={title}
                    content={props.item.description}
                    action="Close"
                    onClose={handleClose}
                />
            )}
        </>
    );
}

export default Announcement
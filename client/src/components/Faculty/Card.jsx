import React, { useState } from "react";
import styles from "./Card.module.css";
import ScrollModal from '../UI/Modals/ScrollModal'

const AncmntExam = (props) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
            <h1 className={styles.sent}>Sent to: {props.sendTo} {props.year} {props.branch} {props.division} {props.uid}</h1>
            <div className={styles.ancmntCard} onClick={handleClickOpen}>
                <div className={styles.content}>
                    <div className={styles.title}>
                    <h2>{props.title}</h2>
                    <h3>{props.date}</h3>
                    </div>
                    <h4 className={styles.sub} >{props.type}</h4>
                    <div className={styles.paragraph}>
                        {props.ancmnt} 
                    </div>
                </div>
            </div>
            {open && (
                <ScrollModal
                    open={open}
                    title={props.title}
                    content={props.ancmnt}
                    action="Close"
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default AncmntExam;
import React from 'react'
import EventAccordion from '../EventAccordion'
import styles from './EventCard.module.css'
import logo from "../../../assets/user.svg"

const data = [
    {
        logo: logo,
        name: "CSI Hackathon",
        club: "Computer Society of India",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
    },
    {
        logo: logo,
        name: "CSI Hackathon",
        club: "Computer Society of India",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
    },
    {
        logo: logo,
        name: "CSI Hackathon",
        club: "Computer Society of India",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
    },
    {
        logo: logo,
        name: "CSI Hackathon",
        club: "Computer Society of India",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
    },
]

const EventCard = (props) => {
    return (
        <div className={styles.card}>
            {props.data.length === 0 ? 
                <div className={styles.inner}
                    style={{
                        padding: "1rem 0",
                    }}
                >
                    <p
                    style={{
                        gridColumn: "1 / 3",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                    }}
                    >
                    No Upcoming Events</p>
                </div> : (
                    <div className={styles.inner}>
                        <EventAccordion data={props.data} />
                    </div>
                )}
        </div>
    )
}

export default EventCard
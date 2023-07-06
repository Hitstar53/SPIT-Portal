import React from 'react'
import EventAccordion from '../EventAccordion'
import styles from './EventCard.module.css'
import logo from "../../../assets/user.svg"

const data = [
    {
        logo: logo,
        title: "CSI Hackathon",
        club: "Computer Society of India",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
    },
    {
        logo: logo,
        title: "CSI Hackathon",
        club: "Computer Society of India",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
    },
    {
        logo: logo,
        title: "CSI Hackathon",
        club: "Computer Society of India",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
    },
    {
        logo: logo,
        title: "CSI Hackathon",
        club: "Computer Society of India",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
    },
]

const EventCard = (props) => {
    return (
        <div className={styles.card}>
            <div className={styles.inner}>
                <EventAccordion data={props.data} />
            </div>
        </div>
    )
}

export default EventCard
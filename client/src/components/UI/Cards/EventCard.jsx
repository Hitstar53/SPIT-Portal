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

const EventCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.inner}>
                {/* {data.map((item, index) => (
                    <div className={styles.cardItem} key={index}>
                        <div className={styles.cardItemLogo}>
                            <img src={item.logo} alt="logo" />
                        </div>
                        <div className={styles.cardItemContent}>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))} */}
                <EventAccordion data={data} />
            </div>
        </div>
    )
}

export default EventCard
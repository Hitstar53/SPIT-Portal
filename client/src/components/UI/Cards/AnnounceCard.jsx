import React from 'react'
import Announcement from './Announcement'
import styles from './AnnounceCard.module.css'
import logo from "../../../assets/user.svg"

const data = [
  {
    logo: logo,
    title: "Sign up for an event",
    by: "Dr. YS Rao",
    date: "6/7/2023",
    type: "general",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
  {
    logo: logo,
    title: "Instructions for open house",
    by: "Prof. Ruchika Patil",
    date: "18/6/2023",
    type: "academic",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
  {
    logo: logo,
    title: "Make cycles and do Yoga",
    by: "Dr. B.N. Chaudhari",
    date: "12/5/2023",
    type: "general",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
  {
    logo: logo,
    title: "IEEE conference on AI",
    by: "Dhananjay Kalbande",
    date: "1/5/2023",
    type: "general",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
]

const AnnounceCard = (props) => {
  return (
    <div className={styles.card}>
      {props.data.length === 0 ? 
      <div className={styles.cardItem}>
        <p
          style={{
            gridColumn: "1 / 3",
            fontSize: "1rem",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          No Announcements Yet</p>
      </div> : (
        <div className={styles.inner}>
          {props.data.map((item, index) => (
            <Announcement key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AnnounceCard
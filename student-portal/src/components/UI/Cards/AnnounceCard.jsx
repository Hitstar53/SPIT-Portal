import React from 'react'
import styles from './AnnounceCard.module.css'
import logo from "../../../assets/user.svg"

const data = [
  {
    logo: logo,
    title: "Announcement 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
  {
    logo: logo,
    title: "Announcement 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
  {
    logo: logo,
    title: "Announcement 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
  {
    logo: logo,
    title: "Announcement 4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
]

const AnnounceCard = () => {
  return (
    <div className={styles.card}>
      {data.map((item, index) => (
        <div className={styles.cardItem} key={index}>
          <div className={styles.cardItemLogo}>
            <img src={item.logo} alt="logo" />
          </div>
          <div className={styles.cardItemContent}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnnounceCard
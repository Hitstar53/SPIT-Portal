import React from 'react'
import Announcement from './Announcement'
import styles from './AnnounceCard.module.css'
import logo from "../../../assets/user.svg"

const data = [
  {
    logo: logo,
    title: "Dr. YS Rao",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
  {
    logo: logo,
    title: "Prof. Ruchika Patil",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
  {
    logo: logo,
    title: "Dr. B.N. Chaudhari",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
  {
    logo: logo,
    title: "Dhananjay Kalbande",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc"
  },
]

const AnnounceCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        {data.map((item, index) => (
          <Announcement key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default AnnounceCard
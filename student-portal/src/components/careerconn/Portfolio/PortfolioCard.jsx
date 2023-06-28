import React from 'react'
import { FiUsers } from 'react-icons/fi'
import styles from './PortfolioCard.module.css'

const ProjectCard = (props) => {
  const flag = props.team !== undefined
  return (
    <div className={styles.card} style={{backgroundColor: `${props.style.bg}`, color: `${props.style.font}`, borderColor: `${props.style.border}`}}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h3>{props.title}</h3>
          <h3>{props.duration}</h3>
        </div>
        <div className={styles.row1}>
          {flag && (
            <div className={styles.team}>
              <FiUsers className={styles.teamIcon} />
              <h3 className={styles.teamHeading}>Team: </h3>
              {
                props.team.map((member, index) => {
                  return (
                    <h3 className={styles.teamMember} key={index}>{member}</h3>
                  )
                })
              }
            </div>
          )}
          {!flag && (
            <div className={styles.team}>
              <FiUsers className={styles.teamIcon} />
              <h3 className={styles.teamHeading}>Mentor: </h3>
              <h3 className={styles.teamMember}>{props.mentor}</h3>
            </div>
          )}
          <div className={styles.domain}>
            <i className="fas fa-code"></i>
            <h3>{props.domain}</h3>
          </div>
        </div>
        <div className={styles.row2}>
          <div className={styles.techStack}>
            {
              props.techStack.map((tech, index) => {
                return (
                  <h3 style={{}} className={styles.tech} key={index}>{tech}</h3>
                )
              })
            }
          </div>
        </div>
        <div className={styles.row3}>
          <p className={styles.description}>{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard
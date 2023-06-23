import React from 'react'
import styles from './ProjectCard.module.css'

const ProjectCard = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h3>{props.title}</h3>
          <h3>{props.duration}</h3>
        </div>
        <div className={styles.row1}>
          <div className="team">
            <i className="fas fa-users"></i>
            <h3 className={styles.teamHeading}>Team: </h3>
            {
              props.team.map((member, index) => {
                return (
                  <h3 className={styles.teamMember} key={index}>{member}</h3>
                )
              })
            }
          </div>
          <h3 className={styles.domain}>{props.domain}</h3>
        </div>
        <div className={styles.row2}>
          <div className={styles.techStack}>
            <i className="fas fa-code"></i>
            <h3 className={styles.techStackHeading}>Tech Stack</h3>
            {
              props.techStack.map((tech, index) => {
                return (
                  <h3 className={styles.tech} key={index}>{tech}</h3>
                )
              })
            }
          </div>
        </div>
        <div className={styles.row3}>
          <h3 className={styles.description}>{props.description}</h3>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard
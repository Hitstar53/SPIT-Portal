import React from 'react'
import ProjectCard from "./ProjectCard"
import styles from './Projects.module.css'

const Projects = (props) => {
  return (
    <div className={styles.projects}>
      <ProjectCard />
    </div>
  )
}

export default Projects
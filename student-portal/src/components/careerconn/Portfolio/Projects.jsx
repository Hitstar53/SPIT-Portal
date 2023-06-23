import React from 'react'
import ProjectCard from "./ProjectCard"
import styles from './Projects.module.css'

const ProjectData = [
  {
    title: "Project 1",
    duration: "1 month",
    team: ["A", "B", "C"],
    domain: "Web Development",
    techStack: ["React", "Node", "MongoDB"],
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    title: "Project 2",
    duration: "2 months",
    team: ["A", "B", "C"],
    domain: "Web Development",
    techStack: ["React", "Node", "MongoDB"],
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
]

const Projects = (props) => {
  return (
    <div className={styles.projects}>
      {ProjectData.map((project, index) => {
          return (
            <ProjectCard
              key={index}
              title={project.title}
              duration={project.duration}
              team={project.team}
              domain={project.domain}
              techStack={project.techStack}
              description={project.description}
            />
          )
        })
      }
    </div>
  )
}

export default Projects
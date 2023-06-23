import React from 'react'
import ProjectCard from './PortfolioCard'
import styles from "./Projects.module.css";

const ResearchData = [
  {
    title: "ReviewScope - AI Product Reviewer",
    duration: "3 months",
    team: ["Hatim", "Omkar", "Udit"],
    domain: "Web Development",
    techStack: ["React", "Node", "MongoDB", "Express", "HTML", "CSS", "JS"],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    title: "ReviewScope - AI Product Reviewer",
    duration: "2 months",
    team: ["Hatim", "Omkar", "Udit"],
    domain: "Web Development",
    techStack: ["React", "Node", "MongoDB", "Express", "HTML", "CSS", "JS"],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
];

const Research = () => {
  return (
    <div className={styles.projects}>
      {ResearchData.map((project, index) => {
        return (
          <ProjectCard
            key={index}
            title={project.title}
            duration={project.duration}
            team={project.team}
            domain={project.domain}
            techStack={project.techStack}
            description={project.description}
            style={{
                bg: "var(--card-alt-color)",
                font: "var(--text-color)",
                border: "var(--text-color)",
            }}
          />
        );
      })}
    </div>
  );
}

export default Research
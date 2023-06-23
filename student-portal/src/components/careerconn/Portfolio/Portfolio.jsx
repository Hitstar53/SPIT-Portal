import React, { useState } from 'react'
import SkillSet from './SkillSet'
import Projects from './Projects'
import styles from './Portfolio.module.css'

const Portfolio = () => {
  const container = styles.container + " flex flex-col gap-8 p-8"
  return (
    <div className={container}>
      <h1 className="text-4xl font-semibold">My Portfolio</h1>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl p-1 font-semibold heading">Skill Set</h1>
        <SkillSet />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl p-1 font-semibold heading">Projects</h1>
        <Projects />
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <h1 className="text-xl p-1 font-semibold heading">Research</h1>
        
      </div>
    </div>
  );
}

export default Portfolio
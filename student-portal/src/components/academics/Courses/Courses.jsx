import React, { useRef } from 'react'
import Lottie from 'lottie-react'
import animationData from '../../../assets/phone-animation.json'
import styles from './Courses.module.css'

const Courses = () => {
  const animationRef = useRef(null)
  return (
    <div className='text-2xl font-semibold min-h-[calc(100vh-64px)] flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)]'>
      <h1>Animation Testing</h1>
      <div className='w-96 h-96'>
        <Lottie
          onComplete={() => {
            animationRef.current.setDirection(-1)
            animationRef.current.play()
            animationRef.current.setSpeed(5)
          }}
          loop={false}
          lottieRef={animationRef}
          animationData={animationData} 
        />
      </div>
    </div>
  )
}

export default Courses
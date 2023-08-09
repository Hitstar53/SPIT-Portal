import React from 'react'
import styles from './NoData.module.css'

const NoData = (props) => {
  return (
    <div className={styles.noData}>
        <h1>{props.title}</h1>
        <p>{props.message}</p>
    </div>
  )
}

export default NoData
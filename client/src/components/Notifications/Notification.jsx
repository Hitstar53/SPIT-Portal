import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import styles from './Notif.module.css'

const Notification = () => {
    const navigate = useNavigate();
    const container = styles.container + " flex flex-col gap-8 p-8";
    return (
      <div className={container}>
        <h1 className="flex items-center gap-4 text-4xl font-semibold">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="text-2xl cursor-pointer"
          />
          Notifications
        </h1>
      </div>
    );
}

export default Notification
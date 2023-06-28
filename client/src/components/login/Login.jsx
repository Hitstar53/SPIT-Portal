import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import styles from "./Login.module.css";
import moodle from "../../assets/moodle.png";
import logo from "../../assets/spitlogo.jpg";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => 
    { 
    // fetching userinfo can be done on the client or the server
      const userInfo = await axios
      .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      })
      .then(res => res.data);
      localStorage.setItem('userinfo', JSON.stringify(userInfo));
      localStorage.setItem('isLoggedIn', true);
      navigate('student/home')
    }
  });

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome to the S.P.I.T. Portal</h1>
        </div>
        <button className={styles.loginButt} onClick={() => login()} disabled>
          <i
            className="fa-brands fa-google"
            style={{ marginRight: "10px" }}
          ></i>
          Login as Faculty
        </button>
        <div className={styles.or}>
          <hr className={styles.divider} />
          <div style={{ margin: "10px" }}>or</div>
          <hr className={styles.divider} />
        </div>
        <button className={styles.loginButt} onClick={() => login()}>
          <i
            className="fa-brands fa-google"
            style={{ marginRight: "10px" }}
          ></i>
          Login as Student
        </button>
        <div className={styles.links}>
          <a target="_blank" href="https://moodle.spit.ac.in/login/">
            <img className={styles.linksImg} src={moodle} alt="moodle" />
            <p>Moodle</p>
          </a>
          <a target="_blank" href="https://www.spit.ac.in/">
            <img className={styles.linksImg} src={logo} alt="spit" />
            <p>Website</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

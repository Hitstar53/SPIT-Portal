import React, { useState } from "react";
import styles from "./Login.module.css";
import { useGoogleLogin,GoogleLogin } from "@react-oauth/google";
import moodle from "../../assets/moodle.png";
import logo from "../../assets/spitlogo.jpg";
import bg from "../../assets/spitbg.jpg";
import LoginAnim from "../../assets/loginAnim.json";
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => 
    { 
    // fetching userinfo can be done on the client or the server
      const userInfo = await axios
      .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      })
      .then(res => res.data);
      console.log(userInfo);
      localStorage.setItem('userinfo', JSON.stringify(userInfo));
      navigate('/student/home')
    }
  });

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome to the S.P.I.T. Portal</h1>
        </div>
        <button className={styles.loginButt} onClick={() => login()}>
          <i
            className="fa-brands fa-google"
            style={{ marginRight: "10px" }}
          ></i>
          Login as Faculty
        </button>
        <div className={styles.or}>
          <hr style={{ height: "0.5px" }} />
          <div style={{ margin: "10px" }}>or</div>
          <hr style={{ height: "0.5px" }} />
        </div>
        <button className={styles.loginButt} onClick={() => login()}>
          <i
            className="fa-brands fa-google"
            style={{ marginRight: "10px" }}
          ></i>
          Login as Student
        </button>
        <div className={styles.links}>
          <a href="https://moodle.spit.ac.in/login/">
            <img className={styles.linksImg} src={moodle} alt="moodle" />
            <p>Moodle</p>
          </a>
          <a href="https://www.spit.ac.in/">
            <img className={styles.linksImg} src={logo} alt="spit" />
            <p>Website</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

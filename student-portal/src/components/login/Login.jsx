import React, { useState } from "react";
import styles from "./Login.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import moodle from "../../assets/moodle.png";
import logo from "../../assets/spitlogo.jpg";
import LoginAnim from "../../assets/loginAnim.json";

const Login = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome to the SPIT Portal</h1>
        </div>
        <button className={styles.loginButt} onClick={() => login()}>
          <i className="fa-brands fa-google" style={{marginRight: "10px"}}></i>
          Login as Faculty
        </button>
        <div className={styles.or}>
            <hr style={{height: "0.5px"}} />
            <div style={{margin: "10px"}}>or</div>
            <hr style={{height: "0.5px"}}/>
        </div>
        <button className={styles.loginButt} onClick={() => login()}>
          <i className="fa-brands fa-google" style={{marginRight: "10px"}}></i>
          Login as Student
        </button>
        <div className={styles.links}>
          <a href="#">
            <img className={styles.linksImg} src={moodle} alt="moodle" />
            <p>Moodle</p>
          </a>
          <a href="#">
            <img className={styles.linksImg} src={logo} alt="spit" />
            <p>Website</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

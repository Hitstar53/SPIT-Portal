import React, { useContext, useState } from "react";
import styles from "../styles/Login.module.css";
import { useGoogleLogin,GoogleLogin } from "@react-oauth/google";
import moodle from "../assets/moodle.png";
import logo from "../assets/SPIT_Logo Colour.png";
import axios from "axios"
import { UserContext } from "../context/UserContext";

const Login = ({ isLoggedIn, setIsLoggedIn}) => {
  const {user, setUser} = useContext(UserContext);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => 
    { 
      const userInfo = await axios
      .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      })
      .then(res => res.data);
      localStorage.setItem('userinfo', JSON.stringify(userInfo));
      handleLogin(userInfo.email)
    }
  });

  const handleLogin = async(email) => {
    await axios
    .post("http://localhost:5000/api/faculty/login", { email })
    .then((res) => {
      console.log(res.data);
      setIsLoggedIn(true);
      setUser(res.data)
      localStorage.setItem("loggedin", true);
    })
    .catch((err) => {
      localStorage.clear();
      console.log(err);
    });
  };

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
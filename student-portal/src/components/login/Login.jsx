import React, { useState } from "react";
import styles from "./Login.module.css";
import Lottie from "lottie-react";
import LoginAnim from "../../assets/loginAnim.json";

const Login = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoginAnim,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };
    
    return (
      <div>
        LOGIN ANIMATION
        <div>
            <Lottie 
            options={defaultOptions}
            height={400}
            width={400}
            />
        </div>
      </div>
    );
}

export default Login;
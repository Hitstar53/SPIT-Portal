import { React, useState } from "react";
import axios from "axios";
import "../styles/Login.css";

export default function Login({ isLoggedIn, setIsLoggedIn}) {
  const [email, setEmail] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/faculty/login", 
    { email }).then((res) => {
      console.log(res);
      setIsLoggedIn(true)
      localStorage.setItem("loggedin", true);
    }).catch((err) => {
        localStorage.clear()
      console.log(err);
    })
  }

  return (
    <div className="Auth-form-container">
      <form onSubmit={handleLogin} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

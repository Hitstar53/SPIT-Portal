import React from "react";
import { Navigate } from "react-router-dom";

const Protected = (props) => {
  const role = localStorage.getItem("role");
  // if (!props.isLoggedIn) {
  //   return <Navigate to="/" replace />;
  // }
  // if (role !== "Faculty") {
  //   alert("You are not a faculty member");
  //   return <Navigate to="/student/home" replace />;
  // }
  return props.children;
};

export default Protected;

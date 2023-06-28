import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./Index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1022374715852-08he0cp90hauoe1vmmf6ec932leo3lo4.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

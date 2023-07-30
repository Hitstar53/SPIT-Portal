import React from "react";
import { Link, useRouteError, useNavigate } from "react-router-dom";
import { Info } from "@mui/icons-material";
import Lottie from "lottie-react";
import animationData from "../assets/page-not-found-2.json";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);
  let title = "An error occurred";
  let message = error?.message || "Something went wrong";
  if (error?.status === 404) {
    title = "404 Page Not Found";
    message = error.error.message || "Check your URL";
  } else if (error?.status === 403) {
    title = "403 Forbidden";
    message = "You are not authorized to access this page";
  } else if (error?.status === 500) {
    title = "500 Internal Server Error";
    message = error.error.message || "Something went wrong";
  } else if (error?.status === 422) {
    title = "422 Unprocessable Entity";
    message = error.data.message || "Something went wrong";
  }
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-start pt-8">
      <div className="w-[25rem]">
        <Lottie animationData={animationData} />
      </div>
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-xl text-gray-400">{message}</p>
      <div className="flex">
        <button onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button>
      </div>
      <p className="text-gray-600 flex gap-2 items-center">
        <Info /> If this keep happeninwg, please 
        <span className="text-blue-500 font-semibold">
          <a href="mailto:hatim.sawai@spit.ac.in" target="_blank">
            contact us
          </a>
        </span>
      </p>
    </div>
  );
};

export default ErrorPage;

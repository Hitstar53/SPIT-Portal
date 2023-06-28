import React from "react";
import { Link, useRouteError, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/page-not-found.json";

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
  }
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center">
      <div className="w-[25rem] ">
        <Lottie animationData={animationData} />
      </div>
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-xl text-gray-400">{message}</p>
      <div className="flex gap-4">
        <button onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

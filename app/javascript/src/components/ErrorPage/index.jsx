import React from "react";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1> Uh oh, that was unexpected.</h1>
      <a href="/" className="font-semibold text-blue-800 my-4">
        Click to try going back home
      </a>
    </div>
  );
};

export default ErrorPage;

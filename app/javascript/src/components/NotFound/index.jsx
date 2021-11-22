import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1>Oops.. Page Not Found</h1>
      <a className="px-5 py-3 my-10 rounded-lg bg-gray-100" href="/">
        Back Home 🚀
      </a>
    </div>
  );
};

export default NotFound;

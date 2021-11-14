import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import authApi from "apis/auth";
import { deleteAuthHeaders } from "apis/axios";
import { UserContext } from "common/userContext";

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const logOut = async () => {
    setIsLoggingOut(true);
    try {
      await authApi.logout();
      localStorage.clear();
      deleteAuthHeaders();
      history.push("/login");
    } catch (err) {
      setIsLoggingOut(false);
      logger.error(err);
    }
  };
  return (
    <div className="h-16 w-full top-0 shadow-sm flex flex-row flex-wrap justify-between px-10 bg-white items-center z-50">
      <div className="flex items-center font-black text-lg">Quizzy</div>
      <div className="flex flex-row items-center justify-center">
        {/* TODO: new component*/}
        <div className="mx-3 cursor-pointer font-medium">Reports</div>
        <div className="mx-3 cursor-pointer font-medium">
          {currentUser?.userName ?? " "}
        </div>
        <button
          disabled={isLoggingOut}
          onClick={logOut}
          className="px-4 py-2 hover:shadow-md duration-500 ease-in-out text-red-900 font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default NavBar;

import React, { useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import authApi from "apis/auth";

import { deleteAuthHeaders } from "../../apis/axios";
import { setToLocalStorage } from "../../helpers/localStorage";

const NavBar = () => {
  const history = useHistory();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const logOut = async () => {
    setIsLoggingOut(true);
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });

      deleteAuthHeaders();
      history.push("/login");
    } catch (err) {
      setIsLoggingOut(false);
      logger.error(err);
    }
  };
  return (
    <div className="h-16 w-full shadow-sm flex flex-row flex-wrap justify-between px-10 items-center">
      <div className="flex items-center text-gray-700 font-black text-lg">
        Quizzy
      </div>
      <div className="flex flex-row items-center justify-center">
        <button
          disabled={isLoggingOut}
          onClick={logOut}
          className="px-4 py-2 hover:shadow-md duration-200 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default NavBar;

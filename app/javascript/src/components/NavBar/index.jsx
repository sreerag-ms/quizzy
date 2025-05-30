import React, { useState, useContext } from "react";

import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { deleteAdminHeaders } from "apis/adminHeaders";
import authApi from "apis/auth";
import { deletePublicHeaders } from "apis/publicHeaders";
import { UserContext } from "common/userContext";

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { slug } = useParams();
  const isPublic = window.location.pathname.startsWith("/public/quiz/");
  const logOut = async () => {
    setIsLoggingOut(true);
    try {
      await authApi.logout();
      if (isPublic && slug) {
        sessionStorage.clear();
        deletePublicHeaders();
        history.push(`/public/quiz/${slug}`);
      } else {
        localStorage.clear();
        deleteAdminHeaders();
        history.push("/login");
      }
    } catch (err) {
      setIsLoggingOut(false);
      logger.error(err);
    }
  };
  const trimmedName = (currentUser?.userName ?? "").slice(0, 20);
  const handleReportClick = () => history.push("/reports");
  const handleHomeClick = () => (window.location.href = "/");

  return (
    <div className="h-16 w-full top-0 shadow-sm flex flex-row flex-wrap justify-between px-10 bg-white items-center z-50">
      <button
        className="flex items-center font-black text-lg"
        onClick={isPublic || handleHomeClick}
      >
        Quizzy
      </button>
      <div className="flex flex-row items-center justify-center">
        {isPublic || (
          <button
            className="mx-3 px-4 py-2 hover:shadow-md duration-500 ease-in-out font-medium"
            onClick={handleReportClick}
          >
            Reports
          </button>
        )}

        {/* TODO: Set username on standard user login */}
        {isPublic || <div className="mx-3  font-medium">{trimmedName}</div>}
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

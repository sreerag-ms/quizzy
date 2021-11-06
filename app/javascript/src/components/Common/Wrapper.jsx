/* eslint-disable no-unused-vars */
import React from "react";

import PropTypes from "prop-types";

import NavBar from "../NavBar";

const Wrapper = ({ children }) => {
  return (
    <div className="h-screen relative  flex flex-col">
      <NavBar />
      <div className="box-border relative px-12 h-full overflow-scroll">
        {children}
      </div>
    </div>
  );
};
Wrapper.propTypes = { children: PropTypes.node.isRequired };
export default Wrapper;

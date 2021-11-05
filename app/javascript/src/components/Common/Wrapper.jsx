import React from "react";

import PropTypes from "prop-types";

import NavBar from "../NavBar";

const Wrapper = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="p-10">{children}</div>
    </div>
  );
};
Wrapper.propTypes = { children: PropTypes.node.isRequired };
export default Wrapper;

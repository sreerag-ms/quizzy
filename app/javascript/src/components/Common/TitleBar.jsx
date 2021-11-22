import React from "react";

import PropTypes from "prop-types";

const TitleBar = ({ title, children }) => {
  return (
    <div className="flex flex-row justify-between h-16 items-center mt-8 mb-2">
      <div className="text-left text-2xl text-gray-600 font-semibold">
        {title}
      </div>
      <div className="flex flex-row items-center h-12">{children}</div>
    </div>
  );
};
TitleBar.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
export default TitleBar;

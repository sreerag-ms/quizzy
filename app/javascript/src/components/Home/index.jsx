import React from "react";

import Wrapper from "components/Common/Wrapper";
import { getFromLocalStorage } from "helpers/localStorage";

const Home = () => {
  return <Wrapper>{getFromLocalStorage("userName")}'s Home</Wrapper>;
};

export default Home;

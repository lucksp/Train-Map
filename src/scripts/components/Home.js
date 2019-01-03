import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Link to="/link">Test Link</Link>
    </div>
  );
};

export default Home;

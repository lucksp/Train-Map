import React from "react";
import DataMap from "./features/map";
import Card from "./component/card";
import CardTitle from "./component/card/card-title";

const Home = () => {
  return (
    <div>
      <h1>Let's see how you did</h1>
      <Card>
        <CardTitle text="Mapped Route" />
        <DataMap />
      </Card>
    </div>
  );
};

export default Home;

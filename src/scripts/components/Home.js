import React from "react";
import DataMap from "./features/map";
import Card from "./component/card";
import CardTitle from "./component/card/card-title";
import Graph from "./features/graph";
import Effort from "./features/efforts";

const Home = () => {
  return (
    <div>
      <h1>Let's see how you did</h1>
      <Card addClass="map">
        <CardTitle text="Mapped Route" />
        <DataMap />
      </Card>
      <Card addClass="graph">
        <CardTitle text="Power Output: 2 minute intervals" />
        <Graph />
      </Card>
      <Card addClass="efforts">
        <CardTitle text="Best Effort" />
        <Effort />
      </Card>
    </div>
  );
};

export default Home;

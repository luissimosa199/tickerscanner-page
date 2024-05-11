import { Statistic } from "@/types";
import React from "react";

const StatCard = ({ stat }: { stat: Statistic }) => {
  return (
    <div className="border m-2 p-2 border-2">
      <h3>{stat.name}</h3>
      <p>{JSON.stringify(stat.data)}</p>
    </div>
  );
};

export default StatCard;

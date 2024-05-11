import React from "react";
import { cookies } from "next/headers";
import StatCard from "@/components/StatCard";
import { StatisticId, Statistic } from "@/types";

const TICKER_APP_URL = process.env.NEXT_PUBLIC_TICKER_APP_URL as string;

const StatsPage = async () => {
  const useCookies = cookies();
  const token = useCookies.get("token");
  const response = await fetch(`${TICKER_APP_URL}/stats/mainStats`, {
    next: {
      tags: ["stats"],
    },
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  const allStats = await response.json();

  return (
    <div>
      <ul>
        {allStats.map((stat: Statistic) => {
          return (
            <li key={stat.id}>
              <StatCard stat={stat} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatsPage;

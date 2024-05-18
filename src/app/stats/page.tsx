import React from "react";
import { cookies } from "next/headers";
import StatCard from "@/components/StatCard";
import { Statistic, StatisticId } from "@/types";
import BarChart from "@/components/BarChart";

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

  const allStats = (await response.json()) as Statistic[];

  const extractStat = (id: StatisticId): Statistic | null => {
    return allStats.find((e: Statistic) => e.id === id) ?? null;
  };

  const MOST_FREQUENTLY_BOUGHT_ITEM = extractStat(
    StatisticId.MOST_FREQUENTLY_BOUGHT_ITEM
  );

  return (
    <div>
      <ul className="flex flex-col justify-center items-center gap-y-4 mt-4">
        <li className="md:w-1/2 w-full ">
          {MOST_FREQUENTLY_BOUGHT_ITEM && (
            <BarChart data={MOST_FREQUENTLY_BOUGHT_ITEM} />
          )}
        </li>

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

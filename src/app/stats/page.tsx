import React from "react";
import StatCard from "@/components/StatCard";
import { Statistic, StatisticId } from "@/types";
import BarChart from "@/components/BarChart";

const TICKER_APP_URL = process.env.NEXT_PUBLIC_TICKER_APP_URL as string;

export const dynamic = "force-dynamic";

const StatsPage = async () => {
  const response = await fetch(`${TICKER_APP_URL}/stats/mainStats`, {
    next: {
      tags: ["stats"],
    },
  });

  if (!response.ok) {
    console.log("error", response.statusText);
    return (
      <p className="text-center mt-4">
        No se pudieron cargar las estadísticas.
      </p>
    );
  }

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

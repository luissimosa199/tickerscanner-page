import React from "react";
import { cookies } from "next/headers";

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

  console.log(allStats);

  return <div>StatsPage</div>;
};

export default StatsPage;

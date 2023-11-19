import { Ticket } from "@/types";
import { cookies } from "next/headers";

const TICKER_APP_URL = process.env.NEXT_PUBLIC_TICKER_APP_URL as string;

export const getTickets = async () => {
  const useCookies = cookies();

  const token = useCookies.get("token");

  const response = await fetch(`${TICKER_APP_URL}/tickets`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) {
    console.log("error", response.statusText);
    return;
  }

  const data = await response.json().catch((error) => {
    throw new Error(error);
  }) as Ticket[];

  return data
};

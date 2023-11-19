import { Ticket } from "@/types";
import { cookies } from "next/headers";

const TICKER_APP_URL = process.env.NEXT_PUBLIC_TICKER_APP_URL as string;

export const getTicketDetails = async (
  _id: string
): Promise<Ticket | Error> => {
  const useCookies = cookies();

  const token = useCookies.get("token");

  const response = await fetch(`${TICKER_APP_URL}/tickets/${_id}`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) {
    console.log("error", response.statusText);
    return new Error(response.statusText);
  }

  const data = (await response.json().catch((error) => {
    throw new Error(error);
  })) as Ticket;

  return data;
};

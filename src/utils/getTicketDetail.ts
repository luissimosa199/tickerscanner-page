import { Ticket } from "@/types";

const TICKER_APP_URL = process.env.NEXT_PUBLIC_TICKER_APP_URL as string;

export const getTicketDetails = async (
  _id: string
): Promise<Ticket | Error> => {
  const response = await fetch(`${TICKER_APP_URL}/tickets/${_id}`);

  if (!response.ok) {
    console.log("error", response.statusText);
    return new Error(response.statusText);
  }

  const data = (await response.json().catch((error) => {
    throw new Error(error);
  })) as Ticket;

  return data;
};

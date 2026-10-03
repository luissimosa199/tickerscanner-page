import { TicketsRequest } from "@/types";

const TICKER_APP_URL = process.env.NEXT_PUBLIC_TICKER_APP_URL as string;

export const getTickets = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${TICKER_APP_URL}/tickets?page=${page}&limit=${limit}`,
    {
      next: {
        tags: ["tickets"],
      },
    }
  );

  if (!response.ok) {
    console.log("error", response.statusText);
    return {
      error: response.statusText,
    };
  }

  if (response.status === 204) {
    console.log("error", response.statusText);
    return {
      error: response.statusText,
    };
  }

  const data = (await response.json().catch((error) => {
    throw new Error(error);
  })) as TicketsRequest;

  return data;
};

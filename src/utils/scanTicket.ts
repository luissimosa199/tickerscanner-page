"use server";

import { cookies } from "next/headers";

const TICKER_APP_URL = process.env.NEXT_PUBLIC_TICKER_APP_URL as string;

export const scanTicket = async (
  url: string,
  ticketHtml: string,
  supermarket: "DISCO" | "EASY" | "JUMBO"
) => {
  try {
    const useCookies = cookies();
    const token = useCookies.get("token");

    const body = {
      supermarket,
      rawTicketHTML: ticketHtml,
      ogTicketUrl: url,
    };

    const response = await fetch(
      `${TICKER_APP_URL}/tickets${token ? "/save" : ""}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token?.value}` : "",
        },
      }
    );

    if (response.status === 401) {
      return {
        success: false,
        error: response.statusText,
        message: "Unauthorized",
      };
    }

    // TODO: handle conflict error (duplicate)

    return response.json();
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

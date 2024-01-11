"use server";

import { cookies } from "next/headers";

const TICKER_APP_URL = process.env.NEXT_PUBLIC_TICKER_APP_URL as string;

export const scanTicket = async (
  url: string,
  ticketHtml: string,
  supermarket: "DISCO" | "EASY" | "JUMBO" | "COTO"
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

    if (response.status === 409) {
      const data = await response.json();
      const errorData = JSON.parse(data.message);
      const statusCode = data.statusCode;
      return {
        success: false,
        data: { _id: errorData._id },
        error: response.statusText,
        message: `Error ${errorData.message}`,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: response.statusText,
        message: `Error ${JSON.stringify(response)}`,
      };
    }

    return response.json();
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

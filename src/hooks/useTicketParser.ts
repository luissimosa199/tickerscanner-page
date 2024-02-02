import { Ticket } from "@/types";
import { getStringAfterLogo } from "@/utils/getSupermarketFromLogo";
import { scanTicket } from "@/utils/scanTicket";
import { QrcodeResult, Html5QrcodeError } from "html5-qrcode/esm/core";
import { FormEvent, useCallback, useState } from "react";
import useScanner from "./useScanner";
import { useRouter } from "next/navigation";

const useTicketParser = () => {
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const router = useRouter();

  const requestHtml = async (url: string) => {
    try {
      let rawHtml;
      try {
        rawHtml = await fetch(url);
      } catch (err) {
        console.log("CORS error, trying another endpoint", err);
        const newResponse = await fetch(
          `${process.env.NEXT_PUBLIC_TICKER_APP_URL}/fetch-html?url=${url}`,
          {
            headers: {
              accept: "text/html",
            },
          }
        );

        rawHtml = newResponse;
      }

      const ticketHtml = await rawHtml.text();

      const DISCO =
        getStringAfterLogo(ticketHtml).includes("disco") && ("DISCO" as const);
      const EASY =
        getStringAfterLogo(ticketHtml).includes("easy") && ("EASY" as const);
      const JUMBO =
        getStringAfterLogo(ticketHtml).includes("jumbo") && ("JUMBO" as const);
      const COTO = url.includes("coto") && ("COTO" as const);

      const supermarket = DISCO || EASY || JUMBO || COTO;

      if (!supermarket) {
        console.error("super market error");
        return;
      }
      return { ticketHtml, supermarket };
    } catch (err) {
      console.log("requestHtml", err);
      return;
    }
  };

  const parseTicket = async (
    url: string,
    ticketHtml: string,
    supermarket: Ticket["supermarket"]
  ) => {
    try {
      const response = await scanTicket(url, ticketHtml, supermarket);

      if (!response.success) {
        if (response.error === "Conflict") {
          // corregir en el back
          router.push(`/duplicate-ticket?_id=${response.data._id}`);
          return;
        }
      }
      setTicket(response);
      return;
    } catch (error) {
      console.error("parseTicket", error);
    }
  };

  const onSuccess = async (result: QrcodeResult) => {
    try {
      const response = await requestHtml(result.text);
      if (response) {
        const { ticketHtml, supermarket } = response;
        parseTicket(result.text, ticketHtml, supermarket);
      }
    } catch (err) {
      console.log("onSuccess", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const urlInput = form.elements.namedItem("url") as HTMLInputElement;
    const url = urlInput.value;

    try {
      const response = await requestHtml(url);
      if (response) {
        const { ticketHtml, supermarket } = response;
        await parseTicket(url, ticketHtml, supermarket);
      }
    } catch (err) {
      console.log("handleSubmit", err);
    }
  };

  const onError = useCallback((error: Html5QrcodeError) => {
    // console.log("onError", error);
    return;
  }, []);

  const previewRef = useScanner(onSuccess, onError);

  return {
    ticket,
    handleSubmit,
    previewRef,
  };
};

export default useTicketParser;

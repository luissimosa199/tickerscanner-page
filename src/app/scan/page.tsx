"use client";
import React, { useCallback, useState } from "react";
import { Html5QrcodeError, QrcodeResult } from "html5-qrcode/esm/core";
import useScanner from "@/hooks/useScanner";
import { scanTicket } from "@/utils/scanTicket";
import { Ticket } from "@/types";
import OneTicketView from "@/components/OneTicketCard";
import Link from "next/link";
import { getStringAfterLogo } from "@/utils/getSupermarketFromLogo";
import OneTicketButtons from "@/components/OneTicketButtons";

const Page = () => {
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const onSuccess = useCallback(async (result: QrcodeResult) => {
    const rawHtml = await fetch(result.text);

    const isCencosud = rawHtml.url.startsWith(
      "https://mifactura.napse.global/"
    );

    const ticketHtml = await rawHtml.text();

    const DISCO = getStringAfterLogo(ticketHtml).includes("disco") && "DISCO";
    const EASY = getStringAfterLogo(ticketHtml).includes("easy") && "EASY";
    const JUMBO = getStringAfterLogo(ticketHtml).includes("jumbo") && "JUMBO";
    const COTO = result.text.includes("coto") && "COTO";

    const supermarket = DISCO || EASY || JUMBO || COTO;

    if (!supermarket) {
      console.error("super market error");
      return;
    }

    try {
      const response = await scanTicket(result.text, ticketHtml, supermarket);
      setTicket(response);
      return;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onError = useCallback((error: Html5QrcodeError) => {
    return;
  }, []);

  const previewRef = useScanner(onSuccess, onError);

  // const fakeTicket: Ticket = {
  //   _id: "1234abc",
  //   ticketItems: [
  //     {
  //       name: "Apples",
  //       quantity: 2,
  //       price: 1.99,
  //       total: 3.98,
  //     },
  //     {
  //       name: "Milk",
  //       quantity: 1,
  //       price: 2.49,
  //       total: 2.49,
  //     },
  //   ],
  //   totalAmount: 6.47,
  //   logoLink: "",
  //   address: "123 Main St, Anytown, USA",
  //   date: "2023-01-06T12:30:00.000Z",
  //   discounts: {
  //     disc_items: [
  //       {
  //         desc_name: "New Customer Discount",
  //         desc_amount: 0.5,
  //       },
  //     ],
  //     disc_total: 0.5,
  //   },
  //   paymentMethod: "Credit Card",
  //   ogTicketUrl: "https://examplesupermarket.com/receipts/1234abc",
  //   supermarket: "JUMBO",
  // };

  return (
    <main className="bg-red-500">
      {/* stage 1 */}
      {!ticket && (
        <div className="min-h-screen flex flex-col gap-6 pt-4 justify-between items-center">
          <div className="w-full relative">
            <h1 className="font-bold text-2xl text-white text-center">
              Ticker Scanner
            </h1>
            <div className="w-8 h-8 bg-white absolute right-2 top-0 rounded-full flex justify-center items-center">
              <Link href="/dashboard">
                <span>🙆‍♂️</span>
              </Link>
            </div>
          </div>
          <div className="w-full h-72 md:h-96 mx-auto overflow-hidden flex justify-center items-center">
            <div
              ref={previewRef}
              id="qr-container"
              className="w-full h-full"
            ></div>
          </div>
          <div className="flex justify-center w-full px-24">
            <div className="bg-white rounded-full px-6 py-4 w-full sm:max-w-xs text-red-500 text-center text-lg font-bold">
              Escanea
            </div>
          </div>
          <p className="text-red-900 font-semibold text-sm">
            Desarrollado por Luis Simosa, 2023
          </p>
        </div>
      )}

      {/* stage 2 */}

      {ticket && (
        <div className="min-h-screen flex flex-col pt-4 px-4 justify-between items-center">
          <OneTicketView ticket={ticket} />
          <OneTicketButtons />
        </div>
      )}
    </main>
  );
};

export default Page;

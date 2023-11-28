"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Html5QrcodeError, QrcodeResult } from "html5-qrcode/esm/core";
import useScanner from "@/hooks/useScanner";
import { scanTicket } from "@/utils/scanTicket";
import { Ticket } from "@/types";
import OneTicketView from "@/components/OneTicketCard";
import Link from "next/link";

const Page = () => {
  const mockTicket = {
    _id: "12345",
    ticketItems: [
      {
        name: "Articulo 1",
        quantity: 1,
        price: 1500,
        total: 1500,
      },
      {
        name: "Articulo 2",
        quantity: 1,
        price: 1500,
        total: 1500,
      },
      {
        name: "Articulo 3",
        quantity: 1,
        price: 1500,
        total: 1500,
      },
    ],
    totalAmount: 43000,
    logoLink: "/ms-icon-144x144.png",
    address: "address",
    date: "11/12/2023",
    discounts: {
      disc_items: [{ desc_name: "desc 1", desc_amount: 120 }],
      disc_total: 120,
    },

    paymentMethod: "payment method",
    ogTicketUrl: "https://example.com",
    supermarket: "DISCO" as const,
  };
  const [ticket, setTicket] = useState<Ticket | null>(mockTicket);

  const onSuccess = useCallback(async (result: QrcodeResult) => {
    const rawHtml = await fetch(result.text);
    const ticketHtml = await rawHtml.text();

    const response = await scanTicket(result.text, ticketHtml);

    setTicket(response);
  }, []);

  const onError = useCallback((error: Html5QrcodeError) => {
    return;
  }, []);

  const previewRef = useScanner(onSuccess, onError);

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
        </div>
      )}
    </main>
  );
};

export default Page;

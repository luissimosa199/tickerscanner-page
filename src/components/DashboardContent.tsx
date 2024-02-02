import React from "react";
import { Ticket } from "@/types";
import TicketsSection from "./TicketsSection";
import ItemsSection from "./ItemsSection";

const DashboardContent = ({
  tickets,
  tab,
  error,
}: {
  tickets: Ticket[];
  tab: "ARTICULOS" | "TICKETS";
  error: string | undefined;
}) => {
  return (
    <section className="min-h-screen w-full pt-4 bg-white">
      {tab === "TICKETS" && <TicketsSection error={error} tickets={tickets} />}
      {tab === "ARTICULOS" && <ItemsSection />}
    </section>
  );
};

export default DashboardContent;

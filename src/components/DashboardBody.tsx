"use client";

import { Ticket } from "@/types";
import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";

const DashboardBody = ({
  tickets,
  error,
}: {
  tickets: Ticket[];
  error: string | undefined;
}) => {
  const [tab, setTab] = useState<"TICKETS" | "ARTICULOS">("TICKETS");

  return (
    <div>
      <DashboardHeader
        tab={tab}
        setTab={setTab}
      />
      <DashboardContent
        tickets={tickets}
        tab={tab}
        error={error}
      />
    </div>
  );
};

export default DashboardBody;

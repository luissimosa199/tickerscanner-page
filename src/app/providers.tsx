"use client";
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useTrackUserAgent from "@/hooks/useTrackUserAgent";

interface ProvidersProps {
  children: ReactNode;
  user_agent_id?: string;
}

function Providers({ children, user_agent_id }: ProvidersProps) {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } })
  );

  useTrackUserAgent(user_agent_id);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default Providers;

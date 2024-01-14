"use client";
import React, { useCallback, useRef } from "react";
import TicketComponent from "./TicketCard";
import {
  HydrationBoundary,
  dehydrate,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

const InfiniteScrollTickets = () => {
  const queryClient = useQueryClient();
  const dehydratedState = dehydrate(queryClient);
  const loader = useRef<HTMLDivElement>(null);

  const fetchTickets = async ({ pageParam = 2 }) => {
    const response = await fetch(`api/tickets?page=${pageParam}&limit=10`);
    const data = await response.json();
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
    initialPageParam: 2,
    getNextPageParam: (lastPage) => (lastPage ? lastPage.page + 1 : true),
  });

  const handleScroll = useCallback(() => {
    if (
      !isFetching &&
      hasNextPage &&
      loader.current &&
      nearBottomOfPage(loader)
    ) {
      console.log("Fetching next page...");
      fetchNextPage();
    }
  }, [isFetching, hasNextPage, loader, fetchNextPage]);

  const nearBottomOfPage = (loader: React.RefObject<HTMLDivElement>) => {
    const element = loader.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const bottom = rect.bottom;
      return bottom < window.innerHeight + 100;
    }
    return false;
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="relative">
        {data?.pages
          .flatMap((page) => page.tickets)
          .map((ticket) => (
            <TicketComponent
              key={`ticketcard${ticket._id}`}
              ticket={ticket}
            />
          ))}
        {isFetching && <div className="w-full text-center">Cargando...</div>}
        <div
          className="opacity-0 absolute bottom-96"
          ref={loader}
        ></div>
      </div>
    </HydrationBoundary>
  );
};

export default InfiniteScrollTickets;

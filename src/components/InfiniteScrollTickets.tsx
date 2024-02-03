"use client";
import React, { useCallback, useRef, useState } from "react";
import TicketComponent from "./TicketCard";
import {
  HydrationBoundary,
  dehydrate,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

const InfiniteScrollTickets = () => {
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
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

  const nearBottomOfPage = useCallback(
    (loader: React.RefObject<HTMLDivElement>) => {
      if (!hasNextPage) {
        return;
      }
      const element = loader.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const bottom = rect.bottom;
        return bottom < window.innerHeight + 100;
      }
      return false;
    },
    [hasNextPage]
  );

  const handleScroll = useCallback(() => {
    if (
      !isFetching &&
      hasNextPage &&
      loader.current &&
      nearBottomOfPage(loader) &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    isFetching,
    hasNextPage,
    nearBottomOfPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  React.useEffect(() => {
    setIsFetchingNextPage(isFetching);
  }, [isFetching]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="relative md:flex md:flex-wrap md:justify-center">
        {data?.pages
          .flatMap((page) => page.tickets)
          .filter(Boolean)
          .map((ticket, idx) => (
            <TicketComponent
              key={`ticket_card_${ticket._id || idx}_${idx}`}
              ticket={ticket}
            />
          ))}
        {isFetching && hasNextPage && (
          <div className="w-full text-center">Cargando...</div>
        )}
        <div
          className="opacity-0 absolute bottom-96"
          ref={loader}
        ></div>
      </div>
    </HydrationBoundary>
  );
};

export default InfiniteScrollTickets;

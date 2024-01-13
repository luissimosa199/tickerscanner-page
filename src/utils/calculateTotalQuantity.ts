import { Ticket } from "@/types";

export function calculateTotalQuantity(
  ticketItems: Ticket["ticketItems"]
): number {
  const totalQuantity =
    ticketItems.length === 1
      ? 1
      : ticketItems.reduce(
          (total, ticketItem) =>
            total +
            (Number.isInteger(ticketItem.quantity) ? ticketItem.quantity : 1),
          0
        );

  return totalQuantity;
}

import { Ticket } from "@/types";

export function calculateTotalQuantity(
  ticket_items: Ticket["ticket_items"]
): number {
  const totalQuantity =
    ticket_items.length === 1
      ? 1
      : ticket_items.reduce(
          (total, ticket_items) =>
            total +
            (Number.isInteger(ticket_items.quantity)
              ? ticket_items.quantity
              : 1),
          0
        );

  return totalQuantity;
}

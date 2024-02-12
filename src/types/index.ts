interface TicketItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Discount {
  desc_items: { desc_name: string; desc_amount: number }[];
  desc_total: number;
}

export interface Ticket {
  id: string;
  ticket_items: TicketItem[];
  total_amount: number;
  logo_link: string;
  address: string;
  date: string;
  discount: Discount;
  payment_method: string;
  og_ticket_url: string;
  supermarket: "DISCO" | "JUMBO" | "EASY" | "COTO";
  error?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SearchResultItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
  logo_link: string;
  date: string;
  og_ticket_url: string;
  supermarket: string;
  ticketId: string;
}

export interface TicketsRequest {
  tickets: Ticket[];
  total: number;
  page: number;
  limit: number;
  error?: string;
}

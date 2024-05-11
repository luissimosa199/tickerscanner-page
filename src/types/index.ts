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

export enum StatisticId {
  TOTAL_COUNT = "TOTAL_COUNT",
  TOTAL_SPENT = "TOTAL_SPENT",
  TOTAL_SPENT_LAST_YEAR = "TOTAL_SPENT_LAST_YEAR",
  TOTAL_SPENT_LAST_90_DAYS = "TOTAL_SPENT_LAST_90_DAYS",
  TOTAL_SPENT_LAST_30_DAYS = "TOTAL_SPENT_LAST_30_DAYS",
  MOST_FREQUENTLY_BOUGHT_ITEM = "MOST_FREQUENTLY_BOUGHT_ITEM",
  TOTAL_DISCOUNT = "TOTAL_DISCOUNT",
  FIRST_SCAN_DATE = "FIRST_SCAN_DATE",
  MONTHLY_STATISTICS = "MONTHLY_STATISTICS",
}

export interface Statistic {
  name: string;
  id: StatisticId;
  data: any; // 'data' can be of any type
}

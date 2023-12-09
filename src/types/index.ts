interface TicketItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Discount {
  disc_items: { desc_name: string; desc_amount: number }[];
  disc_total: number;
}

export interface Ticket {
  _id: string;
  ticketItems: TicketItem[];
  totalAmount: number;
  logoLink: string;
  address: string;
  date: string;
  discounts: Discount;
  paymentMethod: string;
  ogTicketUrl: string;
  supermarket: "DISCO" | "JUMBO" | "EASY";
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
  logoLink: string;
  date: string;
  ogTicketUrl: string;
  supermarket: string;
  ticketId: string;
}

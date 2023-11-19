interface TicketItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Discount {
  disc_items: any[];
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
  supermarket: "DISCO";
}

export interface LoginFormValues {
  email: string;
  password: string;
}

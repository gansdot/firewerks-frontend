// types/order.ts
export interface Order {
  _id: string;
  userEmail: string;
  userName: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  items: {
    product: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
  updatedAt: string;
  paymentId?: string;
}

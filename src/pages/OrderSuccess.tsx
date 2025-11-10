import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Stack,
} from "@mui/material";
import { fetchApi } from "../api/fetchClient";
import { useCart } from "../context/CartContext";
import OrderProgress from "../components/OrderProgress";
import { useUser } from "../context/UserContext";

interface IOrderItem {
  product: {
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
}

interface IOrder {
  _id: string;
  status: string;
  items: IOrderItem[];
  total: number;
  paymentId?: string;
}

const statusColors: Record<string, string> = {
  pending: "grey",
  paid: "blue",
  shipped: "orange",
  delivered: "green",
};

export default function OrderSuccess() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<IOrder | null>(null);
  const { clearCart } = useCart();
  const { isGuest } = useUser();

  const url = isGuest ? `/orders/guest/${id}` : `/orders/${id}`;

  useEffect(() => {
    async function loadOrder() {
      try {
        const data = await fetchApi(url);

        setOrder(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadOrder();
    clearCart();
  }, [id]);

  if (!order) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            🎉 Order Confirmed!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Transaction ID: {order.paymentId}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Order Total: ₹{order.total}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, mt: 5 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Order Items
          </Typography>
          <Stack spacing={2}>
            {order.items.map((item, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>
                  {(item as any).name} x {item.quantity}
                </Typography>
                <Typography>₹{item.price}</Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Order Status
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mt={1}>
            <Typography color={statusColors[order.status] || "grey"}>
              {order.status.toUpperCase()}
            </Typography>
          </Box>
          <Box mt={2}>
            <OrderProgress status={order.status} />
          </Box>
        </CardContent>
      </Card>

      <Box mt={3} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/orders")}
        >
          View My Orders
        </Button>
      </Box>
    </Box>
  );
}

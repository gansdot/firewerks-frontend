import { Box, Typography, Paper, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchApi } from "../api/fetchClient";

const User = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchApi("/orders/user")
      .then(setOrders)
      .catch(console.error);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>User Account & Orders</Typography>
      {orders.length === 0 ? (
        <Typography>No orders yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {orders.map(order => (
            <Grid >
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Order #{order._id}</Typography>
                <Typography>Status: {order.status}</Typography>
                <Typography>Total: ₹{order.total}</Typography>
                <Typography>Items:</Typography>
                <ul>
                  {order.items.map((item: any) => (
                    <li key={item.productId}>{item.name} x{item.quantity}</li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default User;

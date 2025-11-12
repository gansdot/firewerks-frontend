import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Pagination,
  Stack,
  CircularProgress,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { fetchApi } from "../api/fetchClient";
import { Order } from "../types/Order";
import { useNavigate } from "react-router-dom";
const statuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
const ORDERS_PER_PAGE = 5; // Adjust as needed

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadOrders = async (pageNumber = 1) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchApi(
        `/orders?page=${pageNumber}&limit=${ORDERS_PER_PAGE}`
      );
      console.log("data loaded from admin orders.  ", data);
      // Defensive checks
      if (data && Array.isArray(data.orders)) {
        setOrders(data.orders);
        setTotalPages(data.totalPages || 1);
      } else {
        setOrders([]);
        console.warn("Unexpected API response format", data);
      }

      setPage(pageNumber);
    } catch (err: any) {
      console.error("Error loading orders:", err);
      setError("Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleView = (orderId: string) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    loadOrders(value);
  };
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await fetchApi(`/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: { status: newStatus },
      });
      loadOrders(page);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Stack alignItems="center" mt={6}>
        <CircularProgress />
        <Typography variant="body2" mt={2}>
          Loading orders...
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack alignItems="center" mt={6}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={() => loadOrders(page)}>
          Retry
        </Button>
      </Stack>
    );
  }

  if (orders.length === 0) {
    return (
      <Stack alignItems="center" mt={6}>
        <Typography>No orders found.</Typography>
      </Stack>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        🧨 Admin Panel – Manage Orders
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} hover>
                  <TableCell>
                    {order.paymentId?.slice(-6).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    {order.userName || order.userEmail || "Guest"}
                  </TableCell>
                  <TableCell>${order.total?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell>
                    <Select
                      value={
                        statuses.includes(order.status)
                          ? order.status
                          : "Processing"
                      }
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      size="small"
                    >
                      {statuses.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleView(order._id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} alignItems="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>
      </Paper>
    </Container>
  );
};

export default AdminOrders;

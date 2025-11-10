import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { styled } from "@mui/material/styles";
import { fetchApi } from "../api/fetchClient";
import OrderProgress from "../components/OrderProgress";
import { useUser } from "../context/UserContext";

// 🌈 Glass card style
const GlassCard = styled(Card)(({ theme }) => ({
  backdropFilter: "blur(12px)",
  background: "rgba(255, 255, 255, 0.08)",
  borderRadius: "20px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
  },
}));

const MyOrders: React.FC = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchApi("/orders/myorders"); // backend route for user's orders
        setOrders(data || []);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const toggleExpand = (orderId: string) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  if (!orders.length)
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6" color="white">
          You have no orders yet.
        </Typography>
      </Box>
    );

  return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          mb={4}
          sx={{
            background: "linear-gradient(90deg, #00c6ff, #0072ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          My Orders
        </Typography>

        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid key={order._id}>
              <GlassCard>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        color="rgba(52, 13, 13, 0.7)"
                      >
                        <strong>Order ID:</strong>{" "}
                        {order.paymentId.slice(-6).toUpperCase()}
                      </Typography>
                      <Typography variant="body2" color="rgba(8, 37, 0, 0.7)">
                        Date: {new Date(order.createdAt).toLocaleString()}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="rgba(16, 0, 156, 0.7)"
                        mt={1}
                      >
                        Amount: ₹{order.total?.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0.5,
                          color:
                            order.status === "Delivered"
                              ? "#02a70aff"
                              : order.status === "Processing"
                              ? "#f8d301ff"
                              : "#075595ff",
                        }}
                      >
                        Status: {order.status}
                      </Typography>
                    </Box>

                    <IconButton
                      onClick={() => toggleExpand(order._id)}
                      color="inherit"
                    >
                      {expandedOrder === order._id ? (
                        <ExpandLessIcon sx={{ color: "black" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: "black" }} />
                      )}
                    </IconButton>
                  </Box>

                  <Collapse
                    in={expandedOrder === order._id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Divider
                      sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.2)" }}
                    />

                    {/* Only show OrderProgress if order is not Delivered */}
                    {<OrderProgress status={order.status} />}

                    <Box mt={2}>
                      <Typography
                        variant="subtitle2"
                        color="rgba(21, 20, 20, 0.8)"
                        gutterBottom
                      >
                        Items:
                      </Typography>
                      {order.items?.map((item: any, index: number) => (
                        <Typography
                          key={index}
                          variant="body2"
                          color="rgba(41, 36, 36, 0.7)"
                        >
                          • {item.name} × {item.qty} — ₹{item.price}
                        </Typography>
                      ))}
                    </Box>
                  </Collapse>
                </CardContent>
              </GlassCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MyOrders;

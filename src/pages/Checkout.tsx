import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Box,
  TextField,
  Typography,
  Stack,
  CardMedia,
  Divider,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { fetchApi } from "../api/fetchClient.js";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ShippingForm, { ShippingFormRef } from "../components/ShippingForm.js";
import CartItem from "../components/CartItem.js";
import { display } from "@mui/system";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout: React.FC = () => {
  const { cart, total, clearCart, updateQuantity, removeFromCart } =
    useContext(CartContext);
  const shippingRef = useRef<ShippingFormRef | null>(null);

  const { user } = useUser();
  const isGuest = !user;
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [paidOrder, setPaidOrder] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = total;
  const [isRazorReady, setIsRazorReady] = useState(false);
  const navigate = useNavigate();

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsRazorReady(true);
    script.onerror = () => console.error("Razorpay SDK failed to load");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    console.log("token in checkout ", token);

    if (!token) {
      alert("Please login to proceed to checkout.");
      navigate("/login");
      return;
    }

    if (!shippingRef.current) return;
    const ok = shippingRef.current.validate();
    if (!ok) return; // validation errors show inside ShippingForm
    const shippingData = shippingRef.current.getData();

    try {
      if (!isRazorReady) {
        alert("Razorpay SDK not loaded yet. Please try again in a moment.");
        return;
      }

      setLoading(true);

      const payload = {
        ...{
          user: user,
          email: isGuest ? shippingData.email : user?.email,
          name: isGuest ? "Guest_" + shippingData.phone : user?.name,
          phone: isGuest ? shippingData.phone : user?.name,
          items: cart.map((item) => ({
            product: item.productId, // <-- important for Mongoose populate
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total: totalAmount,
          shippingAddress: isGuest
            ? shippingData.address
            : {
                address: user?.address,
                city: user?.city,
                postalcode: user?.postalcode,
                country: user?.country,
              },
        },
      };

      console.log("checkout payload ", payload);

      const { razorOrder, order } = await fetchApi(
        isGuest ? "/orders/guestcheckout" : "/orders/checkout",
        {
          method: "POST",
          body: payload,
        }
      );
      console.log("checkout page razor pay order ", razorOrder);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorOrder.amount,
        currency: razorOrder.currency,
        name: "CrackerStore",
        description: "Order Payment",
        order_id: razorOrder.id,
        handler: async (response: any) => {
          const result = await fetchApi("/orders/confirm", {
            method: "POST",
            body: {
              orderId: razorOrder.id,
              paymentId: response.razorpay_payment_id,
            },
          });
          setPaidOrder(result.order); // store order in state
          navigate(`/order-success/${result.order._id}`);
          alert("✅ Payment successful!");
        },

        prefill: {},
        theme: { color: "#1976d2" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error: any) {
      alert(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Compute totals
  const { subtotal, discount, shipping } = useMemo(() => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discount = subtotal > 200 ? subtotal * 0.1 : 0; // example: 10% off if over €200
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal - discount + shipping;
    return { subtotal, discount, shipping, total };
  }, [cart]);

  function onPlaceOrder(shipping: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography>{error}</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={6}>
          <Paper
            sx={{
              p: 2,
              height: "80vh",
              overflowY: "auto",
              background: "rgba(255,255,255,0.7)", // subtle glass effect
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography variant="h5" fontWeight={600} mb={2}>
              Your Cart
            </Typography>

            {cart.length === 0 ? (
              <Typography>No items in cart.</Typography>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={(qty) =>
                    updateQuantity(item.productId, qty)
                  }
                  onRemove={() => removeFromCart(item.productId)}
                />
              ))
            )}
            <Box
              sx={{
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={2}>
                Order Summary
              </Typography>

              <Typography>Subtotal: €{subtotal.toFixed(2)}</Typography>
              <Typography color="success.main">
                Discount: -€{discount.toFixed(2)}
              </Typography>
              <Typography>Shipping: €{shipping.toFixed(2)}</Typography>

              <Divider sx={{ my: 1, width: "100%" }} />

              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ color: "primary.main" }}
              >
                Total: €{total.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={6}>
          <Paper
            sx={{
              p: 2,
              height: "80vh",
              overflowY: "auto",
              background: "rgba(255,255,255,0.7)", // subtle glass effect
              backdropFilter: "blur(10px)",
            }}
          >
            {/* ✅ Order Summary - RIGHT ALIGNED */}

            <ShippingForm ref={shippingRef} />
            <Box sx={{ marginTop: 2, textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
                onClick={handleCheckout}
              >
                Proceed to Pay
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;

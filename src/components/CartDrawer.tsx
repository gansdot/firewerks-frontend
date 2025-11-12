import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Add, Remove, Delete, ShoppingCartCheckout } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const BASE_URL = import.meta.env.VITE_BASE;

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  onCheckout,
}) => {
  const { cart, total, removeFromCart, updateQuantity } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: isMobile ? "100%" : 380,
          height: isMobile ? "70vh" : "100%",
          background: "rgba(230, 214, 214, 0.98)",
          backdropFilter: "blur(20px)",
          color: "#000",
          borderLeft: isMobile ? "none" : "1px solid rgba(255,255,255,0.3)",
          borderTop: isMobile ? "1px solid rgba(255,255,255,0.3)" : "none",
          borderTopLeftRadius: isMobile ? "16px" : 0,
          borderTopRightRadius: isMobile ? "16px" : 0,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          🛒 Your Cart
        </Typography>
      </Box>

      {/* Scrollable cart items */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {cart.length === 0 ? (
          <Typography sx={{ textAlign: "center", mt: 4, color: "#444" }}>
            Your cart is empty 😕
          </Typography>
        ) : (
          <List>
            {cart.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ListItem
                  sx={{
                    mb: 2,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.2)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                  secondaryAction={
                    <IconButton
                      onClick={() => removeFromCart(item.productId)}
                      color="error"
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      src={`${BASE_URL}${item.image}`}
                      alt={item.name}
                      sx={{ width: 50, height: 50, borderRadius: 2 }}
                      variant="square"
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="600">
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        ₹{item.price} × {item.quantity}
                      </Typography>
                    }
                  />

                  {/* Quantity Controls */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      background: "rgba(255,255,255,0.3)",
                      borderRadius: 2,
                      px: 1,
                      ml: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography
                      sx={{ px: 1, minWidth: 20, textAlign: "center" }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                </ListItem>
              </motion.div>
            ))}
          </List>
        )}
      </Box>

      {/* Footer: total + checkout */}
      <Box
        sx={{
          p: 3,
          borderTop: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Total
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="inherit">
            ₹{total.toFixed(2)}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ShoppingCartCheckout />}
          onClick={onCheckout}
          disabled={cart.length === 0}
          sx={{
            py: 1.2,
            borderRadius: 3,
            fontWeight: "bold",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.4))",
            color: "#000",
            textTransform: "none",
            "&:hover": {
              background: "rgba(255,255,255,0.6)",
            },
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;

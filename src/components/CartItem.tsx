import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
const BASE_URL = import.meta.env.VITE_BASE;

interface CartItemProps {
  item: {
    productId: string;
    name: string;
    image?: string; // optional product image
    price: number;
    quantity: number;
  };
  onUpdateQuantity: (qty: number) => void;
  onRemove?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) onUpdateQuantity(item.quantity - 1);
  };

  // Default placeholder image
  const placeholderImage =
    "https://via.placeholder.com/80x80.png?text=No+Image";

  return (
    <Card sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 80, height: 80, objectFit: "contain", m: 1 }}
        image={`${BASE_URL}${item.image}`}
        alt={item.name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle1">{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          ${item.price}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <IconButton size="small" onClick={handleDecrement}>
            <Remove />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 1 }}>
            {item.quantity}
          </Typography>
          <IconButton size="small" onClick={handleIncrement}>
            <Add />
          </IconButton>
          {onRemove && (
            <IconButton
              size="small"
              color="error"
              sx={{ marginLeft: "auto" }}
              onClick={onRemove}
            >
              <Delete />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;

import { Box, Typography, Button, Container } from "@mui/material";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <Container sx={{ mt: 5 }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5">Your cart is empty</Typography>
        </Box>
      </Container>
    );
  return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Shopping Cart
        </Typography>
        {cart.map((item, idx) => (
          <CartItem
            key={idx}
            productId={item.productId}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onRemove={removeFromCart}
          />
        ))}

        <Typography variant="h6" sx={{ mt: 2 }}>
          Total: ₹{total}
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/checkout"
          sx={{ mt: 2, mr: 2 }}
        >
          Checkout
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={clearCart}
          sx={{ mt: 2, mr: 2 }}
        >
          Clear Cart
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;

// src/pages/LogoutPage.tsx
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";



export default function Logout() {
  const { logout } = useUser();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  useEffect(() => {
    logout();          // clears token and user from context + localStorage
    navigate("/login"); // redirect to login page
  }, [clearCart, logout, navigate]);

  return null; // no UI needed
}

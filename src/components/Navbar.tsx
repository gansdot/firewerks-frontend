import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Tooltip,
  Badge,
  Grow,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/fireworks.png"; // your logo image
//import logo from "../assets/logo.png"; // your logo image
import CartDrawer from "./CartDrawer";

const pages = [
  { name: "Home", path: "/", key: 1 },
  { name: "Shop", path: "/products", key: 2 },
  { name: "About Us", path: "/about", key: 4 },
  { name: "Contact", path: "/contact", key: 5 },
];

const adminPages = [
  { name: "Manage Products", path: "/admin", key: 31 },
  { name: "Manage Orders", path: "/admin-orders", key: 32 },
  { name: "Manage Queries", path: "/admin-contact", key: 32 },
];

const settings = [
  { name: "Profile", path: "/user/profile", key: 1 },
  { name: "My Orders", path: "/orders", key: 2 },
  { name: "Logout", path: "/logout", key: 3 },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const { user, logout } = useUser();
  const {
    cart,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    drawerOpen,
    setDrawerOpen,
  } = useCart();
  const [cartOpen, setCartOpen] = React.useState(false);

  // menu anchors
  const [adminAnchor, setAdminAnchor] = useState<null | HTMLElement>(null);
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);

  const handleNav = (path: string) => navigate(path);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAdminOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAdminAnchor(event.currentTarget);
  const handleAdminClose = () => setAdminAnchor(null);

  const handleUserOpen = (event: React.MouseEvent<HTMLElement>) =>
    setUserAnchor(event.currentTarget);
  const handleUserClose = () => setUserAnchor(null);

  const handleLogout = () => {
    clearCart();
    logout();
    handleUserClose();
    navigate("/login");
  };

  function handleLogin(): void {
    clearCart();
    logout();
    navigate("/login");
  }

  function handleUserRegister() {
    clearCart();
    logout();
    navigate("/register");
  }
  const handleCheckout = () => {
    setDrawerOpen(false);
    navigate("/checkout"); // or trigger your payment flow
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSearch(false);
      setQuery("");
    }
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
        color: "#000",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* --- Left Section: Logo + Nav Items --- */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 45,
              height: 45,
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => handleNav("/")}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // 👈 makes name & tagline vertical
              alignItems: "flex-start",
              lineHeight: 1,
            }}
          >
            {/* Company Name */}
            <Typography
              variant="h4"
              sx={{
                //fontFamily: '"Are You Serious", cursive',
                fontFamily: `"Dancing Script"`,
                color: "primary.main",
                fontWeight: 600,
                lineHeight: 1,
                mb: 0.3,
              }}
            >
              Firewerks
            </Typography>

            {/* Tagline */}
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: '"Caveat", sans-serif',
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "text.secondary",
                letterSpacing: 1,
              }}
            >
              No Festival without me !!!
            </Typography>
          </Box>
          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 4 }}>
            {pages.map((page) => (
              <Button
                key={page.key}
                onClick={() => handleNav(page.path)}
                sx={{
                  color: "#000",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    background: "rgba(255,255,255,0.35)",
                    borderRadius: "12px",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}

            {/* Admin dropdown (only for admin users) */}
            {user?.isAdmin && (
              <>
                <Button
                  onClick={handleAdminOpen}
                  sx={{
                    color: "#000",
                    fontWeight: 500,
                    textTransform: "none",
                    "&:hover": {
                      background: "rgba(255,255,255,0.35)",
                      borderRadius: "12px",
                    },
                  }}
                >
                  Admin ▼
                </Button>
                <Menu
                  anchorEl={adminAnchor}
                  open={Boolean(adminAnchor)}
                  onClose={handleAdminClose}
                  PaperProps={{
                    sx: {
                      background: "rgba(255, 255, 255, 0.25)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      color: "#000",
                      boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {adminPages.map((item) => (
                    <MenuItem
                      key={item.key}
                      onClick={() => {
                        handleNav(item.path);
                        handleAdminClose();
                      }}
                      sx={{
                        "&:hover": {
                          background: "rgba(255,255,255,0.35)",
                        },
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Box>
        {/* Middle: Search Bar (animated) */}
        <Grow in={showSearch}>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.2)",
              borderRadius: 5,
              px: 2,
              width: { xs: "70%", md: "40%" },
            }}
          >
            <InputBase
              placeholder="Search crackers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                color: "inherit",
                flex: 1,
                background: "rgba(255,255,255,0.2)",
              }}
            />
            <IconButton type="submit" sx={{ color: "inherit" }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Grow>

        {/* --- Right Section: Cart + Profile --- */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="inherit"
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
          <IconButton
            size="large"
            aria-label="cart"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {/** <CartDrawer
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            cartItems={cart}
            total={total}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            onCheckout={handleCheckout}
          />*/}

          <CartDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onCheckout={handleCheckout}
          />
          {user ? (
            <>
              <Tooltip title={`Logged in as ${user.name}`}>
                <IconButton onClick={handleUserOpen}>
                  <Avatar
                    alt={user.name}
                    src={user.avatar || ""}
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#1976d2",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={userAnchor}
                open={Boolean(userAnchor)}
                onClose={handleUserClose}
                PaperProps={{
                  sx: {
                    background: "rgba(255, 255, 255, 0.25)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    color: "#000",
                    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <MenuItem onClick={() => handleNav("/user/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => handleNav("/orders")}>
                  My Orders
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={handleLogin}
                sx={{
                  color: "#000",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": { background: "rgba(255,255,255,0.3)" },
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={handleUserRegister}
                sx={{
                  color: "#000",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": { background: "rgba(255,255,255,0.3)" },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

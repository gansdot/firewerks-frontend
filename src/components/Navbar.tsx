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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import logo from "../assets/fireworks.png";
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
  { name: "Manage Queries", path: "/admin-contact", key: 33 },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const [adminAnchor, setAdminAnchor] = useState<null | HTMLElement>(null);
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

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

  const handleLogin = () => {
    clearCart();
    logout();
    navigate("/login");
  };

  const handleUserRegister = () => {
    clearCart();
    logout();
    navigate("/register");
  };

  const handleCheckout = () => {
    setDrawerOpen(false);
    navigate("/checkout");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSearch(false);
      setQuery("");
    }
  };

  // --- Drawer (for mobile nav) ---
  const drawer = (
    <Box
      sx={{ width: 250, p: 2 }}
      role="presentation"
      onClick={() => setMobileOpen(false)}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Firewerks Menu
      </Typography>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.key} disablePadding>
            <ListItemButton onClick={() => handleNav(page.path)}>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
        {user?.isAdmin && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" sx={{ pl: 2, pb: 0.5 }}>
              Admin
            </Typography>
            {adminPages.map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton onClick={() => handleNav(item.path)}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
        <Divider sx={{ my: 1 }} />
        {user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav("/user/profile")}>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav("/orders")}>
                <ListItemText primary="My Orders" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogin}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleUserRegister}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

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
        {/* --- Left Section: Logo + Hamburger --- */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Hamburger for mobile */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo + Title */}
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 45,
              height: 45,
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => handleNav("/")}
          />
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: `"Dancing Script"`,
                color: "primary.main",
                fontWeight: 600,
                lineHeight: 1,
                mb: 0.3,
              }}
            >
              Firewerks
            </Typography>
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

          {/* Desktop Nav Buttons */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
              ml: 4,
            }}
          >
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
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Box>

        {/* --- Middle: Search Bar --- */}
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
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
              <Button color="inherit" onClick={handleUserRegister}>
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>

      {/* Drawer for Mobile Menu */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

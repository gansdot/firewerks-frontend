import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { glassTheme } from "./theme";
import "./index.css"; // ✅ must be imported here
const theme = createTheme({
  palette: {
    primary: { main: "#5c6bc0" },
    secondary: { main: "#9bc0ff" },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={glassTheme}>
      <CssBaseline />
      <UserProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);

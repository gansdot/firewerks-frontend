import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Container sx={{ mt: 5 }}>
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 ❌ Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back home</Link>
    </div>
    </Container>
  );
};

export default NotFound;

// src/components/Footer.tsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        borderTop: "1px solid rgba(255,255,255,0.18)",
        padding: "1rem",
        textAlign: "center",
        mt: 4,
        color: "text.primary",
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          © {new Date().getFullYear()} Crackers E-Shop 🎆
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Designed with ❤️ using React + Material UI
        </Typography>
      </Box>
    </Paper>
  );
};

export default Footer;

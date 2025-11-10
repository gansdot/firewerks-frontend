import React from "react";
import { Box, SxProps } from "@mui/material";
import logo from "../assets/fireworks.png"; // Your logo image

interface LogoProps {
  sx?: SxProps; // 👈 Accept the sx prop
  size?: number; // Optional size prop for easy scaling
}

const Logo: React.FC<LogoProps> = ({ sx = {}, size = 40 }) => {
  return (
    <Box
      component="img"
      src={logo}
      alt="App Logo"
      sx={{
        height: size,
        width: size,
        cursor: "pointer",
        objectFit: "contain",
        ...sx, // 👈 Merge with parent-provided styles
      }}
    />
  );
};

export default Logo;

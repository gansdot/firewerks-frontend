import React, { useEffect } from "react";
import { Box, Typography, Chip, useMediaQuery, useTheme } from "@mui/material";
import { calculateDiscountedPrice } from "../api/fetchClient";

interface DiscountDisplayProps {
  price: number;
  discount: number; // percentage or flat value
  isPercentage?: boolean;
  currency?: string;
  onPriceChange?: (discountedPrice: number) => void; // <-- new callback
}
const DiscountDisplay: React.FC<DiscountDisplayProps> = ({
  price,
  discount,
  isPercentage = true,
  currency = "₹",
  onPriceChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const discountedPrice = calculateDiscountedPrice(
    price,
    discount,
    isPercentage
  );

  const discountPercent = isPercentage
    ? discount
    : Math.round((discount / price) * 100);

  const amountSaved = Math.max(0, price - discountedPrice);

  const message =
    discount === 0
      ? "No discount applied here"
      : "₹" + amountSaved + " discount – offer already applied, no code needed";

  useEffect(() => {
    if (typeof onPriceChange === "function") {
      onPriceChange(discountedPrice);
    }
  }, [onPriceChange, discountedPrice]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
      }}
    >
      {/* Discount Message Bar */}
      {message && (
        <Box
          sx={{
            backgroundColor: "#b71c1c",
            color: "white",
            px: isMobile ? 1.5 : 2,
            py: isMobile ? 0.5 : 0.8,
            borderRadius: "6px",
            fontWeight: 600,
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            textAlign: "center",
            width: "fit-content",
          }}
        >
          {message}
        </Box>
      )}

      {/* Price Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 0.5 : 1,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="text.primary"
          sx={{
            fontSize: isMobile ? "1.4rem" : "1.8rem",
            lineHeight: 1.2,
          }}
        >
          {currency} {discountedPrice.toFixed(2)}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            textDecoration: "line-through",
            fontSize: isMobile ? "0.9rem" : "1rem",
          }}
        >
          {currency} {price.toFixed(2)}
        </Typography>

        <Chip
          label={`-${discountPercent}%`}
          size={isMobile ? "small" : "medium"}
          sx={{
            backgroundColor: "#e53935",
            color: "white",
            fontWeight: 600,
            fontSize: isMobile ? "0.7rem" : "0.85rem",
          }}
        />
      </Box>

      {/* Savings Line */}
      <Typography
        variant="body2"
        color="success.main"
        sx={{
          fontWeight: 500,
          fontSize: isMobile ? "0.8rem" : "0.9rem",
        }}
      >
        You save {currency} {amountSaved.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default DiscountDisplay;

import React, { useState } from "react";
import {
  Box,
  Popover,
  Rating,
  Typography,
  LinearProgress,
} from "@mui/material";

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  breakdown: Record<number, number>;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  averageRating,
  totalReviews,
  breakdown,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <Box
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      sx={{ display: "inline-block" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Rating value={averageRating} precision={0.1} readOnly />
        <Typography variant="body2">({totalReviews})</Typography>
      </Box>

      <Popover
        id="rating-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableRestoreFocus
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box sx={{ p: 2, width: 220 }}>
          <Typography variant="subtitle1" gutterBottom>
            Rating Breakdown
          </Typography>
          {Object.keys(breakdown)
            .reverse()
            .map((star) => (
              <Box
                key={star}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Typography sx={{ width: 40 }}>{star}★</Typography>
                <LinearProgress
                  variant="determinate"
                  value={(breakdown[+star] / totalReviews) * 100 || 0}
                  sx={{ flex: 1, mx: 1 }}
                />
                <Typography variant="body2">{breakdown[+star]}</Typography>
              </Box>
            ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default ReviewSummary;

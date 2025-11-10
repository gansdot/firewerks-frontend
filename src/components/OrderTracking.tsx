// src/components/OrderTracking.tsx
import React, { JSX } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Paper, Typography } from "@mui/material";

interface OrderTrackingProps {
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | string;
  orderId?: string;
}

const steps = ["Pending", "Processing", "Shipped", "Delivered"];

const icons: Record<string, JSX.Element> = {
  Pending: <InventoryIcon color="disabled" />,
  Processing: <CheckCircleIcon color="info" />,
  Shipped: <LocalShippingIcon color="primary" />,
  Delivered: <DoneAllIcon color="success" />,
};

const OrderTracking: React.FC<OrderTrackingProps> = ({ status, orderId }) => {
  const activeStep = steps.indexOf(status);

  return (
    <Paper
      elevation={6}
      sx={{
        p: 3,
        mt: 4,
        borderRadius: 4,
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(15px)",
        color: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 2 }}>
        Order Tracking
      </Typography>

      {orderId && (
        <Typography align="center" sx={{ mb: 3 }}>
          Order ID: <b>{orderId}</b>
        </Typography>
      )}

      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6">
          {status === "Delivered"
            ? "Your order has been successfully delivered! 🎉"
            : `Current status: ${status}`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default OrderTracking;

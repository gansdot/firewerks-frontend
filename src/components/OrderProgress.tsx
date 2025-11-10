import React from "react";
import { Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

// Define order stages
const steps = ["Placed", "Processing", "Shipped", "Delivered"];

// ✅ Custom Connector (clean, minimal)
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 1,
  },
}));

// ✅ Custom Step Icon — rounded + no color
const CustomStepIconRoot = styled("div")<{ active?: boolean; completed?: boolean }>(
  ({ theme, active, completed }) => ({
    backgroundColor: active || completed ? "rgba(255,255,255,0.1)" : "transparent",
    border: "2px solid rgba(255,255,255,0.3)",
    color: "#fff",
    zIndex: 1,
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",
  })
);

function CustomStepIcon(props: any) {
  const { active, completed, className } = props;
  return (
    <CustomStepIconRoot active={active} completed={completed} className={className}>
      {completed ? (
        <CheckCircleOutlineIcon sx={{ fontSize: 20, color: "rgba(28, 26, 26, 0.8)" }} />
      ) : (
        <RadioButtonUncheckedIcon sx={{ fontSize: 20, color: "rgba(61, 59, 59, 0.6)" }} />
      )}
    </CustomStepIconRoot>
  );
}

// ✅ Main Component
const OrderProgress: React.FC<{ status: string }> = ({ status }) => {
  const activeStep = steps.findIndex((s) => s.toLowerCase() === status.toLowerCase());

  return (
    <div
      style={{
        padding: "1rem 2rem",
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<CustomConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              <span style={{ color: "rgba(53, 6, 6, 0.8)", fontSize: "0.9rem" }}>{label}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderProgress;

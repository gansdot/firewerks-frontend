import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

import {
  Box,
  TextField,
  Typography,
  Divider,
  MenuItem,
  Container,
  Select,
} from "@mui/material";
import {
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";

export interface ShippingFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalcode: string;
  country: string;
}

export interface ShippingFormRef {
  validate: () => boolean;
  getData: () => ShippingFormData;
}
interface ShippingFormProps {}

const countries = [
  "United States",
  "United Kingdom",
  "India",
  "Germany",
  "France",
  "Australia",
];

const ShippingFormInner: ForwardRefRenderFunction<
  ShippingFormRef,
  ShippingFormProps
> = (_props, ref) => {
  const { user } = useUser();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<ShippingFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
  });

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        postalcode: user.postalcode || "",
        country: user.country || "",
      });
    }
  }, [user]);
  /*
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
*/
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error as user types
  };
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postalcode) newErrors.postalcode = "Postal Code is required";
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validate,
    getData: () => formData,
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Full Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
      />
      <TextField
        label="Email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />
      <TextField
        label="Phone"
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        error={!!errors.phone}
        helperText={errors.phone}
        fullWidth
      />
      <TextField
        label="Address"
        value={formData.address}
        onChange={(e) => handleChange("address", e.target.value)}
        error={!!errors.address}
        helperText={errors.address}
        fullWidth
      />
      <TextField
        label="City"
        value={formData.city}
        onChange={(e) => handleChange("city", e.target.value)}
        error={!!errors.city}
        helperText={errors.city}
        fullWidth
      />
      <TextField
        label="Postal Code"
        value={formData.postalcode}
        onChange={(e) => handleChange("postalcode", e.target.value)}
        error={!!errors.postalcode}
        helperText={errors.postalcode}
        fullWidth
      />
      <TextField
        label="Country"
        value={formData.country}
        onChange={(e) => handleChange("country", e.target.value)}
        error={!!errors.country}
        helperText={errors.country}
        fullWidth
      >
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </TextField>
    </Box>
  );
};

const ShippingForm = forwardRef(ShippingFormInner);

// ✅ Export this, not the inner function!
export default ShippingForm;

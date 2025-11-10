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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Email"
        name="email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Phone Number"
        name="phone"
        id="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Address"
        name="address"
        id="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="City"
        name="city"
        id="city"
        value={formData.city}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Postal Code"
        name="postalcode"
        id="postalcode"
        value={formData.postalcode}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Country"
        name="country"
        select
        SelectProps={{ native: true }}
        value={formData.country}
        onChange={handleChange}
        fullWidth
        required
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

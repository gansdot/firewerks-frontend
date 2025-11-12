import React, { useState } from "react";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../api/fetchClient";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  postalcode: string;
  country: string;
  phone: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.password) newErrors.password = true;
    if (!formData.phone) newErrors.phone = true;
    if (!formData.address) newErrors.address = true;
    if (!formData.city) newErrors.city = true;
    if (!formData.postalcode) newErrors.postalcode = true;
    if (!formData.country) newErrors.country = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetchApi("/users/register", {
        method: "POST",
        body: formData,
      });

      console.log("User registered:", response);
      navigate("/login");
    } catch (err: any) {
      setErrorMsg(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 3,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
      }}
    >
      <Typography variant="h5" mb={2}>
        Register your account
      </Typography>

      <form onSubmit={handleSubmit}>
        {[
          { label: "Name", name: "name" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Phone", name: "phone" },
          { label: "Address", name: "address" },
          { label: "City", name: "city" },
          { label: "Postal Code", name: "postalcode" },
          { label: "Country", name: "country" },
        ].map((field) => (
          <TextField
            key={field.name}
            fullWidth
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors[field.name] ? "red" : "rgba(0,0,0,0.4)",
                },
                "&:hover fieldset": {
                  borderColor: errors[field.name]
                    ? "red"
                    : "rgba(255,255,255,0.6)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors[field.name] ? "red" : "primary.main",
                },
              },
            }}
          />
        ))}

        {errorMsg && (
          <Typography color="error" mt={1}>
            {errorMsg}
          </Typography>
        )}

        {/* Register Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        {/* Second Row: Login & Home */}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;

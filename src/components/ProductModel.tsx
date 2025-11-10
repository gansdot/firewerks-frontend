import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { fetchApi } from "../api/fetchClient";
const BASE_URL = import.meta.env.VITE_BASE;
const BASE_API_URL = import.meta.env.VITE_API_BASE;

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product?: any;
  onSave: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  product,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        image: product.image || "",
      });
      setPreview(product.image ? `${BASE_URL}${product.image}` : null);
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      setPreview(null);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!file) return formData.image;
    const formDataImg = new FormData();
    formDataImg.append("image", file);

    const res = await fetch(`${BASE_API_URL}/upload`, {
      method: "POST",
      body: formDataImg,
    });
    const data = await res.json();
    return data.imageUrl;
  };

  const handleSubmit = async () => {
    try {
      const imageUrl = await uploadImage();
      console.log("image url ********* ", imageUrl);
      const payload = { ...formData, image: imageUrl };

      if (product?._id) {
        await fetchApi(`/products/${product._id}`, {
          method: "PUT",
          body: payload,
        });
      } else {
        await fetchApi("/products", {
          method: "POST",
          body: payload,
        });
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Product save error:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
          />

          <Box>
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>

            {preview && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Image Preview
                </Typography>
                <Box
                  component="img"
                  src={preview}
                  alt="Preview"
                  sx={{
                    height: 150,
                    borderRadius: 2,
                    objectFit: "cover",
                    border: "1px solid #ccc",
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {product ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;

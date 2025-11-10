import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Stack,
  MenuItem,
} from "@mui/material";
import AddCategoryModal from "../components/AddCategoryModal";
import { truncateWords, fetchApi } from "../api/fetchClient";

const Admin: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: 0,
    discount: 0,
  });

  const loadProducts = async () => {
    const data = await fetchApi("/products");
    setProducts(data);
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
    loadProducts();
  }, [open]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();

    console.log("uploaded file path ::::: ", file);
    formData.append("image", file);

    const res = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setForm({ ...form, image: data.filePath });
  };

  const handleSave = async () => {
    if (editingProduct) {
      await fetchApi(`/products/${editingProduct._id}`, {
        method: "PUT",
        body: {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          image: form.image,
          category: form.category,
          stock: form.stock,
          discount: form.discount,
        },
      });
    } else {
      await fetchApi("/products", {
        method: "POST",
        body: {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          image: form.image,
          category: form.category,
          stock: form.stock,
          discount: form.discount,
        },
      });
    }
    setOpen(false);
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    await fetchApi(`/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setForm(product);
    setOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      stock: 0,
      discount: 0,
    });
    setOpen(true);
  };
  const refreshCategories = () => {
    // Call your existing method to reload categories list
  };
  const fetchCategories = async () => {
    try {
      const data = await fetchApi("/categories");
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        🧨 Admin Panel – Manage Products
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3, mt: 2 }}
          onClick={handleAddNew}
        >
          + Add New Product
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3, mt: 2 }}
          onClick={() => setOpenCategoryModal(true)}
        >
          + Add New Category
        </Button>
      </Stack>
      <Grid container spacing={2} sx={{ p: 3 }}>
        {products.map((p) => (
          <Grid key={p._id}>
            <Card
              sx={{
                width: 280,
                height: 400,
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 42px rgba(31, 38, 135, 0.45)",
                },
              }}
            >
              {/* Product Image */}
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:8000${p.image}`}
                alt={p.name}
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              />

              {/* Card Content */}
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ color: "#5e5a5aff", fontWeight: "bold" }}
                >
                  {p.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#5e5a5aff", mb: 1, WebkitLineClamp: 1 }}
                >
                  {truncateWords(p.description, 3)}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#5e5a5aff", fontWeight: 500 }}
                >
                  ₹{p.price} : (+{p.stock}) :{p.discount}%
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <TextField
            label="Stock"
            type="number"
            fullWidth
            margin="normal"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: Number(e.target.value) })
            }
          />
          <TextField
            label="Discount(%)"
            type="number"
            fullWidth
            margin="normal"
            value={form.discount}
            onChange={(e) =>
              setForm({ ...form, discount: Number(e.target.value) })
            }
          />
          {/* ✅ Category Dropdown */}
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            fullWidth
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>

          {form.image && (
            <img
              src={`http://localhost:8000${form.image}`}
              alt="preview"
              style={{
                width: "100%",
                height: "200px",
                marginTop: "10px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <AddCategoryModal
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        onCategoryAdded={refreshCategories}
      />
    </Container>
  );
};

export default Admin;

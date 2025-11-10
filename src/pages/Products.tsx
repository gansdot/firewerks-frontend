import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Container,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

import { truncateWords, fetchApi } from "../api/fetchClient";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  productId?: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  category: string;
  image?: string;
  stock: number;
  discount: number;
}

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean; // for admin reuse
  onAdd?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchApi("/products")
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={2} sx={{ p: 3 }}>
        {products.map((product) => (
          <Card
            key={product._id}
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
            <Link
              to={`/products/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:8000${product.image}`}
                alt={product.name}
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
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#5e5a5aff", mb: 1, WebkitLineClamp: 1 }}
                >
                  {truncateWords(product.description, 3)}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#5e5a5aff", fontWeight: 500 }}
                >
                  ₹{product.price}
                </Typography>
              </CardContent>
            </Link>
            {/* Action Button */}

            <Box sx={{ p: 2 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() =>
                  addToCart({
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.image,
                  })
                }
              >
                Add to Cart
              </Button>
            </Box>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
    discount?: number;
    description?: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleNavigate = () => {
    navigate(`/products/${product._id}`);
  };

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
        background: "rgba(255,255,255,0.9)",
      }}
    >
      {/* Product Image */}
      <Box
        sx={{ cursor: "pointer", overflow: "hidden" }}
        onClick={handleNavigate}
      >
        <CardMedia
          component="img"
          image={`http://localhost:8000${product.image}`}
          alt={product.name}
          sx={{
            height: 200,
            width: "100%",
            objectFit: "cover",
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
      </Box>

      {/* Product Details */}
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          noWrap
          sx={{ cursor: "pointer" }}
          onClick={handleNavigate}
        >
          {product.name}
        </Typography>

        {/* Price Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mt: 1,
          }}
        >
          {product.discount ? (
            <>
              <Typography variant="body1" color="error" fontWeight={700}>
                ₹{discountedPrice.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ₹{product.price.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="success.main">
                ({product.discount}% OFF)
              </Typography>
            </>
          ) : (
            <Typography variant="body1" fontWeight={700}>
              ₹{product.price.toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Add to Cart Button */}
      <CardActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={() =>
            addToCart({
              productId: product._id,
              name: product.name,
              price: product.price,
              quantity: 1,
              image: product.image,
            })
          }
          sx={{
            borderRadius: 3,
            textTransform: "none",
            background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
            color: "#000",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(135deg, #fad0c4 0%, #ff9a9e 100%)",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

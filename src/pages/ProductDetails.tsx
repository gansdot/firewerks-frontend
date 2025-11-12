import {
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  Divider,
  IconButton,
  Card,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { fetchApi } from "../api/fetchClient";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import RelatedProductsCarousel from "../components/RelatedProductsCarousel";
import DiscountDisplay from "../components/DiscountDisplay";
import ReviewSummary from "../components/ReviewSummary";
import ReviewModal from "../components/ReviewModal";
import { useUser } from "../context/UserContext";
import { Snackbar, Alert } from "@mui/material";
const BASE_URL = import.meta.env.VITE_BASE;

const ProductDetails = () => {
  const { id } = useParams();
  const { user, token } = useUser();

  const { addToCart } = useCart();
  const [related, setRelated] = useState<any[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [openReview, setOpenReview] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewSummary, setReviewSummary] = useState({
    averageRating: 0,
    totalReviews: 0,
    breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });

  const handleWriteReview = () => {
    if (!token || !user) {
      setShowLoginAlert(true);
      return;
    }
    setOpenReview(true);
  };
  // Fetch product details
  const fetchProduct = async () => {
    try {
      const data = await fetchApi(`/products/${id}`, { method: "GET" });
      setProduct(data);

      const relatedData = await fetchApi(`/products/category/${data.category}`);

      const filtered = relatedData.filter((p: any) => p._id !== data._id);
      setRelated(filtered);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewSummary = async (id: string) => {
    try {
      const data = await fetchApi(`/reviews/summary/${id}`);

      setReviewSummary(data);
    } catch (err) {
      console.error("Error fetching review summary:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [finalPrice, product?._id]);

  useEffect(() => {
    if (product?._id) fetchReviewSummary(product._id);
  }, [product]);

  const fetchReviews = async (_id: any) => {
    try {
      const response = await fetchApi(
        `/reviews/${product._id}`,

        { method: "GET" }
      );

      if (response && response.reviews) {
        setReviews(response.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewAdded = async (rating: number, comment: string) => {
    try {
      // Re-fetch updated reviews or summary
      await fetchReviewSummary(product._id);
      await fetchReviews(product._id);
    } catch (err) {
      console.error("Error refreshing after review:", err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        Product not found.
      </Typography>
    );
  }

  const handleClose = () => {
    // Blur any focused element to remove the warning
    /**if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setOpenReview(false);*/
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "1400px", mx: "auto" }}>
      <Grid container spacing={4}>
        {/* LEFT SIDE - Image Gallery */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Grid container spacing={2}>
            {/* Thumbnails */}
            <Grid size={{ xs: 2 }}>
              <Card sx={{ mb: 1, cursor: "pointer" }}>
                <CardMedia
                  component="img"
                  image={`${BASE_URL}${product.image}`}
                  alt="thumb"
                />
              </Card>
            </Grid>

            {/* Main Image */}
            <Grid size={{ xs: 10 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                }}
              >
                <Zoom>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    image={`${BASE_URL}${product.image}`}
                    sx={{
                      width: "100%",
                      objectFit: "contain",
                      maxHeight: { xs: 350, md: 550 },
                    }}
                  />
                </Zoom>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* RIGHT SIDE - Product Info */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="h5" fontWeight={600}>
            {product.name}
          </Typography>
          <DiscountDisplay
            price={product.price}
            discount={product.discount}
            isPercentage
            currency="₹"
            onPriceChange={(discounted) => {
              setFinalPrice(discounted);
            }}
          />

          <Box
            display="flex"
            alignItems="center"
            gap={2}
            mt={2}
            flexWrap="wrap"
          >
            <ReviewSummary {...reviewSummary} />
            <Button variant="outlined" onClick={handleWriteReview}>
              Write a Review
            </Button>
          </Box>

          <ReviewModal
            open={openReview}
            onClose={() => setOpenReview(false)}
            product={product}
            onReviewAdded={handleReviewAdded}
          />

          {/* Snackbar Alert for Guests */}
          <Snackbar
            open={showLoginAlert}
            autoHideDuration={4000}
            onClose={() => setShowLoginAlert(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              severity="warning"
              onClose={() => setShowLoginAlert(false)}
              sx={{ width: "100%" }}
            >
              Please log in to write a review.
            </Alert>
          </Snackbar>

          <Divider sx={{ my: 2 }} />

          {/* Color Swatches */}
          {product.colors && (
            <>
              <Typography variant="subtitle1" fontWeight={600}>
                Color
              </Typography>
              <Box sx={{ display: "flex", gap: 1, my: 1 }}>
                {product.colors.map((color: string) => (
                  <IconButton
                    key={color}
                    sx={{
                      width: 32,
                      height: 32,
                      border: "1px solid #ccc",
                      bgcolor: color,
                    }}
                  />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              background: "linear-gradient(90deg, #63769bff, #6b8fcdff)",
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: "12px",
              fontWeight: 600,
            }}
            onClick={() =>
              addToCart({
                productId: product._id,
                name: product.name,
                price: finalPrice,
                quantity: 1,
                image: product.image,
              })
            }
          >
            Add to Cart
          </Button>

          <Divider sx={{ my: 3 }} />

          {/* Accordion sections */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Product Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                {product.description ||
                  "No additional details provided for this product."}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How to fire safely</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                {product.sizeInfo || "Standard fit available."}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Delivery & Returns</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                {product.deliveryInfo ||
                  "Free returns within 5 days. Fast delivery available."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 5 }} />

      {/* Related Products */}
      {related && related.length > 0 ? (
        <RelatedProductsCarousel products={related} />
      ) : (
        <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
          No related products found.
        </Typography>
      )}
    </Box>
  );
};

export default ProductDetails;

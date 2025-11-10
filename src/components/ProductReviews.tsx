// src/components/ProductReviews.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { fetchApi } from "../api/fetchClient";
import { useUser } from "../context/UserContext"; // your auth context

interface Review {
  _id: string;
  user: { _id: string; name: string };
  rating: number;
  comment: string;
  createdAt: string;
}

interface Props {
  productId: string;
}

const ProductReviews: React.FC<Props> = ({ productId }) => {
  const { user } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Load reviews
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchApi(`/reviews/${productId}`);
        setReviews(data || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    if (productId) load();
  }, [productId]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  const handleSubmit = async () => {
    if (!rating || !comment.trim())
      return alert("Please add rating & comment.");
    try {
      console.log("comment ", comment);
      console.log("rating ", rating);
      await fetchApi("/reviews", {
        method: "POST",
        body: {
          user: { ...user, name: user?.name },
          productId,
          rating,
          comment,
        },
      });
      setComment("");
      setRating(0);
      const updated = await fetchApi(`/reviews/${productId}`);
      setReviews(updated);
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Ratings & Reviews
      </Typography>

      {/* Average rating */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Rating value={averageRating} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary">
          ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {loading ? (
        <CircularProgress size={30} />
      ) : (
        <>
          {/* Review list */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {reviews.length === 0 ? (
              <Typography color="text.secondary">
                No reviews yet. Be the first to review this product.
              </Typography>
            ) : (
              reviews.map((r) => (
                <Box
                  key={r._id}
                  sx={{
                    background: "rgba(255,255,255,0.08)",
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography fontWeight={600}>
                      {r.user?.name || "User"}
                    </Typography>
                    <Rating value={r.rating} size="small" readOnly />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {r.comment}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              ))
            )}
          </Box>

          {/* Add review form */}
          {user ? (
            <Box
              sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Write a review
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newVal) => setRating(newVal)}
                precision={1}
              />
              <TextField
                multiline
                minRows={3}
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button variant="contained" onClick={handleSubmit}>
                Submit Review
              </Button>
            </Box>
          ) : (
            <Typography sx={{ mt: 2 }}>
              Please log in to write a review.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductReviews;

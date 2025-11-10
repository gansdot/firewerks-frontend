import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Rating, Divider } from "@mui/material";
import { fetchApi } from "../api/fetchClient";

export default function ProductReviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await fetchApi(`/reviews/product/${id}`);
      setReviews(data);
    };
    loadReviews();
  }, [id]);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Customer Reviews
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {reviews.map((r: any) => (
        <Box key={r._id} sx={{ mb: 3 }}>
          <Rating value={r.rating} readOnly />
          <Typography variant="subtitle2">
            {r.user?.name || "Anonymous"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {r.comment}
          </Typography>
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}
    </Box>
  );
}

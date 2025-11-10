import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
  Typography,
} from "@mui/material";
import { fetchApi } from "../api/fetchClient";
import { useUser } from "../context/UserContext";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  product: any;
  onReviewAdded: (rating: number, comment: string) => Promise<void> | void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  onClose,
  product,
  onReviewAdded,
}) => {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUser();

  const handleSubmit = async () => {
    if (!rating) {
      setError("Please provide a rating");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await fetchApi(`/reviews`, {
        method: "POST",
        body: { user: user, product, rating, comment },
      });

      if (rating && comment.trim()) {
        onReviewAdded(rating, comment);
        setRating(null);
        setComment("");
        handleClose(); // Use our custom close handler
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    // ✅ Ensure focus is removed before closing to prevent accessibility warning
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableEnforceFocus // ✅ prevents aria-hidden focus issues
      aria-labelledby="review-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Write a Review</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Typography component="legend">Your Rating</Typography>
          <Rating
            name="user-rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            size="large"
          />
          <TextField
            label="Your Comment"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
          />
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewModal;

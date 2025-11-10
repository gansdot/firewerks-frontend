import { useRef } from "react";
import { Box, Card, CardMedia, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE;

interface RelatedProductsCarouselProps {
  products: any[];
}

const RelatedProductsCarousel: React.FC<RelatedProductsCarouselProps> = ({
  products = [],
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // 80% of visible width per scroll
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ position: "relative", mt: 8 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Related Products
      </Typography>

      {/* Scroll Buttons */}
      <IconButton
        onClick={() => scroll("left")}
        sx={{
          position: "absolute",
          top: "50%",
          left: -20,
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.8)",
          boxShadow: 1,
          "&:hover": { background: "rgba(255,255,255,1)" },
          zIndex: 10,
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={() => scroll("right")}
        sx={{
          position: "absolute",
          top: "50%",
          right: -20,
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.8)",
          boxShadow: 1,
          "&:hover": { background: "rgba(255,255,255,1)" },
          zIndex: 10,
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* Scrollable Container */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: 2,
          pb: 2,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {products?.map((item: any) => (
          <Card
            key={item._id}
            sx={{
              minWidth: 220,
              maxWidth: 220,
              flex: "0 0 auto",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              },
            }}
            onClick={() => navigate(`/products/${item._id}`)}
          >
            <CardMedia
              component="img"
              height="200"
              image={`${BASE_URL}${item.image}`}
              alt={item.name}
              sx={{ objectFit: "contain", p: 1 }}
            />
            <Box sx={{ p: 2 }}>
              <Typography
                variant="body1"
                fontWeight={500}
                noWrap
                title={item.name}
              >
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                €{item.price.toFixed(2)}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RelatedProductsCarousel;

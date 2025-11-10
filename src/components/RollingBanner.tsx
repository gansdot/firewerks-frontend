import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
const BASE_URL = import.meta.env.VITE_BASE;
//image={`${BASE_URL}${p.image}`}

const bannerImages = [
  {
    url: `${BASE_URL}/uploads/1761749636977-845724340.png`,
    title: "Celebrate this Diwali with Joy",
    subtitle: "Premium Crackers at Festive Discounts",
  },
  {
    url: `${BASE_URL}/uploads/1761749644566-549893783.png`,
    title: "Eco-Friendly Crackers",
    subtitle: "Safety, Fun, and Environment Together",
  },
  {
    url: `${BASE_URL}/uploads/1761750296703-321287277.png`,
    title: "Mega Offers on Combo Packs",
    subtitle: "Bulk Discounts for Families and Events",
  },
];

const RollingBanner: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: "0",
      }}
    >
      <Slider {...settings}>
        {bannerImages.map((banner, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              height: { xs: 300, md: 500 },
              backgroundImage: `url(${banner.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 0,
            }}
          >
            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.1))",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                p: { xs: 3, md: 8 },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 1,
                  textShadow: "0px 2px 10px rgba(0,0,0,0.4)",
                }}
              >
                {banner.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#f0f0f0",
                  fontWeight: 400,
                  textShadow: "0px 1px 5px rgba(0,0,0,0.3)",
                }}
              >
                {banner.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default RollingBanner;

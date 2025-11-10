import { Box, Container, Typography, Divider } from "@mui/material";

export default function About() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Page Title */}
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "primary.main",
          mb: 3,
          fontFamily: `"Happy Monkey", "Helvetica", "Arial", sans-serif`,
        }}
      >
        About Firewerks
      </Typography>

      <Divider
        sx={{ width: "60px", mx: "auto", mb: 4, borderColor: "primary.main" }}
      />

      {/* Introduction */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.1rem",
          color: "text.primary",
          lineHeight: 1.8,
          mb: 4,
        }}
      >
        Established in the vibrant 1980s, <strong>Firewerks</strong> was born
        from a vision of excellence and dedication. Founded by{" "}
        <strong>Mr. Ganesan Mariappan</strong> with blessing by{" "}
        <strong>Mr. Mariappan Perumal, Ms. Ayyammal Mariappan</strong>, the
        company began as a small-scale fireworks manufacturing unit driven by
        passion, integrity, and craftsmanship.
      </Typography>

      {/* Legacy */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.1rem",
          color: "text.primary",
          lineHeight: 1.8,
          mb: 4,
        }}
      >
        Over the past five decades, Firewerks has evolved into a name synonymous
        with <strong>trust, quality, and innovation</strong>. Through relentless
        hard work, the Mariappan family has transformed their humble beginnings
        into a legacy of excellence that lights up celebrations across
        generations.
      </Typography>

      {/* Philosophy */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.1rem",
          color: "text.primary",
          lineHeight: 1.8,
          mb: 4,
        }}
      >
        What sets Firewerks apart is its unwavering commitment to{" "}
        <strong>honesty, safety, and sustainable growth</strong>. Each product
        reflects years of expertise and dedication to delivering joy and
        sparkle, while maintaining the highest standards of quality and
        responsibility.
      </Typography>

      {/* Closing */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.1rem",
          color: "text.primary",
          lineHeight: 1.8,
          textAlign: "center",
          mt: 5,
          fontStyle: "italic",
        }}
      >
        “From a spark of passion to a fire of success — Firewerks continues to
        shine bright, built on 50 years of integrity and innovation.”
      </Typography>
    </Container>
  );
}

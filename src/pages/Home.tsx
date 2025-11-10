import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import RollingBanner from "../components/RollingBanner";

const Home = () => {
  return (
    <>
      <Container sx={{ mt: 5 }}>
        <RollingBanner />

        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Cracker Shop 🧨
          </Typography>
          <Typography variant="body1" gutterBottom>
            Browse and order your favorite crackers online. Fast delivery
            guaranteed!
          </Typography>

          {/* Advertisement Section */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid>
              <Paper sx={{ p: 2 }}>🔥 Special Offers!</Paper>
            </Grid>
            <Grid>
              <Paper sx={{ p: 2 }}>🎉 Best Sellers!</Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Container,
} from "@mui/material";
import { fetchApi } from "../api/fetchClient";
import ProductCard from "../components/ProductCard";

export default function SearchResults() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q") || "";

  useEffect(() => {
    const loadResults = async () => {
      setLoading(true);
      try {
        const data = await fetchApi(`/products/search?search=${query}`);
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (query) loadResults();
  }, [query]);

  return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Search results for "{query}"
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : results.length ? (
          <Grid container spacing={2}>
            {results.map((product) => (
              <Grid size={12} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No products found.</Typography>
        )}
      </Box>
    </Container>
  );
}

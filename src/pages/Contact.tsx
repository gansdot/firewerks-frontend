import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { fetchApi } from "../api/fetchClient";

const Background = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/images/paper-texture-light.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: theme.spacing(8, 2),
  minHeight: "90vh",
}));

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("calling contact ");

    setStatus("");

    try {
      const data = await fetchApi("/contact", {
        method: "POST",
        body: form,
      });
      console.log("calling contact ", data);

      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("❌ Failed to send message. Try again later.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Background>
        <Grid container spacing={4} justifyContent="center">
          <Grid size={12}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.8)",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                fontFamily="Happy Monkey"
                gutterBottom
              >
                Contact Us
              </Typography>
              <Typography variant="body1" mb={3}>
                We'd love to hear from you. Please fill out the form below.
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={4}
                  required
                />
                <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                  Send Message
                </Button>
                {status && (
                  <Typography variant="body2" mt={2}>
                    {status}
                  </Typography>
                )}
              </form>
            </Paper>
          </Grid>

          <Grid size={12}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Our Office
            </Typography>
            <Typography variant="body1" mb={1}>
              S.No 62/1, Kalankaperi,
              <br />
              Pattampudur Panchayat,
              <br />
              Virudhunagar Union, Tamil Nadu 626204, India
            </Typography>
            <Box mt={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <iframe
                title="Google Map"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.358027838578!2d77.94545117505972!3d9.477554690602743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0133976c483f6d%3A0xe36643cda0e5c909!2sKavin%20Fireworks%20Factory!5e0!3m2!1sen!2sde!4v1762690138767!5m2!1sen!2sde"
              />
            </Box>
          </Grid>
        </Grid>
      </Background>
    </Container>
  );
};

export default ContactUs;

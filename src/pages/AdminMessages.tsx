import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { fetchApi } from "../api/fetchClient";

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState<{ [key: string]: string }>({});

  const fetchMessages = async () => {
    const data = await fetchApi("/contact");
    setMessages(data);
  };

  const handleReply = async (id: string) => {
    const res = await fetchApi(`/contact/${id}/reply`, {
      method: "PUT",
      body: { reply: reply[id], adminName: "Admin" },
    });
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Messages
        </Typography>
        {messages.map((msg) => (
          <Paper key={msg._id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">{msg.subject}</Typography>
            <Typography variant="body2" color="text.secondary">
              From: {msg.name} ({msg.email})
            </Typography>
            <Typography mt={1}>{msg.message}</Typography>

            {msg.reply ? (
              <Typography mt={2} color="green">
                Replied: {msg.reply}
              </Typography>
            ) : (
              <Box mt={2}>
                <TextField
                  fullWidth
                  label="Reply"
                  multiline
                  rows={2}
                  value={reply[msg._id] || ""}
                  onChange={(e) =>
                    setReply({ ...reply, [msg._id]: e.target.value })
                  }
                />
                <Button onClick={() => handleReply(msg._id)} sx={{ mt: 1 }}>
                  Send Reply
                </Button>
              </Box>
            )}
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default AdminMessages;

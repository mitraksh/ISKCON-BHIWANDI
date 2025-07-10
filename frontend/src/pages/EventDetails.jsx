import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById, registerForEvent } from "../api/events";
import { useAuth } from "../contexts/AuthContext";
import { format } from "date-fns";
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      setError("");
      try {
        const res = await getEventById(id);
        setEvent(res);
      } catch (err) {
        console.error(err);
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      setMessage("You must be logged in to register.");
      return;
    }

    setRegistering(true);
    setMessage("");
    setError("");

    try {
      const res = await registerForEvent(id);
      setMessage(res.message || "Successfully registered!");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Registration failed.");
      } else {
        setError("Network error.");
      }
    } finally {
      setRegistering(false);
    }
  };

  if (loading)
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  if (!event)
    return (
      <Box mt={4}>
        <Typography variant="h6">Event not found.</Typography>
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        {event.title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Date: {format(new Date(event.date), "PPP")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Category: {event.category}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Location: {event.location}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {event.description}
      </Typography>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          disabled={registering || (message && message.includes("Successfully"))}
        >
          {registering ? "Registering..." : "Register"}
        </Button>
      </Box>

      {message && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
}

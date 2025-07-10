import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFilteredEvents } from "../api/events";

import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import { createEvent } from "../api/events";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    date: "",
    category: "",
    location: "",
    description: "",
    userId: user.userId
  });
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    async function fetchFilters() {
      try {
        const res = await getFilteredEvents();
        setCategories(res.categories || []);
        setLocations(res.locations || []);
      } catch (err) {
        console.error("Error fetching filter options:", err);
      }
    }
    fetchFilters();
  }, [user, navigate]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.date || !form.category || !form.location) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      console.log(form);

      await createEvent(form);
      navigate("/admin");
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="calc(100vh - 100px)"
      p={2}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 600,
          width: "100%",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Create New Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                label="Title"
                value={form.title}
                onChange={handleChange("title")}
                fullWidth
                required
              />
            </Grid>

            {/* Date */}
            <Grid item xs={12}>
              <TextField
                label="Date"
                type="date"
                value={form.date}
                onChange={handleChange("date")}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={form.category}
                  label="Category"
                  onChange={handleChange("category")}
                >
                  {categories.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Location</InputLabel>
                <Select
                  value={form.location}
                  label="Location"
                  onChange={handleChange("location")}
                >
                  {locations.map((l) => (
                    <MenuItem key={l} value={l}>
                      {l}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={form.description}
                onChange={handleChange("description")}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
          </Grid>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              Create Event
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

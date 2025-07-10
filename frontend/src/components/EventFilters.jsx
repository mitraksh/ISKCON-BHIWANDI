// src/components/EventFilters.jsx
import { useEffect, useState } from "react";
import { getFilteredEvents } from "../api/events";
import axios from "axios";
import {
  Grid,
  TextField,
  MenuItem,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button
} from "@mui/material";

export default function EventFilters({ filters, setFilters }) {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchFilters() {
      try {
        const res = await getFilteredEvents();
        setCategories(res.categories || []);
        setLocations(res.locations || []);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    }
    fetchFilters();
  }, []);

  const handleChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filter Events
      </Typography>
      <Grid container spacing={3}>
        {/* Date */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Date"
            type="date"
            value={filters.date}
            onChange={handleChange("date")}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel shrink>Category</InputLabel>
            <Select
              displayEmpty
              value={filters.category}
              label="Category"
              onChange={handleChange("category")}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Location */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel shrink>Location</InputLabel>
            <Select
              displayEmpty
              value={filters.location}
              label="Location"
              onChange={handleChange("location")}
            >
              <MenuItem value="">
                <em>All Locations</em>
              </MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        sx={{ mt: 2 }}
        variant="outlined"
        onClick={() => setFilters({ date: "", category: "", location: "" })}
      >
        Reset
      </Button>
    </Paper>
  );
}

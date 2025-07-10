import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { getMyRegistrations } from "../api/registrations";
import { format } from "date-fns";
import { useAuth } from "../contexts/AuthContext";

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();
  console.log(user);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getMyRegistrations();
        console.log("res"+res);
        setRegistrations(res);
      } catch (err) {
        console.error("Failed to load registrations", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Box maxWidth="md" mx="auto" mt={5}>
      <Typography variant="h5" gutterBottom>
        My Event Registrations
      </Typography>

      {registrations.length === 0 ? (
        <Typography>No registrations found.</Typography>
      ) : (
        <List>
          {registrations.map((reg) => (
            <Paper key={reg.id} sx={{ mb: 2, p: 2 }}>
              <ListItem>
                <ListItemText
                  primary={reg.Event.title}
                  secondary={`Date: ${format(new Date(reg.Event.date), "PPP")}, Category: ${reg.Event.category}`}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
}

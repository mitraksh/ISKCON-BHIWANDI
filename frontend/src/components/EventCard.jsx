import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {format(new Date(event.date), "PPP")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.category}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          {event.description}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          {event.location.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/event/${event.id}`}
          variant="contained"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

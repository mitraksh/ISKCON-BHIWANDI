import { useEffect, useState } from "react";
import { getAllEvents, deleteEvent, updateEvent } from "../api/events";
import { useAuth } from "../contexts/AuthContext";
import ColorModeToggle from "../components/ColorModeToggle";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  CircularProgress,
  AppBar, Toolbar,
} from "@mui/material";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    date: "",
    category: "",
    description: "",
  });

    const isLoggedIn = !!Cookies.get("token");
  
    const handleLogout = () => {
      Cookies.remove("token");
      delete axios.defaults.headers.common["Authorization"];
      navigate("/");
    };

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    async function fetchEvents() {
      setLoading(true);
      const res = await getAllEvents();
      setEvents(res || []);
      setLoading(false);
    }
    fetchEvents();
  }, [user, navigate]);

  const handleDelete = async () => {
    if (selectedEvent) {
      await deleteEvent(selectedEvent.id);
      setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
      setIsDeleteModalOpen(false);
    }
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setEditForm({
      title: event.title,
      date: event.date,
      category: event.category,
      description: event.description,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (field) => (e) => {
    setEditForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEditSave = async () => {
    await updateEvent(selectedEvent.id, editForm);
    setEvents((prev) =>
      prev.map((e) => (e.id === selectedEvent.id ? { ...e, ...editForm } : e))
    );
    setIsEditModalOpen(false);
  };

  if (loading)
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
       <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Admin Dashboard
                </Typography>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/admin/create">
                  Create New Event
                </Button>
                {!isLoggedIn ? (
                    <>
                      <Button color="inherit" component={Link} to="/login">
                        Login
                      </Button>
                      <Button color="inherit" component={Link} to="/register">
                        Register
                      </Button>
                    </>
                  ) : (
                    <Button color="inherit" onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                <ColorModeToggle />
              </Toolbar>
            </AppBar>
      
            <main>
              <Outlet />
            </main>


      {events.length === 0 ? (
        <Typography color="text.secondary">No events found.</Typography>
      ) : (
        events.map((event) => (
          <Card key={event.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {event.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.category}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {event.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => openEditModal(event)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setSelectedEvent(event);
                  setIsDeleteModalOpen(true);
                }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{selectedEvent?.title}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={editForm.title}
            onChange={handleEditChange("title")}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            value={editForm.date}
            onChange={handleEditChange("date")}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Category"
            value={editForm.category}
            onChange={handleEditChange("category")}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={editForm.description}
            onChange={handleEditChange("description")}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

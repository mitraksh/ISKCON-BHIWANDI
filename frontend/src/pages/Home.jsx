import { useEffect, useState } from "react";
import { Box, Grid, Typography, Container, AppBar, Toolbar, Button } from "@mui/material";
import { getEvents } from "../api/events";
import EventCard from "../components/EventCard";
import SkeletonCard from "../components/SkeletonCard";
import EventFilters from "../components/EventFilters";
import Pagination from "../components/Pagination";
import ColorModeToggle from "../components/ColorModeToggle";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ date: "", category: "", location: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = !!Cookies.get("token");

  const handleLogout = () => {
    Cookies.remove("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await getEvents(page, filters);
      setEvents(res || []);
      setTotalPages(1);
      setLoading(false);
    }
    fetchData();
  }, [page, filters]);

  return (
    <Container sx={{ py: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Events App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
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
            <>
             <Button color="inherit" component={Link} to="/my-registrations">
              My Events
            </Button>
             <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button> 
            </>
          )}
          <ColorModeToggle />
        </Toolbar>
      </AppBar>

      <main>
        <Outlet />
      </main>

      <EventFilters filters={filters} setFilters={setFilters} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <SkeletonCard />
              </Grid>
            ))
          : events.length > 0
          ? events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))
          : (
            <Grid item xs={12}>
              <Typography color="text.secondary">No events found.</Typography>
            </Grid>
          )}
      </Grid>

      {!loading && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </Box>
      )}
    </Container>
  );
}

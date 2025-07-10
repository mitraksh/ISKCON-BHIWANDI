import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEventPage from "./pages/CreateEventPage";
import MyRegistrations from "./components/MyRegistrations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-registrations" element={<MyRegistrations />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute
            element={<AdminDashboard />}
            allowedRoles={["admin"]}
          />
        }
      />
      <Route
        path="/admin/create"
        element={
          <ProtectedRoute
            element={<CreateEventPage />}
            allowedRoles={["admin"]}
          />
        }
      />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;

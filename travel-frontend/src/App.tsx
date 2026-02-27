import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DestinationDetails from "./pages/DestinationDetails";
import BookHotel from "./pages/BookHotel";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={token ? <Home /> : <Navigate to="/login" />}
      />

      <Route
        path="/destination/:id"
        element={token ? <DestinationDetails /> : <Navigate to="/login" />}
      />

      <Route
        path="/book/:id"
        element={token ? <BookHotel /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
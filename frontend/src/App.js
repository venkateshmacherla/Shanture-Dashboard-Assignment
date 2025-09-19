import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import ReportHistoryPage from "./pages/ReportHistoryPage";
import "./App.css";

import { CssBaseline, Container } from "@mui/material";

function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <CssBaseline />
        <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              marginRight: "1rem",
              fontWeight: isActive ? "700" : "400",
              color: isActive ? "#004ba0" : "#1976d2"
            })}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/reports"
            style={({ isActive }) => ({
              fontWeight: isActive ? "700" : "400",
              color: isActive ? "#004ba0" : "#1976d2"
            })}
          >
            Report History
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/reports" element={<ReportHistoryPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

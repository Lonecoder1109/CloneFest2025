import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About, WhyParticipate } from "./components/About";
import { Timeline } from "./components/Timeline";
import { Footer } from "./components/Footer";
import { Auth } from "./components/Auth";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import Squares from "./components/Squares";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const [adminToken, setAdminToken] = useState<string | null>(null);

  const navigate = useNavigate();

  // ✅ Restore token on app load
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) setAdminToken(token);
  }, []);

  // Navigation handlers
  const handleNavigateToAuth = () => {
    window.location.href = "/auth";
  };

  const handleNavigateHome = () => {
    window.location.href = "/";
  };

  const handleNavigateToAdmin = () => {
    window.location.href = "/login";
  };

  // Admin login success handler
  const handleAdminLogin = (token: string) => {
    localStorage.setItem("adminToken", token); // ✅ persist token
    setAdminToken(token);
    navigate("/admin");
  };

  // Admin logout
  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken"); // ✅ clear token
    setAdminToken(null);
    window.location.href = "/";
  };

  // Main site landing component
  const MainPage = () => (
    <>
      {/* Animated background */}
      <Squares />
      {/* Main site content */}
      <Header onNavigateToAuth={handleNavigateToAuth} />
      <Hero onNavigateToAuth={handleNavigateToAuth} />
      <About />
      <WhyParticipate />
      <Timeline />
      <Footer onNavigateToAdmin={handleNavigateToAdmin} />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/auth"
          element={<Auth onNavigateHome={handleNavigateHome} />}
        />
        <Route
          path="/login"
          element={
            <AdminLogin
              onAdminLogin={handleAdminLogin}
              onBack={handleNavigateHome}
            />
          }
        />
        <Route
          path="/admin"
          element={
            adminToken ? (
              <AdminDashboard
                adminToken={adminToken}
                onLogout={handleAdminLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

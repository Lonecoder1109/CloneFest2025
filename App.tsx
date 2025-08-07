import React, { useState } from "react";
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

const App: React.FC = () => {
  const [adminToken, setAdminToken] = useState<string | null>(null);

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
    setAdminToken(token);
    window.location.href = "/admin";
  };

  // Admin logout
  const handleAdminLogout = () => {
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

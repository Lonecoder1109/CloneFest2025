import React, { useState } from "react";
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
  const [view, setView] = useState<"main" | "auth" | "admin-login" | "admin-dashboard">("main");


  const [adminToken, setAdminToken] = useState<string | null>(null);

  // Navigation handlers
  const handleNavigateToAuth = () => setView("auth");
  const handleNavigateHome = () => setView("main");
  const handleNavigateToAdmin = () => setView("admin-login");

  // Admin login success handler
  const handleAdminLogin = (token: string) => {
    setAdminToken(token);
    setView("admin-dashboard");
  };

  // Admin logout
  const handleAdminLogout = () => {
    setAdminToken(null);
    setView("main");
  };

  // Admin login view
  if (view === "admin-login") {
    return (
      <AdminLogin
        onAdminLogin={handleAdminLogin}
        onBack={handleNavigateHome}
      />
    );
  }

  // Admin dashboard view
  if (view === "admin-dashboard" && adminToken) {
    return (
      <AdminDashboard adminToken={adminToken} onLogout={handleAdminLogout} />
    );
  }

  // Auth view (signup / login)
  if (view === "auth") {
    return <Auth onNavigateHome={handleNavigateHome} />;
  }

  // Main site landing view
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated background */}
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal"
        borderColor="rgba(148, 163, 184, 0.15)"
        hoverFillColor="rgba(148, 163, 184, 0.05)"
      />

      {/* Main site content */}
      <div className="relative z-10">
        <Header
          onNavigateToAuth={handleNavigateToAuth}
          onNavigateToAdmin={handleNavigateToAdmin}
        />
        <Hero onNavigateToAuth={handleNavigateToAuth} />
        <About />
        <WhyParticipate />
        <Timeline />
        <Footer />
      </div>
    </div>
  );
};

export default App;

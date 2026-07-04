import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

// Placeholder — swap for the real DashboardPage once it's built
function DashboardPlaceholder() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-950 font-body text-ink-100">
      <p>Dashboard — coming next.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPlaceholder />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

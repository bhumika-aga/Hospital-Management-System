import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

// Theme
import createAppTheme from "./theme/theme";

// Components
import Layout from "./components/layout/Layout";

// Pages
import Claims from "./pages/Claims";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Specialists from "./pages/Specialists";
import TreatmentPackages from "./pages/TreatmentPackages";
import Treatments from "./pages/Treatments";

// Services
import { AuthService } from "./services/auth.service";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const currentTheme = React.useMemo(
    () => createAppTheme(isDarkMode),
    [isDarkMode],
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="packages" element={<TreatmentPackages />} />
            <Route path="specialists" element={<Specialists />} />
            <Route path="treatments" element={<Treatments />} />
            <Route path="claims" element={<Claims />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

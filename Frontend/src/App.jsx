import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Datasets from "./pages/Datasets";
import QueryAI from "./pages/QueryAI";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Settings from "./pages/Settings";

import DatasetPreview from "./pages/DatasetPreview";
import HistoryQuery from "./pages/HistoryQuery";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Security from "./pages/Security";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC PAGES
        ========================= */}

        {/* QueryMind AI Landing Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Simple Login Page */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* =========================
            QUERYMIND APPLICATION
        ========================= */}

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Datasets */}
        <Route
          path="/datasets"
          element={<Datasets />}
        />

        {/* AI Query */}
        <Route
          path="/query"
          element={<QueryAI />}
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Query History */}
        <Route
          path="/history"
          element={<History />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />


        {/* =========================
            DATASET / HISTORY DETAILS
        ========================= */}

        <Route
          path="/data/:tableName"
          element={<DatasetPreview />}
        />

        <Route
          path="/history/query/:queryId"
          element={<HistoryQuery />}
        />


        {/* =========================
            USER
        ========================= */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/security"
          element={<Security />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
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

  useEffect(() => {

    const darkMode =
      localStorage.getItem("darkMode") === "true";

    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );

  }, []);

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/datasets"
          element={<Datasets />}
        />

        <Route
          path="/query"
          element={<QueryAI />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/data/:tableName"
          element={<DatasetPreview />}
        />

        <Route
          path="/history/query/:queryId"
          element={<HistoryQuery />}
        />

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

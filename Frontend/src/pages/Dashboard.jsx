import { useEffect, useState } from "react";

import "../styles/dashboard.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    datasets: 0,
    questions: 0,
    rows: 0,
    columns: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await API.get("/dashboard");
        setStats(response.data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <div className="welcome-section">
            <h1>Dashboard</h1>
            <p>Overview of your datasets, queries and AI activity.</p>
          </div>

          <section className="stats-section">
            <div className="stat-card">
              <h3>Datasets</h3>
              <h2>{loading ? "..." : stats.datasets}</h2>
              <span>Total Uploaded</span>
            </div>

            <div className="stat-card">
              <h3>Questions Asked</h3>
              <h2>{loading ? "..." : stats.questions}</h2>
              <span>Across all datasets</span>
            </div>

            <div className="stat-card">
              <h3>Total Rows</h3>
              <h2>
                {loading ? "..." : Number(stats.rows).toLocaleString()}
              </h2>
              <span>Across uploaded datasets</span>
            </div>

            <div className="stat-card">
              <h3>Total Columns</h3>
              <h2>{loading ? "..." : stats.columns}</h2>
              <span>Across uploaded datasets</span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

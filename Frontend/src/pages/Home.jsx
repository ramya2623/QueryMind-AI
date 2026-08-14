import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Home.css";
import {
  FolderOpen,
  MessageSquare,
  BarChart3,
  History
} from "lucide-react";

function Home() {
    const navigate = useNavigate();
  return (
    <div className="home">
      <Sidebar />
      <Navbar />

      <div className="home-content">

        <div className="hero-section">

          <h1>Good Evening, Ramya </h1>

          <p>
            Welcome back to QueryMind AI.
            What would you like to do today?
          </p>

        </div>

        <div className="action-grid">

 <div
    className="action-card"
    onClick={() => navigate("/datasets")}
>
    <div className="card-header">
      <FolderOpen className="action-icon" />
      <h2>Upload Dataset</h2>
      <span className="card-arrow">→</span>
    </div>

    <p>
      Import CSV files and start exploring your data.
    </p>

  </div>

  <div
    className="action-card"
    onClick={() => navigate("/query")}
>

    <div className="card-header">
      <MessageSquare className="action-icon" />
      <h2>Ask Query</h2>
      <span className="card-arrow">→</span>
    </div>

    <p>
      Ask questions in natural language and get SQL instantly.
    </p>

  </div>

  <div
    className="action-card"
    onClick={() => navigate("/analytics")}
>

    <div className="card-header">
      <BarChart3 className="action-icon" />
      <h2>Explore Analytics</h2>
      <span className="card-arrow">→</span>
    </div>

    <p>
      View charts, trends and AI-generated insights.
    </p>

  </div>

  <div
    className="action-card"
    onClick={() => navigate("/history")}
>

    <div className="card-header">
      <History className="action-icon" />
      <h2>Continue Session</h2>
      <span className="card-arrow">→</span>
    </div>

    <p>
      Resume where you left off with previous datasets.
    </p>

  </div>

</div>

      </div>
    </div>
  );
}

export default Home;
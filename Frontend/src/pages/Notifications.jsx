import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/settings.css";

import {
  Bell,
  ArrowLeft,
  Save
} from "lucide-react";

function Notifications() {

  const navigate = useNavigate();

  const [queryNotifications, setQueryNotifications] = useState(
    localStorage.getItem("queryNotifications") !== "false"
  );

  const [datasetNotifications, setDatasetNotifications] = useState(
    localStorage.getItem("datasetNotifications") !== "false"
  );

  const [insightNotifications, setInsightNotifications] = useState(
    localStorage.getItem("insightNotifications") !== "false"
  );

  const handleSave = () => {

    localStorage.setItem(
      "queryNotifications",
      queryNotifications
    );

    localStorage.setItem(
      "datasetNotifications",
      datasetNotifications
    );

    localStorage.setItem(
      "insightNotifications",
      insightNotifications
    );

    alert("Notification preferences saved!");
  };

  return (
    <div className="settings-page">

      <Sidebar />
      <Navbar />

      <div className="settings-content">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate("/settings")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "none",
            background: "transparent",
            color: "var(--coffee)",
            cursor: "pointer",
            marginBottom: "25px",
            fontSize: "14px"
          }}
        >
          <ArrowLeft size={18} />
          Back to Settings
        </button>


        {/* HEADER */}

        <div className="settings-header">

          <h1>Notifications</h1>

          <p>
            Manage how QueryMind AI keeps you informed.
          </p>

        </div>


        {/* NOTIFICATION CARD */}

        <div className="setting-card">

          <div style={{ width: "100%" }}>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "25px"
              }}
            >

              <Bell size={24} />

              <h3
                style={{
                  margin: 0,
                  color: "var(--coffee)"
                }}
              >
                Notification Preferences
              </h3>

            </div>


            {/* QUERY NOTIFICATIONS */}

            <div className="notification-option">

              <div>

                <h3>Query Results</h3>

                <p>
                  Get notified when an AI query has finished processing.
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={queryNotifications}
                  onChange={(e) =>
                    setQueryNotifications(e.target.checked)
                  }
                />

                <span className="slider"></span>

              </label>

            </div>


            {/* DATASET NOTIFICATIONS */}

            <div className="notification-option">

              <div>

                <h3>Dataset Updates</h3>

                <p>
                  Receive notifications about uploaded datasets.
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={datasetNotifications}
                  onChange={(e) =>
                    setDatasetNotifications(e.target.checked)
                  }
                />

                <span className="slider"></span>

              </label>

            </div>


            {/* AI INSIGHTS */}

            <div className="notification-option">

              <div>

                <h3>AI Insights</h3>

                <p>
                  Get notified when new analytics insights are available.
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={insightNotifications}
                  onChange={(e) =>
                    setInsightNotifications(e.target.checked)
                  }
                />

                <span className="slider"></span>

              </label>

            </div>


            {/* SAVE */}

            <button
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 18px",
                border: "none",
                borderRadius: "12px",
                background: "var(--coffee)",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                marginTop: "25px"
              }}
            >

              <Save size={17} />

              Save Preferences

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Notifications;
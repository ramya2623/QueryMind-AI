import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/settings.css";

import { User, ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileEmail", email);

    alert("Profile updated successfully!");
  };

  return (
    <div className="settings-page">

      <Sidebar />
      <Navbar />

      <div className="settings-content">

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

        <div className="settings-header">
          <h1>Profile</h1>

          <p>
            Manage your personal information.
          </p>
        </div>

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
              <User size={24} />

              <h3
                style={{
                  margin: 0,
                  color: "var(--coffee)"
                }}
              >
                Personal Information
              </h3>
            </div>

            <div style={{ marginBottom: "18px" }}>

              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  color: "var(--coffee)",
                  fontSize: "14px"
                }}
              >
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid #ddd3ca",
                  borderRadius: "12px",
                  outline: "none",
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
              />

            </div>

            <div style={{ marginBottom: "25px" }}>

              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  color: "var(--coffee)",
                  fontSize: "14px"
                }}
              >
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid #ddd3ca",
                  borderRadius: "12px",
                  outline: "none",
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
              />

            </div>

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
                fontSize: "14px"
              }}
            >
              <Save size={17} />
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
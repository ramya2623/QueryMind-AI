import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/settings.css";

import {
  Shield,
  ArrowLeft,
  Save,
  Eye,
  EyeOff
} from "lucide-react";

function Security() {

  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = () => {

    setMessage("");
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    // Frontend-only demo for now.
    localStorage.setItem("userPassword", newPassword);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setMessage("Password changed successfully.");
  };

  return (
    <div className="settings-page">

      <Sidebar />
      <Navbar />

      <div className="settings-content">

        {/* BACK */}

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

          <h1>Security</h1>

          <p>
            Manage your password and account security.
          </p>

        </div>


        {/* PASSWORD CARD */}

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

              <Shield
                size={24}
                color="var(--coffee)"
              />

              <h3
                style={{
                  margin: 0,
                  color: "var(--coffee)"
                }}
              >
                Change Password
              </h3>

            </div>


            {/* CURRENT PASSWORD */}

            <div className="password-field">

              <label>Current Password</label>

              <div className="password-input">

                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  placeholder="Enter current password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrent(!showCurrent)
                  }
                >
                  {showCurrent
                    ? <EyeOff size={18} />
                    : <Eye size={18} />
                  }
                </button>

              </div>

            </div>


            {/* NEW PASSWORD */}

            <div className="password-field">

              <label>New Password</label>

              <div className="password-input">

                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  placeholder="Enter new password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNew(!showNew)
                  }
                >
                  {showNew
                    ? <EyeOff size={18} />
                    : <Eye size={18} />
                  }
                </button>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="password-field">

              <label>Confirm New Password</label>

              <div className="password-input">

                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm new password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                >
                  {showConfirm
                    ? <EyeOff size={18} />
                    : <Eye size={18} />
                  }
                </button>

              </div>

            </div>


            {/* ERROR */}

            {error && (
              <div className="security-error">
                {error}
              </div>
            )}


            {/* SUCCESS */}

            {message && (
              <div className="security-success">
                {message}
              </div>
            )}


            {/* SAVE */}

            <button
              onClick={handleChangePassword}
              className="security-save"
            >
              <Save size={17} />
              Change Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Security;
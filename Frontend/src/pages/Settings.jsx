import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/settings.css";

import {
  User,
  Moon,
  Bell,
  Shield,
  LogOut,
  ChevronRight
} from "lucide-react";

function Settings() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const handleAppearance = () => {

    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem("darkMode", newMode);

    document.body.classList.toggle("dark-mode", newMode);
  };

  return (
    <div className="settings-page">

      <Sidebar />
      <Navbar />

      <div className="settings-content">

        <div className="settings-header">

          <h1>Settings</h1>

          <p>
            Manage your account and application preferences.
          </p>

        </div>

        <div className="settings-list">

          {/* PROFILE */}

          <div
            className="setting-card"
            onClick={() => navigate("/profile")}
          >

            <div className="setting-left">

              <User />

              <div>

                <h3>Profile</h3>

                <p>
                  Update your personal information.
                </p>

              </div>

            </div>

            <ChevronRight />

          </div>


          {/* APPEARANCE */}

          <div
            className="setting-card"
            onClick={handleAppearance}
          >

            <div className="setting-left">

              <Moon />

              <div>

                <h3>Appearance</h3>

                <p>
                  {darkMode
                    ? "Dark mode enabled."
                    : "Light mode enabled."}
                </p>

              </div>

            </div>

            <ChevronRight />

          </div>


          {/* NOTIFICATIONS */}

          <div
            className="setting-card"
            onClick={() => navigate("/notifications")}
          >

            <div className="setting-left">

              <Bell />

              <div>

                <h3>Notifications</h3>

                <p>
                  Manage notification preferences.
                </p>

              </div>

            </div>

            <ChevronRight />

          </div>


          {/* SECURITY */}

          <div
            className="setting-card"
            onClick={() => navigate("/security")}
          >

            <div className="setting-left">

              <Shield />

              <div>

                <h3>Security</h3>

                <p>
                  Change password and account security.
                </p>

              </div>

            </div>

            <ChevronRight />

          </div>


          {/* LOGOUT */}

          <div
            className="setting-card logout"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >

            <div className="setting-left">

              <LogOut />

              <div>

                <h3>Logout</h3>

                <p>
                  Sign out of your account.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;
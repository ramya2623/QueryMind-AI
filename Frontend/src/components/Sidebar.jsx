import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

import {
  Brain,
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  BarChart3,
  History,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div>

        {/* LOGO */}
        <div className="sidebar-logo">
          <Brain className="brand-icon" />

          <h2>
            QueryMind <span>AI</span>
          </h2>
        </div>

        {/* MENU */}
        <nav className="sidebar-menu">

          <NavLink to="/dashboard">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/datasets">
            <FolderOpen size={20} />
            <span>Datasets</span>
          </NavLink>

          <NavLink to="/query">
            <MessageSquare size={20} />
            <span>Query AI</span>
          </NavLink>

          <NavLink to="/analytics">
            <BarChart3 size={20} />
            <span>Analytics</span>
          </NavLink>

          <NavLink to="/history">
            <History size={20} />
            <span>History</span>
          </NavLink>

          <NavLink to="/settings">
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>

        </nav>

      </div>

      {/* FOOTER */}
      <div className="sidebar-footer">

        <div className="user-avatar">
          R
        </div>

        <div>
          <h4>Ramya</h4>
          <p>Pro Plan</p>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
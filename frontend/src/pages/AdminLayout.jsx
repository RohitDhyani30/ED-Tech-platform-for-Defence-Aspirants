import { useState } from "react";
import "../style/AdminLayout.css";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", sub: "Overview" },
  { id: "questions", label: "Questions", sub: "Manage Questions" },
  { id: "tests", label: "Tests", sub: "Test Manager" },
  { id: "aspirants", label: "Students", sub: "Aspirants" },
  { id: "analytics", label: "Analytics", sub: "Performance" },
  { id: "content", label: "Content", sub: "Articles & Media" },
  { id: "settings", label: "Settings", sub: "System Config" },
];

export default function AdminLayout({ activePage, onNavigate, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-root">

      {/* NAVBAR */}
      <nav className="admin-navbar">
        <div className="nav-left">
          <button className="collapse-btn" onClick={() => setCollapsed(c => !c)}>
            {collapsed ? "▶" : "◀"}
          </button>

          <div className="logo-text">
            <span className="logo-main">NDAPREP</span>
            <span className="logo-sub">Admin Panel</span>
          </div>
        </div>

        <div className="nav-center">
          <span className="admin-badge">Admin Access</span>
        </div>

        <div className="nav-right">
          <span className="admin-user">Admin</span>
          <button className="logout-btn" onClick={() => onNavigate("logout")}>
            Logout
          </button>
        </div>
      </nav>

      <div className="admin-body">

        {/* SIDEBAR */}
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          <div className="sidebar-header">
            {!collapsed && <span className="sidebar-title">Menu</span>}
          </div>

          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : ""}
            >
              {!collapsed && (
                <div className="nav-labels">
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-sub">{item.sub}</span>
                </div>
              )}

              {!collapsed && activePage === item.id && (
                <span className="active-bar" />
              )}
            </button>
          ))}

          {/* Logout (bottom) */}
          <div className="sidebar-footer">
            <button className="nav-item" onClick={() => onNavigate("logout")}>
              {!collapsed && (
                <div className="nav-labels">
                  <span className="nav-label logout-text">Logout</span>
                </div>
              )}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="admin-main">
          {children}
        </main>

      </div>
    </div>
  );
}
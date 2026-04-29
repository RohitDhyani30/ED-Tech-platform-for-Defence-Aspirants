import { useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "content", label: "Content Manager" },
  { id: "question-bank", label: "Question Bank" },
  { id: "exams", label: "Test Manager" },
  { id: "pyq", label: "PYQ" },
  { id: "test-results", label: "Test Results" },
  { id: "missions", label: "Operations" },
  { id: "ssb", label: "SSB Command" },
  { id: "users", label: "Users" },
];

export default function AdminLayout({ activePage, onNavigate, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="command-root">
      <nav className="command-navbar">
        <div className="command-logo">
          <button
            className="command-sidebar-toggle"
            onClick={() => setCollapsed((c) => !c)}
          >
            <span className="nav-visual-indicator"></span>
          </button>

          <div className="portal-logo">
            <span className="logo-main">NDAPREP</span>
            <span className="logo-sub">Command Command</span>
          </div>
        </div>

        <div className="nav-center">
          <span className="command-badge">Authorized Personnel Only</span>
        </div>

        <div
          className="nav-right"
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <span className="label-caps" style={{ color: "var(--gold)" }}>
            Admin Unit
          </span>
          <button
            className="btn btn-alert"
            style={{ padding: "0.5rem 1rem" }}
            onClick={() => onNavigate("logout")}
          >
            Terminate
          </button>
        </div>
      </nav>

      <div className="command-body">
        <aside className={`command-sidebar ${collapsed ? "collapsed" : ""}`}>
          <nav style={{ flex: 1, overflowY: "auto" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`command-nav-item ${activePage === item.id ? "active" : ""}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="command-nav-label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer" style={{ padding: "1rem" }}>
            <button
              className="command-nav-item"
              style={{ border: "1px solid var(--border)", borderRadius: "4px" }}
              onClick={() => onNavigate("logout")}
            >
              <span className="command-nav-label">Logout</span>
            </button>
          </div>
        </aside>

        <main className="command-main">
          <header className="command-header">
            <h1 style={{ margin: 0, fontSize: "2rem" }}>
              {NAV_ITEMS.find((i) => i.id === activePage)?.label ||
                "Command Center"}
            </h1>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}

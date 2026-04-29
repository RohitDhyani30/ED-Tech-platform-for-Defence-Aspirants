import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function AspirantLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/study-materials", label: "Study Materials" },
    { path: "/pyq", label: "PYQ Papers" },
    { path: "/missions", label: "Military Operations" },
    { path: "/ssb-prep", label: "SSB Preparation" },
    { path: "/available-tests", label: "Take Tests" },
    { path: "/my-results", label: "My Results" },
  ];

  const getUserName = () => {
    const token = localStorage.getItem("token");
    if (!token) return "Aspirant";
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.name || "Aspirant";
    } catch {
      return "Aspirant";
    }
  };

  const getTitle = (path) => {
    const titles = {
      "/dashboard": "Tactical Dashboard",
      "/study-materials": "Intelligence Repository",
      "/pyq": "Combat Archives",
      "/missions": "Active Operations",
      "/ssb-prep": "Special Selection Board",
      "/available-tests": "Live Drills",
      "/my-results": "After Action Report",
    };
    return titles[path] || "Aspirant Command";
  };

  return (
    <div className="portal-root">
      <aside className={`portal-sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        <div className="sidebar-header">
          <div className="portal-logo">
            <span className="logo-main">NDAPREP</span>
            {sidebarOpen && <span className="logo-sub">Tactical Portal</span>}
          </div>
          <button
            className="portal-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="nav-visual-indicator"></span>
          </button>
        </div>

        <nav className="portal-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`portal-nav-link ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="nav-visual-indicator"></span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer" style={{ padding: "20px" }}>
          <button
            className="btn btn-outline"
            style={{ width: "100%", justifyContent: "flex-start" }}
            onClick={handleLogout}
          >
            <span className="nav-visual-indicator"></span>
            {sidebarOpen && <span>Abort Session</span>}
          </button>
        </div>
      </aside>

      <main className="portal-main">
        <header className="portal-header">
          <div className="header-title">
            <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
              {getTitle(location.pathname)}
            </h2>
          </div>
          <div className="header-user">
            <span className="label-caps" style={{ color: "var(--gold)" }}>
              Personnel: {getUserName()}
            </span>
          </div>
        </header>
        <div className="portal-content">{children}</div>
      </main>
    </div>
  );
}

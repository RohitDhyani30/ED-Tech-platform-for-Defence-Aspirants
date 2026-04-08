import "../style/AdminPages.css";

// ── Cadet Database ──
export function CadetDatabase() {
  return (
    <div className="page">
      <h2> Cadet Database</h2>
      <p>List of all aspirants with performance tracking.</p>
    </div>
  );
}

// ── Analytics ──
export function AnalyticsPage() {
  return (
    <div className="page">
      <h2>Analytics</h2>
      <p>Visual insights of test performance and usage.</p>
    </div>
  );
}

// ── Content Ops ──
export function ContentOps() {
  return (
    <div className="page">
      <h2>Content Operations</h2>
      <p>Manage study materials and modules.</p>
    </div>
  );
}

// ── Settings ──
export function SettingsPage() {
  return (
    <div className="page">
      <h2>Settings</h2>
      <p>Admin configuration panel.</p>
    </div>
  );
}
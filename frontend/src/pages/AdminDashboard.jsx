import "../style/AdminDashboard.css";

export default function AdminDashboard({ onNavigate }) {
  return (
    <div className="admin-dashboard">
      <h1>Admin Command Center</h1>

      <div className="dashboard-grid">
        <div className="card" onClick={() => onNavigate("questions")}>
          <h3>Question Arsenal</h3>
          <p>Manage and upload questions</p>
        </div>

        <div className="card" onClick={() => onNavigate("tests")}>
          <h3>Test Simulator</h3>
          <p>Create and manage mock tests</p>
        </div>

        <div className="card" onClick={() => onNavigate("aspirants")}>
          <h3>Cadet Database</h3>
          <p>View aspirant performance</p>
        </div>

        <div className="card" onClick={() => onNavigate("analytics")}>
          <h3>Analytics</h3>
          <p>Platform insights</p>
        </div>

        <div className="card" onClick={() => onNavigate("content")}>
          <h3>Content Ops</h3>
          <p>Manage study content</p>
        </div>

        <div className="card" onClick={() => onNavigate("settings")}>
          <h3>Settings</h3>
          <p>Platform configuration</p>
        </div>
      </div>
    </div>
  );
}
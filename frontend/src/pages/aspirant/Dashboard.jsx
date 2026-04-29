import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedOperations } from "../../services/operationService";
import { getStudyResources } from "../../services/ndaService";
import { getSSBResources } from "../../services/ssbService";
import { getAllTests, getMyAttempts } from "../../services/examService";

export default function Dashboard() {
  const [featuredMissions, setFeaturedMissions] = useState([]);
  const [resourcesCount, setResourcesCount] = useState(0);
  const [availableTests, setAvailableTests] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [
          missionsRes,
          resourcesRes,
          ssbResourcesRes,
          testsRes,
          attemptsRes,
        ] = await Promise.all([
          getFeaturedOperations(),
          getStudyResources(),
          getSSBResources().catch(() => ({ data: [] })),
          getAllTests(),
          getMyAttempts().catch(() => ({ data: [] })),
        ]);

        setFeaturedMissions(missionsRes.data || []);
        setResourcesCount(
          (resourcesRes.data?.length || 0) +
            (ssbResourcesRes.data?.length || 0),
        );
        setAvailableTests(testsRes.data || []);
        setRecentResults(attemptsRes.data || []);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalTestsTaken = recentResults.length;
  const averageScore =
    recentResults.length > 0
      ? Math.round(
          recentResults.reduce((sum, a) => sum + (a.percentage || 0), 0) /
            recentResults.length,
        )
      : 0;

  if (loading) {
    return (
      <div className="loading-state">Initialising Tactical Systems...</div>
    );
  }

  return (
    <>
      {/* Stats Cards */}
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div className="card">
          <div className="label-caps" style={{ color: "var(--text-muted)" }}>
            Intelligence Pool
          </div>
          <div
            className="h1"
            style={{ margin: "10px 0", color: "var(--gold)" }}
          >
            {resourcesCount}+
          </div>
          <div className="text-ui" style={{ fontSize: "0.8rem" }}>
            Study Resources
          </div>
        </div>
        <div className="card">
          <div className="label-caps" style={{ color: "var(--text-muted)" }}>
            Drills Conducted
          </div>
          <div
            className="h1"
            style={{ margin: "10px 0", color: "var(--gold)" }}
          >
            {totalTestsTaken}
          </div>
          <div className="text-ui" style={{ fontSize: "0.8rem" }}>
            Total Attempts
          </div>
        </div>
        <div className="card">
          <div className="label-caps" style={{ color: "var(--text-muted)" }}>
            Combat Efficiency
          </div>
          <div
            className="h1"
            style={{ margin: "10px 0", color: "var(--gold)" }}
          >
            {averageScore}%
          </div>
          <div className="text-ui" style={{ fontSize: "0.8rem" }}>
            Average Performance
          </div>
        </div>
        <div className="card">
          <div className="label-caps" style={{ color: "var(--text-muted)" }}>
            Active Briefings
          </div>
          <div
            className="h1"
            style={{ margin: "10px 0", color: "var(--gold)" }}
          >
            {availableTests.length}
          </div>
          <div className="text-ui" style={{ fontSize: "0.8rem" }}>
            Available Tests
          </div>
        </div>
      </div>

      {/* Featured Missions */}
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3>Strategic Operations Briefing</h3>
        <Link to="/missions" className="text-gold label-caps">
          Full Intel →
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {featuredMissions.slice(0, 3).map((mission) => (
          <div key={mission.id} className="card">
            <div
              className="label-caps"
              style={{ color: "var(--gold)", marginBottom: "5px" }}
            >
              Operation: {mission.year}
            </div>
            <h4 style={{ margin: "5px 0" }}>{mission.operationName}</h4>
            <div className="text-muted" style={{ fontSize: "0.9rem" }}>
              Sector: {mission.location}
            </div>
          </div>
        ))}
        {featuredMissions.length === 0 && (
          <div className="card">
            <p className="text-muted">No active operation data available.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="section-header" style={{ marginBottom: "20px" }}>
        <h3>Tactical Maneuvers</h3>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <Link
          to="/study-materials"
          className="card"
          style={{ cursor: "pointer" }}
        >
          <div className="label-caps" style={{ color: "var(--gold)" }}>
            Armory
          </div>
          <div className="text-ui" style={{ marginTop: "10px" }}>
            Access Study Materials
          </div>
        </Link>
        <Link
          to="/available-tests"
          className="card"
          style={{ cursor: "pointer" }}
        >
          <div className="label-caps" style={{ color: "var(--gold)" }}>
            Firing Range
          </div>
          <div className="text-ui" style={{ marginTop: "10px" }}>
            Initiate Performance Test
          </div>
        </Link>
        <Link to="/ssb-prep" className="card" style={{ cursor: "pointer" }}>
          <div className="label-caps" style={{ color: "var(--gold)" }}>
            Selection Trials
          </div>
          <div className="text-ui" style={{ marginTop: "10px" }}>
            SSB Preparation Drills
          </div>
        </Link>
      </div>

      {/* Recent Results */}
      {recentResults.length > 0 && (
        <>
          <div
            className="section-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3>After Action Reports</h3>
            <Link to="/my-results" className="text-gold label-caps">
              Complete History →
            </Link>
          </div>
          <table className="command-table">
            <thead>
              <tr>
                <th>Operation Designation</th>
                <th>Intel Gathered</th>
                <th>Combat Score</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {recentResults.slice(0, 5).map((attempt) => (
                <tr key={attempt.id}>
                  <td className="text-ui">
                    {attempt.test?.title || "Classified Test"}
                  </td>
                  <td>
                    {attempt.score}/{attempt.test?.totalMarks || 0}
                  </td>
                  <td className="text-gold">{attempt.percentage}%</td>
                  <td>
                    <span
                      className={`status-dot ${attempt.percentage >= 40 ? "status-active" : "status-alert"}`}
                    ></span>
                    <span className="label-caps">
                      {attempt.percentage >= 40 ? "Qualified" : "Disqualified"}
                    </span>
                  </td>
                  <td className="text-muted">
                    {attempt.completedAt
                      ? new Date(attempt.completedAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

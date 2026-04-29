import NDAManager from "./nda/NDAManager";
import SSBManager from "./ssb/SSBManager";
import MissionManager from "./missions/MissionManager";
import { useState, useEffect } from "react";
import { getSubjects, getStudyResources } from "../../services/ndaService";
import { getSSBResources } from "../../services/ssbService";
import { getOperations } from "../../services/operationService";
import UsersManager from "./users/UsersManager";
import { getUserStats } from "../../services/userService";
import TestManager from "./exam/TestManager";
import QuestionBank from "./exam/QuestionBank";
import PYQManager from "./exam/PYQManager";
import TestResults from "./exam/TestResults";

export const AdminHome = () => {
  const [stats, setStats] = useState({
    subjects: 0,
    resources: 0,
    missions: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          subjectsRes,
          resourcesRes,
          ssbResourcesRes,
          missionsRes,
          usersRes,
        ] = await Promise.all([
          getSubjects(),
          getStudyResources(),
          getSSBResources().catch(() => ({ data: [] })),
          getOperations(),
          getUserStats().catch(() => ({ data: { totalUsers: 0 } })),
        ]);

        setStats({
          subjects: subjectsRes.data?.length || 0,
          resources:
            (resourcesRes.data?.length || 0) +
            (ssbResourcesRes.data?.length || 0),
          missions: missionsRes.data?.length || 0,
          users: usersRes.data?.totalUsers || 0,
        });
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="command-main">
        <p>Synchronizing Command Systems...</p>
      </div>
    );
  }

  return (
    <div className="command-main-content">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <div className="card">
          <div className="label-caps" style={{ color: "var(--text-muted)" }}>
            Intelligence Sectors
          </div>
          <div
            className="h1"
            style={{ margin: "10px 0", color: "var(--gold)" }}
          >
            {stats.subjects}
          </div>
          <div className="text-ui" style={{ fontSize: "0.8rem" }}>
            NDA Subjects
          </div>
        </div>
        <div className="card">
          <div className="label-caps" style={{ color: "var(--text-muted)" }}>
            Resource Inventory
          </div>
          <div
            className="h1"
            style={{ margin: "10px 0", color: "var(--gold)" }}
          >
            {stats.resources}
          </div>
          <div className="text-ui" style={{ fontSize: "0.8rem" }}>
            Study Assets
          </div>
        </div>
        <div className="card">
          <div className="label-caps" style={{ color: "var(--text-muted)" }}>
            Operation Records
          </div>
          <div
            className="h1"
            style={{ margin: "10px 0", color: "var(--gold)" }}
          >
            {stats.missions}
          </div>
          <div className="text-ui" style={{ fontSize: "0.8rem" }}>
            Combat Missions
          </div>
        </div>
        <div className="card">
          <div className="label-caps" style={{ color: "var(--text-muted)" }}>
            Active Personnel
          </div>
          <div
            className="h1"
            style={{ margin: "10px 0", color: "var(--gold)" }}
          >
            {stats.users}
          </div>
          <div className="text-ui" style={{ fontSize: "0.8rem" }}>
            Total Aspirants
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{ marginTop: "30px", borderLeft: "4px solid var(--gold)" }}
      >
        <h4 style={{ color: "var(--gold)" }}>Command Directive</h4>
        <p className="text-muted" style={{ marginTop: "10px" }}>
          Welcome to the Strategic Command Center. Use the tactical sidebar to
          deploy resources, manage active operations, and monitor personnel
          performance. All systems are online.
        </p>
      </div>
    </div>
  );
};

export const PYQPage = () => <PYQManager />;
export const TestResultsPage = () => <TestResults />;
export const QuestionBankPage = () => <QuestionBank />;
export const ExamManagementPage = () => <TestManager />;
export const UsersManagementPage = () => <UsersManager />;
export { NDAManager, SSBManager, MissionManager };

import { useEffect, useState } from "react";
import {
  getSSBStages,
  getSSBTestsByStage,
  getSSBResources,
} from "../../services/ssbService";

export default function SSBPrep() {
  const [stages, setStages] = useState([]);
  const [tests, setTests] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [stagesRes, resourcesRes] = await Promise.all([
          getSSBStages(),
          getSSBResources(),
        ]);

        setStages(stagesRes.data || []);
        setResources(resourcesRes.data || []);

        // Fetch tests for all stages
        if (stagesRes.data && stagesRes.data.length > 0) {
          const testsPromises = stagesRes.data.map((stage) =>
            getSSBTestsByStage(stage.id).catch(() => ({ data: [] })),
          );
          const testsResults = await Promise.all(testsPromises);
          const allTests = testsResults.flatMap((res) => res.data || []);
          setTests(allTests);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-state">Loading SSB preparation material...</div>
    );
  }

  return (
    <div className="aspirant-container">
      <div className="page-header">
        <h2>SSB Preparation</h2>
        <p>Complete guide to crack the Services Selection Board interview</p>
      </div>

      {/* Tests Section */}
      {tests.length > 0 && (
        <div className="content-section">
          <h2>Psychological Tests & Assessments</h2>
          <div className="test-grid">
            {tests.map((t) => (
              <div key={t.id} className="test-card">
                <div className="test-header">
                  <h3>{t.testName}</h3>
                  <span className="test-stage">
                    {t.stage?.stageName || "SSB Stage"}
                  </span>
                </div>
                <p className="test-description">{t.description}</p>
                {t.tips && (
                  <div className="test-tips">
                    <strong>Tip:</strong> {t.tips}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources Section */}
      {resources.length > 0 && (
        <div className="content-section">
          <h2>Study Resources</h2>
          <div className="resource-grid">
            {resources.map((r) => (
              <div key={r.id} className="resource-card">
                <div className="resource-header">
                  <h3 className="resource-title">{r.title}</h3>
                  <span className="resource-type-badge">
                    {r.resourceType || "Resource"}
                  </span>
                </div>
                {r.description && (
                  <p className="resource-description">{r.description}</p>
                )}
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  Open Resource →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {tests.length === 0 && resources.length === 0 && (
        <div className="empty-state">
          <p>
            No content available. Check back later for SSB preparation
            materials.
          </p>
        </div>
      )}
    </div>
  );
}

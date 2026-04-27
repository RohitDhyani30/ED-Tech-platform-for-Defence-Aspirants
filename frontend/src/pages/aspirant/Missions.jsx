import { useEffect, useState } from "react";
import { getOperations } from "../../services/operationService";

export default function Missions() {
  const [missions, setMissions] = useState([]);
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const res = await getOperations();
        setMissions(res.data || []);
        setFilteredMissions(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMissions();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...missions];
    
    if (selectedYear !== "all") {
      filtered = filtered.filter(m => m.year === selectedYear);
    }
    
    if (showFeaturedOnly) {
      filtered = filtered.filter(m => m.featured);
    }
    
    setFilteredMissions(filtered);
  }, [selectedYear, showFeaturedOnly, missions]);

  // Get unique years for filter
  const years = [...new Set(missions.map(m => m.year))].sort();

  if (loading) return <div style={{ padding: 20 }}>Loading missions...</div>;

  return (
    <div>
      <h2>⚔️ Indian Military Operations</h2>
      <p>Browse through India's historic military operations and missions.</p>

      {/* Filters */}
      <div style={{ 
        display: "flex", 
        gap: 15, 
        margin: "20px 0", 
        padding: 15, 
        background: "#0c1320", 
        borderRadius: 8,
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        <div>
          <label style={{ marginRight: 8 }}>Year:</label>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{ padding: 6, background: "#060a0f", color: "#e8eaf0", border: "1px solid #333", borderRadius: 4 }}
          >
            <option value="all">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ marginRight: 8 }}>
            <input 
              type="checkbox" 
              checked={showFeaturedOnly} 
              onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              style={{ marginRight: 5 }}
            />
            Show Featured Only
          </label>
        </div>

        <div style={{ marginLeft: "auto", color: "#7a8a9a" }}>
          {filteredMissions.length} missions found
        </div>
      </div>

      {/* Missions Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: 20,
        marginTop: 20
      }}>
        {filteredMissions.map(mission => (
          <div 
            key={mission.id} 
            style={{
              background: "#0c1320",
              border: mission.featured ? "1px solid #d0a93f" : "1px solid #2a2a2a",
              borderRadius: 8,
              padding: 20,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onClick={() => setSelectedMission(mission)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ 
                background: mission.featured ? "#d0a93f20" : "#333",
                color: mission.featured ? "#d0a93f" : "#7a8a9a",
                padding: "4px 10px",
                borderRadius: 20,
                fontSize: "11px",
                fontWeight: "bold"
              }}>
                {mission.year}
              </span>
              {mission.featured && <span style={{ fontSize: 20 }}>⭐</span>}
            </div>
            
            <h3 style={{ margin: "10px 0", color: "#e8eaf0" }}>{mission.operationName}</h3>
            <p style={{ color: "#7a8a9a", fontSize: "14px", marginBottom: 10 }}>
              📍 {mission.location}
            </p>
            <p style={{ color: "#aaa", fontSize: "13px", lineHeight: 1.5 }}>
              {mission.objective?.substring(0, 120)}...
            </p>
            <div style={{ marginTop: 15, color: "#d0a93f", fontSize: "13px" }}>
              Click to read more →
            </div>
          </div>
        ))}
      </div>

      {filteredMissions.length === 0 && (
        <div style={{ textAlign: "center", padding: 50, color: "#7a8a9a" }}>
          No missions found for the selected filters.
        </div>
      )}

      {/* Modal for Mission Details */}
      {selectedMission && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
          onClick={() => setSelectedMission(null)}
        >
          <div 
            style={{
              background: "#0c1320",
              border: "1px solid #d0a93f",
              borderRadius: 12,
              padding: 30,
              maxWidth: 600,
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ color: "#d0a93f", fontSize: 14 }}>{selectedMission.year}</span>
              <button 
                onClick={() => setSelectedMission(null)}
                style={{ background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            
            <h2 style={{ marginBottom: 10 }}>{selectedMission.operationName}</h2>
            <p style={{ color: "#7a8a9a", marginBottom: 20 }}>📍 {selectedMission.location}</p>
            
            <h4 style={{ color: "#d0a93f", marginBottom: 10 }}>🎯 Objective</h4>
            <p style={{ lineHeight: 1.6, marginBottom: 20 }}>{selectedMission.objective}</p>
            
            <h4 style={{ color: "#d0a93f", marginBottom: 10 }}>🏆 Outcome</h4>
            <p style={{ lineHeight: 1.6 }}>{selectedMission.outcome}</p>
            
            {selectedMission.featured && (
              <div style={{ marginTop: 20, padding: 10, background: "#d0a93f10", borderRadius: 6, textAlign: "center" }}>
                ⭐ Featured Operation
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
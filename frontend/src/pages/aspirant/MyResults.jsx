import { useEffect, useState } from "react";
import { getMyAttempts } from "../../services/examService";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function MyResults() {
  const [attempts, setAttempts] = useState([]);
  const [filteredAttempts, setFilteredAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getMyAttempts();
        setAttempts(res.data || []);
        setFilteredAttempts(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...attempts];

    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.test?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter === "pass") {
      filtered = filtered.filter(a => (a.percentage || 0) >= 40);
    } else if (statusFilter === "fail") {
      filtered = filtered.filter(a => (a.percentage || 0) < 40);
    }

    if (dateFrom) {
      filtered = filtered.filter(a => 
        a.completedAt && new Date(a.completedAt) >= new Date(dateFrom)
      );
    }
    if (dateTo) {
      filtered = filtered.filter(a => 
        a.completedAt && new Date(a.completedAt) <= new Date(dateTo)
      );
    }

    setFilteredAttempts(filtered);
  }, [searchTerm, statusFilter, dateFrom, dateTo, attempts]);

  const exportToPDF = (attempt) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Test Result", 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Test: ${attempt.test?.title || "Unknown Test"}`, 14, 40);
    doc.text(`Date: ${attempt.completedAt ? new Date(attempt.completedAt).toLocaleString() : "--"}`, 14, 50);
    doc.text(`Score: ${attempt.score} / ${attempt.test?.totalMarks || 0}`, 14, 60);
    doc.text(`Percentage: ${attempt.percentage}%`, 14, 70);
    doc.text(`Status: ${(attempt.percentage || 0) >= 40 ? "PASSED" : "FAILED"}`, 14, 80);
    
    doc.save(`test_result_${attempt.test?.title || "attempt"}_${attempt.id}.pdf`);
  };

  const exportAllToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("All Test Results", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    const tableData = filteredAttempts.map((a, idx) => [
      idx + 1,
      a.test?.title || "Unknown",
      a.completedAt ? new Date(a.completedAt).toLocaleDateString() : "--",
      `${a.score}/${a.test?.totalMarks || 0}`,
      `${a.percentage}%`,
      (a.percentage || 0) >= 40 ? "Pass" : "Fail"
    ]);
    
    doc.autoTable({
      startY: 40,
      head: [["#", "Test Name", "Date", "Score", "Percentage", "Status"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [208, 169, 63] },
    });
    
    doc.save("all_my_results.pdf");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  if (loading) return <div style={{ padding: 20 }}>Loading results...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>My Test Results</h2>
        {filteredAttempts.length > 0 && (
          <button 
            onClick={exportAllToPDF}
            style={{
              padding: "8px 16px",
              background: "#d0a93f",
              color: "#0a0f1c",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Export All to PDF
          </button>
        )}
      </div>

      {/* Filters Section */}
      <div style={{
        background: "#0c1320",
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
        border: "1px solid #2a2a2a"
      }}>
        <h3 style={{ marginBottom: 15, color: "#d0a93f" }}>Filter Results</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 15
        }}>
          <div>
            <label style={{ display: "block", marginBottom: 5, fontSize: 12, color: "#7a8a9a" }}>Search Test Name</label>
            <input
              type="text"
              placeholder="Enter test name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                background: "#060a0f",
                border: "1px solid #333",
                color: "#e8eaf0",
                borderRadius: 4
              }}
            />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: 5, fontSize: 12, color: "#7a8a9a" }}>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                background: "#060a0f",
                border: "1px solid #333",
                color: "#e8eaf0",
                borderRadius: 4
              }}
            >
              <option value="all">All</option>
              <option value="pass">Passed Only</option>
              <option value="fail">Failed Only</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: 5, fontSize: 12, color: "#7a8a9a" }}>From Date</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                background: "#060a0f",
                border: "1px solid #333",
                color: "#e8eaf0",
                borderRadius: 4
              }}
            />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: 5, fontSize: 12, color: "#7a8a9a" }}>To Date</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                background: "#060a0f",
                border: "1px solid #333",
                color: "#e8eaf0",
                borderRadius: 4
              }}
            />
          </div>
        </div>
        
        <div style={{ marginTop: 15, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={clearFilters}
            style={{
              padding: "6px 12px",
              background: "#333",
              color: "#e8eaf0",
              border: "none",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            Clear Filters
          </button>
          <span style={{ color: "#7a8a9a", fontSize: 14 }}>
            {filteredAttempts.length} of {attempts.length} results shown
          </span>
        </div>
      </div>

      {/* Results Table */}
      {filteredAttempts.length === 0 ? (
        <div style={{ textAlign: "center", padding: 50, background: "#0c1320", borderRadius: 8 }}>
          <p>No test results found matching your filters.</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#0c1320",
            borderRadius: 8,
            overflow: "hidden"
          }}>
            <thead>
              <tr style={{ background: "#060a0f" }}>
                <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid #333", color: "#d0a93f" }}>Test Name</th>
                <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid #333", color: "#d0a93f" }}>Score</th>
                <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid #333", color: "#d0a93f" }}>Percentage</th>
                <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid #333", color: "#d0a93f" }}>Status</th>
                <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid #333", color: "#d0a93f" }}>Date</th>
                <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid #333", color: "#d0a93f" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttempts.map(attempt => (
                <tr key={attempt.id} style={{ borderBottom: "1px solid #2a2a2a" }}>
                  <td style={{ padding: 12 }}>{attempt.test?.title || "Unknown Test"}</td>
                  <td style={{ padding: 12 }}>{attempt.score} / {attempt.test?.totalMarks || 0}</td>
                  <td style={{ padding: 12 }}>{attempt.percentage}%</td>
                  <td style={{ padding: 12 }}>
                    <span style={{
                      color: (attempt.percentage || 0) >= 40 ? "#4caf50" : "#f44336",
                      fontWeight: "bold"
                    }}>
                      {(attempt.percentage || 0) >= 40 ? "PASSED" : "FAILED"}
                    </span>
                  </td>
                  <td style={{ padding: 12 }}>{attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString() : "--"}</td>
                  <td style={{ padding: 12 }}>
                    <button
                      onClick={() => exportToPDF(attempt)}
                      style={{
                        padding: "4px 10px",
                        background: "#d0a93f",
                        color: "#0a0f1c",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer"
                      }}
                    >
                      Export PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
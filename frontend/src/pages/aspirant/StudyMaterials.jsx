import { useEffect, useState } from "react";
import { getSubjects, getStudyResources } from "../../services/ndaService";

export default function StudyMaterials() {
  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, resRes] = await Promise.all([
          getSubjects(),
          getStudyResources(),
        ]);
        setSubjects(subRes.data || []);
        setResources(resRes.data || []);
        setFilteredResources(resRes.data || []);

        // Debug: Log sample resource structure
        if (resRes.data && resRes.data.length > 0) {
          console.log("Sample resource:", resRes.data[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...resources];

    // Subject filter - Working version
    if (selectedSubject !== "all") {
      const subjectId = parseInt(selectedSubject);
      filtered = filtered.filter((resource) => {
        // Try multiple possible structures
        if (resource.subject?.id === subjectId) return true;
        if (resource.subjectId === subjectId) return true;
        if (resource.subject?.subjectId === subjectId) return true;
        return false;
      });
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(
        (resource) => resource.resourceType === selectedType,
      );
    }

    // Search filter - case insensitive
    if (searchTerm && searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (resource) =>
          resource.title?.toLowerCase().includes(lowerSearch) ||
          resource.description?.toLowerCase().includes(lowerSearch),
      );
    }

    setFilteredResources(filtered);
  }, [selectedSubject, selectedType, searchTerm, resources]);

  const resourceTypes = [
    "PDF",
    "Video",
    "Website",
    "Document",
    "E-Book",
    "Lecture Notes",
  ];

  if (loading) return <div className="loading-state">Loading resources...</div>;

  return (
    <div className="aspirant-container">
      <div className="page-header">
        <h2>Study Materials</h2>
        <p>Comprehensive resources for NDA, CDS, and AFCAT preparation</p>
      </div>

      {/* Filters Section */}
      <div className="filters-bar">
        <div className="filter-grid">
          <div className="filter-item">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <label>Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label>Resource Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              {resourceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="filter-actions">
          <span className="filter-count">
            {filteredResources.length} resources found
          </span>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="resource-grid">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <div className="resource-header">
              <h3 className="resource-title">{resource.title}</h3>
              <span className="resource-type-badge">
                {resource.resourceType || "Resource"}
              </span>
            </div>

            {resource.description && (
              <p className="resource-description">{resource.description}</p>
            )}

            <div className="resource-meta">
              <div className="meta-item">
                <span className="meta-label">Subject</span>
                <span className="meta-value">
                  {resource.subjectName || resource.subject?.name || "General"}
                </span>
              </div>
            </div>

            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              Open Resource →
            </a>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="empty-state">
          <p>No resources found matching your filters.</p>
        </div>
      )}
    </div>
  );
}

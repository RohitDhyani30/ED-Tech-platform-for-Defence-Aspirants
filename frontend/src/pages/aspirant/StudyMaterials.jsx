import { useEffect, useState } from "react";
import { getSubjects, getStudyResources } from "../../services/ndaService";

export default function StudyMaterials() {
  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, resRes] = await Promise.all([
          getSubjects(),
          getStudyResources()
        ]);
        setSubjects(subRes.data || []);
        setResources(resRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredResources = selectedSubject === "all" 
    ? resources 
    : resources.filter(r => r.subject?.id === parseInt(selectedSubject));

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Study Materials</h2>
      
      <select onChange={(e) => setSelectedSubject(e.target.value)} style={{ padding: 8, marginBottom: 20 }}>
        <option value="all">All Subjects</option>
        {subjects.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      {filteredResources.map(r => (
        <div key={r.id} style={{ border: "1px solid #333", margin: 10, padding: 15, borderRadius: 8 }}>
          <h3>{r.title}</h3>
          <p>{r.description}</p>
          <p>Subject: {r.subjectName || r.subject?.name}</p>
          <p>Type: {r.resourceType}</p>
          <a href={r.url} target="_blank" rel="noopener noreferrer">Open Resource →</a>
        </div>
      ))}
    </div>
  );
}
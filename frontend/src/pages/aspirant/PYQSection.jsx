import { useEffect, useState } from "react";
import { getPYQs, getSubjects } from "../../services/ndaService";

export default function PYQSection() {
  const [pyqs, setPyqs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pyqRes, subRes] = await Promise.all([
          getPYQs(),
          getSubjects()
        ]);
        setPyqs(pyqRes.data || []);
        setSubjects(subRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const filtered = selectedSubject === "all" 
    ? pyqs 
    : pyqs.filter(p => p.subject?.id === parseInt(selectedSubject));

  return (
    <div>
      <h2>PYQ Papers (Past Year Questions)</h2>
      
      <select onChange={(e) => setSelectedSubject(e.target.value)} style={{ padding: 8, marginBottom: 20 }}>
        <option value="all">All Subjects</option>
        {subjects.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      {filtered.map(p => (
        <div key={p.id} style={{ border: "1px solid #333", margin: 10, padding: 15 }}>
          <h3>{p.year} - {p.session}</h3>
          <p>Subject: {p.subjectName || p.subject?.name}</p>
          <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer">📄 Download PDF</a>
        </div>
      ))}
    </div>
  );
}
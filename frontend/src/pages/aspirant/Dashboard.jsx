import { useEffect, useState } from "react";
import { getStudyResources } from "../../services/ndaService";

export default function Dashboard() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await getStudyResources();
        setResources(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResources();
  }, []);

  return (
    <div style={{ border: "1px solid white", padding: "20px" }}>
      <h2>Study Resources</h2>

      {resources.map((r) => (
        <div key={r.id} style={{ border: "1px solid gray", margin: "10px" }}>
          {r.title}
        </div>
      ))}
    </div>
  );
}
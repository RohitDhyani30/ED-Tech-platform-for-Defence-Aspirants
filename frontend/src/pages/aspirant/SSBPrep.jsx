import { useEffect, useState } from "react";
import { getSSBStages, getSSBTestsByStage } from "../../services/ssbService";

export default function SSBPrep() {
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const res = await getSSBStages();
        setStages(res.data || []);
        if (res.data?.length) {
          setSelectedStage(res.data[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStages();
  }, []);

  useEffect(() => {
    if (!selectedStage) return;
    const fetchTests = async () => {
      try {
        const res = await getSSBTestsByStage(selectedStage);
        setTests(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTests();
  }, [selectedStage]);

  return (
    <div>
      <h2>SSB Preparation</h2>
      
      <select onChange={(e) => setSelectedStage(e.target.value)} style={{ padding: 8, marginBottom: 20 }}>
        {stages.map(s => (
          <option key={s.id} value={s.id}>{s.stageName}</option>
        ))}
      </select>

      {tests.map(t => (
        <div key={t.id} style={{ border: "1px solid #333", margin: 10, padding: 15 }}>
          <h3>{t.testName}</h3>
          <p>{t.description}</p>
          <p><strong>Tips:</strong> {t.tips}</p>
        </div>
      ))}
    </div>
  );
}
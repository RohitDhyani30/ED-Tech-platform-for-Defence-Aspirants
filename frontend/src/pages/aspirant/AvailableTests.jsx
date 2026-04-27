import { useEffect, useState } from "react";
import { getAllTests } from "../../services/examService";
import { useNavigate } from "react-router-dom";

export default function AvailableTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await getAllTests();
        setTests(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const startTest = (testId) => {
    navigate(`/take-test/${testId}`);
  };

  if (loading) return <div>Loading tests...</div>;

  return (
    <div>
      <h2>Available Tests</h2>
      {tests.map(t => (
        <div key={t.id} style={{ border: "1px solid #333", margin: 10, padding: 15, borderRadius: 8 }}>
          <h3>{t.title}</h3>
          <p>{t.description}</p>
          <p>Duration: {t.durationMinutes} minutes</p>
          <p>Questions: {t.questions?.length || 0}</p>
          <p>Total Marks: {t.totalMarks}</p>
          <button onClick={() => startTest(t.id)}>Start Test</button>
        </div>
      ))}
    </div>
  );
}
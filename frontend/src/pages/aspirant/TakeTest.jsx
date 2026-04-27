import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTestById, startAttempt, submitAttempt } from "../../services/examService";

export default function TakeTest() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadTest = async () => {
      try {
        const res = await getTestById(testId);
        setTest(res.data);
        setTimeLeft(res.data.durationMinutes * 60);
        
        const attemptRes = await startAttempt(testId);
        setAttemptId(attemptRes.data.id);
      } catch (err) {
        console.error(err);
        navigate("/available-tests");
      }
    };
    loadTest();
  }, [testId, navigate]);

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (!window.confirm("Submit test?")) return;
    try {
      await submitAttempt(attemptId, answers);
      setSubmitted(true);
      alert("Test submitted! View results in My Results.");
      navigate("/my-results");
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
  };

  if (!test) return <div>Loading test...</div>;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <h2>{test.title}</h2>
      <div style={{ background: "#333", padding: 10, marginBottom: 20 }}>
        Time Left: {minutes}:{seconds < 10 ? "0" + seconds : seconds}
      </div>

      {test.questions?.map((q, idx) => (
        <div key={q.id} style={{ border: "1px solid #555", margin: 15, padding: 15 }}>
          <p><strong>Q{idx + 1}. {q.text}</strong></p>
          <div>
            <label><input type="radio" name={q.id} value="A" onChange={() => handleAnswer(q.id, "A")} /> A. {q.optionA}</label><br/>
            <label><input type="radio" name={q.id} value="B" onChange={() => handleAnswer(q.id, "B")} /> B. {q.optionB}</label><br/>
            <label><input type="radio" name={q.id} value="C" onChange={() => handleAnswer(q.id, "C")} /> C. {q.optionC}</label><br/>
            <label><input type="radio" name={q.id} value="D" onChange={() => handleAnswer(q.id, "D")} /> D. {q.optionD}</label>
          </div>
        </div>
      ))}

      <button onClick={handleSubmit} style={{ padding: 10, marginTop: 20 }}>Submit Test</button>
    </div>
  );
}
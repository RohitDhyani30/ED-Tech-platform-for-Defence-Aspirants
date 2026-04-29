import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTestById,
  startAttempt,
  submitAttempt,
} from "../../services/examService";

export default function TakeTest() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Guard to prevent double-invocation (React StrictMode fires effects twice in dev)
  const attemptStarted = useRef(false);

  useEffect(() => {
    if (attemptStarted.current) return; // already started — skip duplicate call
    attemptStarted.current = true;

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
  }, [testId]); // removed navigate from deps — it never changes and adding it could cause re-run

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && !submitted && attemptId) {
      autoSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const autoSubmit = async () => {
    if (submitting || submitted) return;
    setSubmitting(true);
    try {
      await submitAttempt(attemptId, answers);
      setSubmitted(true);
      alert("Time up! Test submitted. View results in My Results.");
      navigate("/my-results");
    } catch (err) {
      console.error(err);
      alert("Auto-submit failed. Please try submitting manually.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (submitting || submitted) return;
    if (!window.confirm("Submit test?")) return;
    setSubmitting(true);
    try {
      await submitAttempt(attemptId, answers);
      setSubmitted(true);
      alert("Test submitted! View results in My Results.");
      navigate("/my-results");
    } catch (err) {
      console.error(err);
      alert("Submit failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!test) return <div className="loading-state">Loading test...</div>;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="test-container">
      <div className="test-timer">
        <h2>{test.title}</h2>
        <div className="timer">
          {minutes}:{seconds < 10 ? "0" + seconds : seconds}
        </div>
      </div>

      {test.questions?.map((q, idx) => (
        <div key={q.id} className="question-card">
          <div className="question-text">
            Q{idx + 1}. {q.text}
          </div>
          <div className="options">
            <label className="option">
              <input
                type="radio"
                name={q.id}
                value="A"
                onChange={() => handleAnswer(q.id, "A")}
              />
              <span>A. {q.optionA}</span>
            </label>
            <label className="option">
              <input
                type="radio"
                name={q.id}
                value="B"
                onChange={() => handleAnswer(q.id, "B")}
              />
              <span>B. {q.optionB}</span>
            </label>
            <label className="option">
              <input
                type="radio"
                name={q.id}
                value="C"
                onChange={() => handleAnswer(q.id, "C")}
              />
              <span>C. {q.optionC}</span>
            </label>
            <label className="option">
              <input
                type="radio"
                name={q.id}
                value="D"
                onChange={() => handleAnswer(q.id, "D")}
              />
              <span>D. {q.optionD}</span>
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="btn-primary btn-full btn-large"
        disabled={submitting || submitted}
      >
        {submitting ? "Submitting..." : "Submit Test"}
      </button>
    </div>
  );
}

import { useState } from "react";
import "../style/QuestionArsenal.css";

export default function QuestionArsenal() {
  const [question, setQuestion] = useState("");

  const handleAdd = () => {
    alert("Question Added ");
    setQuestion("");
  };

  return (
    <div className="qa-container">
      <h2>Question Arsenal</h2>

      <textarea
        placeholder="Enter question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={handleAdd}>Add Question</button>
    </div>
  );
}
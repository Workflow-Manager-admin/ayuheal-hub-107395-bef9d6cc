import React, { useState } from "react";
import Button from "../components/Button";
import DoshaResult from "../components/DoshaResult";
import doshaQuestions from "../assets/doshaQuiz.json"; // Placeholder/dummy questions

// PUBLIC_INTERFACE
function DoshaQuiz() {
  // Demo quiz logic: stepping through quiz questions
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const handleSelect = idx => {
    setAnswers([...answers, idx]);
    if (step < doshaQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  if (done) {
    // Demo result: just choose first dosha, real logic calculates from answers
    return <DoshaResult dosha="Vata" />;
  }

  const q = doshaQuestions[step];
  return (
    <div className="ayu-quiz-page">
      <h1>Dosha Quiz</h1>
      <div className="ayu-quiz-question">
        <p><strong>Step {step + 1} of {doshaQuestions.length}</strong></p>
        <h2>{q.question}</h2>
        <div className="ayu-quiz-options">
          {q.options.map((text, idx) => (
            <Button key={idx} onClick={() => handleSelect(idx)}>{text}</Button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DoshaQuiz;

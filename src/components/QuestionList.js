import React, { useState,useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions,setQuestions] = useState([])

  useEffect(()=> {
    fetch('http://localhost:4000/questions')
    .then(response => response.json())
    .then(questions => setQuestions(questions))
  },[])
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        setQuestions(questions.filter((q) => q.id !== id));
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then(updatedQuestion => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === id) {
            return updatedQuestion;
          }
          return q;
        })
        setQuestions(updatedQuestion);
      })
  }
  

  const questionItems = questions.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;

import React, { useState } from "react";
import { motion } from "framer-motion";

// Simple UI components
const Button = ({ className = "", children, ...props }) => (
  <button
    className={`px-4 py-2 rounded-2xl shadow hover:shadow-md transition font-medium ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-2xl shadow p-5 bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Example flashcard
const Flashcard = ({ item }) => {
  const [flip, setFlip] = useState(false);
  return (
    <div
      onClick={() => setFlip(!flip)}
      className="cursor-pointer p-4 rounded-2xl border text-center hover:shadow"
    >
      <div className="text-sm text-zinc-500">{flip ? "English" : "Français"}</div>
      <div className="mt-1 text-xl font-semibold">{flip ? item.en : item.fr}</div>
    </div>
  );
};

// Quiz component
const Quiz = ({ quiz }) => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  if (!quiz) return null;
  const current = quiz.questions[step];

  const handleAnswer = (i) => {
    if (i === current.answer) setScore(score + 1);
    if (step < quiz.questions.length - 1) setStep(step + 1);
    else alert(`Your score: ${score + (i === current.answer ? 1 : 0)} / ${quiz.questions.length}`);
  };

  return (
    <Card>
      <h4 className="font-semibold mb-2">Quiz</h4>
      <p>{current.q}</p>
      {current.options.map((opt, i) => (
        <Button
          key={i}
          className="mt-2 bg-zinc-100 dark:bg-zinc-800"
          onClick={() => handleAnswer(i)}
        >
          {opt}
        </Button>
      ))}
    </Card>
  );
};

// Full Curriculum
const CURRICULUM = {
  title: "Studio 1 – Module 1: C’est perso",
  lessons: [
    {
      id: "u1",
      title: "Unité 1 – Mon autoportrait",
      goals: ["Talk about likes/dislikes", "Use regular –er verbs", "Use definite article"],
      vocab: [
        { fr: "J’aime …", en: "I like …" },
        { fr: "Je n’aime pas …", en: "I don’t like …" },
        { fr: "Tu aimes …?", en: "Do you like …?" },
      ],
      quiz: {
        questions: [
          { q: "‘I don’t like’ is…", options: ["J’aime", "Je n’aime pas", "Tu aimes"], answer: 1 },
        ],
      },
    },
    {
      id: "u2",
      title: "Unité 2 – Mon kit de survie",
      goals: ["Talk about survival kit", "Use avoir", "Use un/une/des"],
      vocab: [
        { fr: "un portable", en: "a mobile phone" },
        { fr: "une gourde", en: "a water bottle" },
      ],
      quiz: {
        questions: [
          { q: "Translate ‘une trousse’", options: ["a pencil case", "a phone", "a bottle"], answer: 0 },
        ],
      },
    },
    {
      id: "u3",
      title: "Unité 3 – Mon caractère",
      goals: ["Talk about personality", "Use adjectives", "Understand agreements"],
      vocab: [
        { fr: "je suis sympa", en: "I am nice" },
        { fr: "il est timide", en: "he is shy" },
      ],
      quiz: {
        questions: [
          { q: "Translate ‘je suis bavard(e)’", options: ["I am chatty", "I am tall", "I am happy"], answer: 0 },
        ],
      },
    },
    {
      id: "u4",
      title: "Unité 4 – Ma famille",
      goals: ["Talk about family", "Use possessive adjectives"],
      vocab: [
        { fr: "ma mère", en: "my mother" },
        { fr: "mon père", en: "my father" },
        { fr: "mes frères", en: "my brothers" },
      ],
      quiz: {
        questions: [
          { q: "Translate ‘mon frère’", options: ["my brother", "my sister", "my dad"], answer: 0 },
        ],
      },
    },
    {
      id: "u5",
      title: "Unité 5 – Les animaux",
      goals: ["Talk about pets", "Use plural nouns"],
      vocab: [
        { fr: "un chien", en: "a dog" },
        { fr: "un chat", en: "a cat" },
        { fr: "des poissons", en: "fish" },
      ],
      quiz: {
        questions: [
          { q: "Translate ‘un lapin’", options: ["a rabbit", "a cat", "a bird"], answer: 0 },
        ],
      },
    },
    {
      id: "u6",
      title: "Unité 6 – Mon anniversaire",
      goals: ["Talk about birthday", "Say dates", "Use avoir for age"],
      vocab: [
        { fr: "mon anniversaire", en: "my birthday" },
        { fr: "J’ai 12 ans", en: "I am 12 years old" },
      ],
      quiz: {
        questions: [
          { q: "Translate ‘J’ai 13 ans’", options: ["I am 13 years old", "My birthday is", "I am tired"], answer: 0 },
        ],
      },
    },
  ],
};

// Main App
export default function App() {
  const [activeLesson, setActiveLesson] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 p-6">
      <h1 className="text-3xl font-bold mb-4">French Learning Hub</h1>
      {!activeLesson ? (
        <div className="grid gap-4">
          {CURRICULUM.lessons.map((lesson) => (
            <Card key={lesson.id} onClick={() => setActiveLesson(lesson)} className="cursor-pointer">
              <h2 className="font-semibold">{lesson.title}</h2>
              <ul className="list-disc pl-5 text-sm mt-2">
                {lesson.goals.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Button className="mb-4 bg-indigo-600 text-white" onClick={() => setActiveLesson(null)}>
            ← Back
          </Button>
          <h2 className="text-2xl font-bold mb-2">{activeLesson.title}</h2>
          <h3 className="font-semibold">Goals</h3>
          <ul className="list-disc pl-5 text-sm mb-4">
            {activeLesson.goals.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
          <h3 className="font-semibold">Flashcards</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {activeLesson.vocab.map((item, idx) => <Flashcard key={idx} item={item} />)}
          </div>
          <Quiz quiz={activeLesson.quiz} />
        </div>
      )}
    </div>
  );
}

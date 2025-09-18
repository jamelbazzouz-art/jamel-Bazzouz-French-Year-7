import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Headphones,
  Home,
  ListChecks,
  MessageSquareText,
  NotebookPen,
  Search,
  Settings,
  Sun,
  Moon,
  Trophy,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Download,
} from "lucide-react";

// -------- Simple UI components --------
const Button = ({ className = "", children, ...props }) => (
  <button
    className={`px-4 py-2 rounded-2xl shadow hover:shadow-md transition font-medium ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ className = "", children }) => (
  <div
    className={`rounded-2xl shadow p-5 bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 ${className}`}
  >
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-indigo-400 ${className}`}
    {...props}
  />
);

// -------- Example Lesson Data --------
const CURRICULUM = {
  title: "Studio 1 – Module 1: C’est perso",
  lessons: [
    {
      id: "u1",
      title: "Unité 1 – Mon autoportrait",
      goals: ["Talk about likes and dislikes", "Use regular –er verbs", "Use the definite article"],
      vocab: [
        { fr: "J’aime …", en: "I like …" },
        { fr: "Je n’aime pas …", en: "I don’t like …" },
        { fr: "Tu aimes …?", en: "Do you like …?" },
      ],
      grammar: {
        title: "–er verbs (singular)",
        notes: ["Je, tu, il/elle forms", "Use le, la, les before nouns"],
        examples: [
          { fr: "J’aime le cinéma.", en: "I like the cinema." },
          { fr: "Elle n’aime pas les araignées.", en: "She doesn’t like spiders." },
        ],
      },
      quiz: {
        questions: [
          { q: "Choose the correct article: ___ sport", options: ["le", "la", "les"], answer: 0 },
          { q: "‘I don’t like’ is…", options: ["J’aime", "Je n’aime pas", "Tu aimes"], answer: 1 },
        ],
      },
    },
  ],
};

// -------- Components --------
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

const GrammarBlock = ({ grammar }) => (
  <Card>
    <h4 className="font-semibold mb-2">{grammar.title}</h4>
    <ul className="list-disc pl-5 text-sm space-y-1">
      {grammar.notes.map((n, i) => <li key={i}>{n}</li>)}
    </ul>
    <div className="mt-3">
      {grammar.examples.map((ex, i) => (
        <div key={i} className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl mt-1">
          <b>{ex.fr}</b> — {ex.en}
        </div>
      ))}
    </div>
  </Card>
);

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

// -------- Main App --------
export default function App() {
  const [activeLesson, setActiveLesson] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-50 p-6">
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
          <GrammarBlock grammar={activeLesson.grammar} />
          <Quiz quiz={activeLesson.quiz} />
        </div>
      )}
    </div>
  );
}


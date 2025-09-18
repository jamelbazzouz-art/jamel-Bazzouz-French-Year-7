import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom";

/* ---------- Tiny UI helpers ---------- */
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
    className={`rounded-2xl shadow p-5 bg-white/90 border border-zinc-200 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className={`w-full px-3 py-2 rounded-xl border border-zinc-300 outline-none focus:ring-2 focus:ring-indigo-400 ${props.className || ""}`}
  />
);

/* ---------- Navigation & Layout ---------- */
function Nav() {
  const link =
    "px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/40 transition";
  const active =
    "bg-white/70 text-indigo-700 border border-indigo-200 hover:bg-white";

  return (
    <div className="sticky top-0 z-30 backdrop-blur bg-gradient-to-r from-[#002395]/20 via-white/40 to-[#ED2939]/20 border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <img src="/images/flag.png" alt="France flag" width="24" height="24" onError={(e)=>{e.currentTarget.style.display='none'}}/>
        <span className="font-bold">French Learning Hub</span>
        <div className="ml-auto flex gap-2">
          <NavLink to="/" end className={({isActive}) => `${link} ${isActive ? active : ""}`}>Home</NavLink>
          <NavLink to="/lessons" className={({isActive}) => `${link} ${isActive ? active : ""}`}>Lessons</NavLink>
          <NavLink to="/culture" className={({isActive}) => `${link} ${isActive ? active : ""}`}>About France</NavLink>
          <NavLink to="/gallery" className={({isActive}) => `${link} ${isActive ? active : ""}`}>Gallery</NavLink>
        </div>
      </div>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen text-zinc-900"
         style={{background: "linear-gradient(180deg, #f8fafc 0%, #fff 40%, #f1f5f9 100%)"}}>
      <Nav />
      <main className="max-w-6xl mx-auto px-4 pb-10">{children}</main>
      <footer className="text-center text-sm text-zinc-500 py-8">
        🇫🇷 Built with ❤️ — Year 7 French
      </footer>
    </div>
  );
}

/* ---------- Data (6 lessons) ---------- */
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
        { fr: "Il/Elle aime …", en: "He/She likes …" },
        { fr: "le cinéma", en: "cinema" },
        { fr: "les araignées", en: "spiders" }
      ],
      grammar: {
        title: "–er verbs (singular) & articles",
        notes: ["Je/tu/il/elle forms", "Use le, la, l’, les before nouns"],
        examples: [
          { fr: "J’aime le cinéma.", en: "I like the cinema." },
          { fr: "Elle n’aime pas les araignées.", en: "She doesn’t like spiders." }
        ]
      },
      quiz: {
        questions: [
          { q: "‘I don’t like’ is…", options: ["J’aime", "Je n’aime pas", "Tu aimes"], answer: 1 },
          { q: "Article for ‘___ sport’?", options: ["le", "la", "les"], answer: 0 }
        ]
      }
    },
    {
      id: "u2",
      title: "Unité 2 – Mon kit de survie",
      goals: ["Talk about your kit", "Use avoir (j’ai/tu as/il a)", "negation with de"],
      vocab: [
        { fr: "J’ai …", en: "I have …" },
        { fr: "Je n’ai pas de …", en: "I don’t have any …" },
        { fr: "une trousse", en: "a pencil case" },
        { fr: "un portable", en: "a mobile phone" },
        { fr: "une clé USB", en: "a USB stick" }
      ],
      grammar: {
        title: "Avoir + negation",
        notes: ["j’ai / tu as / il/elle a", "Je n’ai pas de … (+ noun)"],
        examples: [
          { fr: "Qu’est-ce que tu as?", en: "What do you have?" },
          { fr: "Je n’ai pas de clé USB.", en: "I don’t have a USB stick." }
        ]
      },
      quiz: {
        questions: [
          { q: "Complete: Tu ___ un portable.", options: ["ai", "as", "a"], answer: 1 },
          { q: "Negation uses …", options: ["ne … pas", "toujours", "très"], answer: 0 }
        ]
      }
    },
    {
      id: "u3",
      title: "Unité 3 – Comment je me vois",
      goals: ["Describe personality", "Adjective agreement (sing.)", "Être (je suis/tu es/il est)"],
      vocab: [
        { fr: "Je suis …", en: "I am …" },
        { fr: "gentil/le", en: "kind" },
        { fr: "drôle", en: "funny" },
        { fr: "curieux/curieuse", en: "curious" }
      ],
      grammar: {
        title: "Adjective agreement & être",
        notes: ["Add -e for many feminine forms", "je suis / tu es / il/elle est"],
        examples: [
          { fr: "Je suis curieuse.", en: "I am curious (f.)" },
          { fr: "Il est gentil.", en: "He is kind." }
        ]
      },
      quiz: {
        questions: [
          { q: "Feminine of ‘généreux’?", options: ["généreuse", "généreuses", "généreuxe"], answer: 0 },
          { q: "Être: Tu …", options: ["es", "est", "suis"], answer: 0 }
        ]
      }
    },
    {
      id: "u4",
      title: "Unité 4 – Et les autres?",
      goals: ["Talk about others (appearance/character)", "Plural agreement", "Possessives"],
      vocab: [
        { fr: "Il/Elle a …", en: "He/She has …" },
        { fr: "les yeux verts", en: "green eyes" },
        { fr: "les cheveux longs", en: "long hair" },
        { fr: "grand(e)/petit(e)", en: "tall/short" }
      ],
      grammar: {
        title: "Plural & possessives",
        notes: ["add -s for plurals", "mon/ma/mes; ton/ta/tes"],
        examples: [
          { fr: "Elle a les yeux verts.", en: "She has green eyes." },
          { fr: "Mes amis sont drôles.", en: "My friends are funny." }
        ]
      },
      quiz: {
        questions: [
          { q: "Correct possessive for (my) yeux?", options: ["mon", "ma", "mes"], answer: 2 },
          { q: "Plural of ‘petit’?", options: ["petits", "petites", "petit"], answer: 0 }
        ]
      }
    },
    {
      id: "u5",
      title: "Unité 5 – Il/Elle est hypercool!",
      goals: ["Describe a musician", "Present tense recap (aimer/être/avoir)"],
      vocab: [
        { fr: "Il/Elle s’appelle …", en: "His/Her name is …" },
        { fr: "Il/Elle aime …", en: "He/She likes …" },
        { fr: "Il/Elle a …", en: "He/She has …" }
      ],
      grammar: {
        title: "Present recap",
        notes: ["aimer, s’appeler, être, avoir (sing.)", "build longer descriptions"],
        examples: [
          { fr: "Il est grand et il aime le rap.", en: "He is tall and likes rap." },
          { fr: "Elle a les cheveux longs.", en: "She has long hair." }
        ]
      },
      quiz: {
        questions: [
          { q: "‘Her name is’ → Elle …", options: ["m’appelle", "t’appelles", "s’appelle"], answer: 2 },
          { q: "Correct: Il a les yeux …", options: ["verte", "verts", "le verts"], answer: 1 }
        ]
      }
    },
    {
      id: "u6",
      title: "En plus – C’est moi!",
      goals: ["Introduce yourself in detail", "Write a short presentation"],
      vocab: [
        { fr: "Je m’appelle …", en: "My name is …" },
        { fr: "J’ai … ans", en: "I am … years old" },
        { fr: "J’habite à …", en: "I live in …" }
      ],
      grammar: {
        title: "Bring it all together",
        notes: ["Recycle vocab & tenses from the module"],
        examples: [{ fr: "Je m’appelle Alex et j’ai 12 ans.", en: "My name is Alex and I’m 12." }]
      },
      quiz: {
        questions: [
          { q: "‘I live in’ is …", options: ["Je suis", "J’habite à", "Je vais"], answer: 1 }
        ]
      }
    }
  ]
};

/* ---------- Pages ---------- */
function Home() {
  const navigate = useNavigate();
  return (
    <div className="mt-6 grid md:grid-cols-2 gap-6 items-stretch">
      <Card className="relative overflow-hidden">
        {/* Hero with Eiffel background (from /public/images/eiffel.jpg) */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url('/images/eiffel.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(1.1) brightness(0.9)"
          }}
          onError={(e)=>{e.currentTarget.style.background='linear-gradient(45deg,#002395,#ED2939)'}}
        />
        <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-5">
          <h2 className="text-2xl font-extrabold">
            Bienvenue! Learn French with colour & culture
          </h2>
          <p className="mt-2 text-zinc-700">
            Explore interactive lessons, flashcards, quizzes, and worksheets. Discover France’s icons like the Eiffel Tower and more.
          </p>
          <div className="mt-4 flex gap-2">
            <Button className="bg-indigo-600 text-white" onClick={() => navigate("/lessons")}>
              Start Lessons
            </Button>
            <Button className="bg-white border" onClick={() => navigate("/culture")}>
              About France
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold">What’s inside</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>6 lessons from <i>Studio 1 – C’est perso</i></li>
          <li>Tap-to-flip flashcards (FR ↔ EN)</li>
          <li>Quick quizzes and downloadable worksheets</li>
          <li>New pages: <b>Lessons</b>, <b>About France</b>, and a <b>Gallery</b></li>
        </ul>
        <img
          src="/images/croissant.png"
          alt="Croissant"
          className="mt-4 w-24 h-24 object-contain"
          onError={(e)=>{e.currentTarget.style.display='none'}}
        />
      </Card>
    </div>
  );
}

function Lessons() {
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");

  const lessons = CURRICULUM.lessons;
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return lessons;
    return lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        (l.goals || []).join(" ").toLowerCase().includes(q) ||
        JSON.stringify(l.vocab || []).toLowerCase().includes(q)
    );
  }, [query, lessons]);

  return (
    <div className="py-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-extrabold">Lessons</h2>
        <Input
          placeholder="Search lessons, goals, or vocab…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {!active ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filtered.map((l) => (
            <Card key={l.id} className="cursor-pointer hover:shadow-lg" onClick={() => setActive(l)}>
              <h3 className="text-lg font-semibold">{l.title}</h3>
              <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                {(l.goals || []).map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </Card>
          ))}
          {filtered.length === 0 && (
            <Card><div className="text-sm text-zinc-500">No matches. Try another term.</div></Card>
          )}
        </div>
      ) : (
        <LessonDetail lesson={active} onBack={() => setActive(null)} />
      )}
    </div>
  );
}

function LessonDetail({ lesson, onBack }) {
  const [flip, setFlip] = useState(false); // local flip demo (unused but kept for clarity)
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const quiz = lesson.quiz;

  const choose = (i) => {
    const correct = i === quiz.questions[step].answer;
    if (correct) setScore((s) => s + 1);
    if (step < quiz.questions.length - 1) setStep((s) => s + 1);
    else alert(`Score: ${score + (correct ? 1 : 0)} / ${quiz.questions.length}`);
  };

  return (
    <div className="mt-4">
      <Button className="bg-indigo-600 text-white mb-4" onClick={onBack}>← Back</Button>
      <h3 className="text-xl font-bold">{lesson.title}</h3>

      <div className="grid md:grid-cols-5 gap-4 mt-3">
        <div className="md:col-span-3 space-y-4">
          <Card>
            <div className="text-sm text-zinc-500">Goals</div>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {(lesson.goals || []).map((g, i) => <li key={i} className="text-sm">{g}</li>)}
            </ul>
          </Card>

          {lesson.grammar && (
            <Card>
              <h4 className="text-base font-semibold mb-2">{lesson.grammar.title}</h4>
              <ul className="list-disc pl-5 space-y-1">
                {(lesson.grammar.notes || []).map((n, i) => <li key={i} className="text-sm">{n}</li>)}
              </ul>
              {(lesson.grammar.examples || []).length > 0 && (
                <div className="mt-3">
                  <div className="text-sm font-medium mb-1">Examples</div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {lesson.grammar.examples.map((ex, i) => (
                      <div key={i} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                        <div className="font-medium">{ex.fr}</div>
                        <div className="text-sm text-zinc-600">{ex.en}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>

        <div className="md:col-span-2 space-y-4">
          <Card>
            <div className="text-sm font-medium mb-2">Flashcards</div>
            <div className="grid grid-cols-2 gap-3">
              {(lesson.vocab || []).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setFlip(!flip)}
                  className="cursor-pointer p-4 rounded-2xl border text-center hover:shadow"
                >
                  <div className="text-sm text-zinc-500">{flip ? "English" : "Français"}</div>
                  <div className="mt-1 text-xl font-semibold">{flip ? item.en : item.fr}</div>
                </div>
              ))}
            </div>
          </Card>

          {quiz?.questions?.length ? (
            <Card>
              <div className="text-sm text-zinc-500">Quiz</div>
              <div className="text-lg font-semibold mt-1">{quiz.questions[step].q}</div>
              <div className="grid gap-2 mt-3">
                {quiz.questions[step].options.map((opt, i) => (
                  <Button key={i} className="bg-zinc-100 text-left" onClick={() => choose(i)}>
                    {opt}
                  </Button>
                ))}
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Culture() {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-extrabold">About France</h2>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Card>
          <h3 className="text-lg font-semibold">Eiffel Tower (Tour Eiffel)</h3>
          <p className="mt-2 text-sm text-zinc-700">
            One of the most iconic landmarks in the world, built for the 1889 Exposition Universelle in Paris.
          </p>
          <img
            src="/images/eiffel.jpg"
            alt="Eiffel Tower"
            className="mt-3 w-full h-64 object-cover rounded-xl border"
            onError={(e)=>{e.currentTarget.style.display='none'}}
          />
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">French Symbols</h3>
          <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
            <li>🇫🇷 The Tricolore flag (blue, white, red)</li>
            <li>La Marseillaise (national anthem)</li>
            <li>Gallic rooster, Marianne, baguette & croissant</li>
          </ul>
          <img
            src="/images/flag.png"
            alt="French flag"
            className="mt-3 w-40 h-24 object-contain"
            onError={(e)=>{e.currentTarget.style.display='none'}}
          />
        </Card>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-extrabold">Gallery</h2>
      <p className="text-sm text-zinc-600 mt-1">Upload images into <code>/public/images</code> and they’ll appear here.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {["eiffel.jpg", "flag.png", "croissant.png"].map((f) => (
          <Card key={f} className="p-0 overflow-hidden">
            <img
              src={`/images/${f}`}
              alt={f}
              className="w-full h-52 object-cover"
              onError={(e)=>{e.currentTarget.style.display='none'}}
            />
            <div className="p-3 text-sm">{f}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------- App with Router ---------- */
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/lessons" element={<Lessons/>} />
          <Route path="/culture" element={<Culture/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="*" element={<div className="py-10">Page not found.</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}


import { useMemo, useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { Save, SendHorizontal, Sparkle } from "lucide-react";

const summaryCards = [
  {
    label: "Total Students",
    value: "24",
    suffix: "100% Enrollment",
  },
  {
    label: "Entries Completed",
    value: "18",
    secondaryValue: "/24",
    progress: 75,
  },
  {
    label: "Class Average (Projected)",
    value: "B+",
    suffix: "↑ 4% vs Midterm",
  },
];

const studentsSeed = [
  {
    name: "Aiden Montgomery",
    rank: "4th",
    id: "EDU-2024-041",
    score: "88",
    grade: "A",
    feedback: "Excellent grasp of Cold War era nuances.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2JVmHEM8sC5SyoHiR_ljFTP24OPprx04aj8zb6AyeCu813TRqzH6SIE_3hFDqDXqgGa20tFzI1Q71zv-8VDdrXp2hpU0gX8gO4rZPQz-tG3JpBmx75YhKRiP48laHkJXX8iAEaHhtApn2niHfPd_rahnHPpoQXSfMBAJj4XRA2JS55FIK5Lld71Cg7HAoc9h1yzJS0iOwbDxAGND3ioJ460TJn9wjyZs1-Q1UZcPAGMxcgzqyPZo3l9TKjuKbawc7UoQhRnLM97M8",
  },
  {
    name: "Beatrix Willoughby",
    rank: "12th",
    id: "EDU-2024-012",
    score: "74",
    grade: "B+",
    feedback: "Solid essay, but needs more primary sources.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBANv8297w-z_J3WuOMcuOPfNaCz-h0rVA2_P-aXvjJpQYHL8l_TMIVfB_hArpx93WjUS7QI1QntXAkyAQY9oqVvIVjZa8FTnjnskxKaWZDWaYNG35SOgsOJxLC6BG1N251oYyLp4CC0WorGap8uj1oS2IZBXb89tTiUifYHZ3ooMgxmkS4T_z8hCoN2Euay72dGuHmjKBSdaRQqMVK56bYlGb7exeWrmg-M2rVTTMrp_yuRFJxhHM3FuKmQyjPZoupZurKLqofbrFQ",
  },
  {
    name: "Cyrus Dhillon",
    rank: "Pending",
    id: "EDU-2024-088",
    score: "",
    grade: "--",
    feedback: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDquXD00uJr6KwcGfwcB7RdPZvnA9hnrYrB9VaxZo9xCeKtUP8WsbHWsatxCor9IMYFkLAlPgJl7oTak5Cbu2M5_6vo-RfxQeYKiOxHmgNGsUhmarf_jql4GyMt9FNEMpiDjuOUIqLrfT08NvDuN4J0bnIn_UM8GkJqExqnThdueR9jmlZCJJcb16S0YHpvHKTqPK8jpEQngWCaED55y6v05m0iv36VB3dEayiPlp0ljpo8chHeVDHOhYj3pWm2SstoBqunTeNP0dIN",
  },
  {
    name: "Elena Kovic",
    rank: "1st",
    id: "EDU-2024-002",
    score: "97",
    grade: "A+",
    feedback: "Exceptional analysis of the industrial revolution.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcBl2Kej3w3HyKI0otgSh6Lh8x_O4iNAc5Brmsq7jCgguUfwik_6Ac7T6tkPlAGVfJwdkA1yeyzqVUuBjQj7VD80T3-bUtGUhmrhQ_txJD7I6byCYfZOFW3tMCrk2BFr7V27iNvspm_u5r4Aak8_I-b466V2A7t9o24FIJkcZEgueXArdP5ZSg2INdoE1OS1oimO_yHVY1bnOj0U3s77H9JfjWu4oSVyCbboROzZbN5FDvQ4YBF02AYId_OXl8vmaJlvd1k4lNADY5",
  },
];

const gradeOptions = ["--", "A+", "A", "B+", "B", "C"];

const TeacherResults = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [students, setStudents] = useState(studentsSeed);

  const pendingCount = useMemo(
    () => students.filter((student) => !student.score).length,
    [students],
  );

  const updateStudent = (
    studentId: string,
    field: "score" | "grade" | "feedback",
    value: string,
  ) => {
    setStudents((current) =>
      current.map((student) =>
        student.id === studentId ? { ...student, [field]: value } : student,
      ),
    );
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {isSidebarOpen ? (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          aria-label="Close sidebar"
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-border/40 bg-card transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar role="teacher" />
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2 font-bold text-primary">
                  <Sparkle className="text-sm" />
                  <span className="text-xs uppercase tracking-widest">
                    Assessment Period: Spring 2024
                  </span>
                </div>
                <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-on-surface">
                  Grade 10-A Modern History
                </h2>
                <p className="mt-2 text-lg text-on-surface-variant">
                  Final Term Examination Results Entry
                </p>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 font-bold text-on-surface transition-all hover:bg-secondary/80">
                  <Save />
                  Save Draft
                </button>
                <button className="primary-gradient from-primary to-primary-dim flex items-center gap-2 rounded-xl px-8 py-3 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <SendHorizontal />
                  Submit Results
                </button>
              </div>
            </div>

            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {summaryCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-outline-variant/10 bg-card p-6 shadow-sm"
                >
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    {card.label}
                  </p>
                  <div className="flex items-end justify-between gap-3">
                    <span className="text-4xl font-black text-on-surface">
                      {card.value}
                      {card.secondaryValue ? (
                        <span className="text-xl font-medium text-on-surface-variant/40">
                          {card.secondaryValue}
                        </span>
                      ) : null}
                    </span>
                    {card.progress !== undefined ? (
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${card.progress}%` }}
                        />
                      </div>
                    ) : (
                      <span className="rounded-full bg-primary-container/20 px-3 py-1 text-xs font-bold text-primary">
                        {card.suffix}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="hidden grid-cols-12 gap-4 px-8 text-[10px] font-black uppercase tracking-widest text-on-surface-variant md:grid">
                <div className="col-span-4">Student Identity</div>
                <div className="col-span-2">Student ID</div>
                <div className="col-span-2">Score (100)</div>
                <div className="col-span-1">Grade</div>
                <div className="col-span-3">Feedback / Comments</div>
              </div>

              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="rounded-lg border border-outline-variant/5 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="hidden grid-cols-12 items-center gap-4 md:grid">
                      <div className="col-span-4 flex items-center gap-4">
                        <img
                          alt={student.name}
                          className="h-10 w-10 rounded-full bg-surface-container-high"
                          src={student.image}
                        />
                        <div>
                          <p className="text-sm font-bold text-on-surface">{student.name}</p>
                          <p className="text-xs text-on-surface-variant">
                            Class Rank: {student.rank}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <code className="rounded-lg bg-secondary px-2 py-1 text-xs text-on-surface-variant">
                          {student.id}
                        </code>
                      </div>
                      <div className="col-span-2">
                        <input
                          className="w-24 rounded-xl border-none bg-secondary px-4 py-2 text-center font-bold transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                          type="number"
                          value={student.score}
                          onChange={(event) => updateStudent(student.id, "score", event.target.value)}
                          placeholder="--"
                        />
                      </div>
                      <div className="col-span-1">
                        <select
                          className="appearance-none rounded-xl border-none bg-secondary px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-primary/20"
                          value={student.grade}
                          onChange={(event) => updateStudent(student.id, "grade", event.target.value)}
                        >
                          {gradeOptions.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-3">
                        <input
                          className="w-full rounded-xl border-none bg-secondary px-4 py-2 text-xs italic transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                          placeholder="Add private feedback..."
                          type="text"
                          value={student.feedback}
                          onChange={(event) => updateStudent(student.id, "feedback", event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 md:hidden">
                      <div className="flex items-center gap-3">
                        <img alt={student.name} className="h-10 w-10 rounded-full" src={student.image} />
                        <div>
                          <p className="text-sm font-bold">{student.name}</p>
                          <p className="text-xs text-on-surface-variant">{student.id}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <label className="text-xs font-semibold text-on-surface-variant">
                          Score
                          <input
                            className="mt-1 w-full rounded-xl border-none bg-secondary px-3 py-2 text-sm font-bold"
                            type="number"
                            value={student.score}
                            onChange={(event) => updateStudent(student.id, "score", event.target.value)}
                            placeholder="--"
                          />
                        </label>
                        <label className="text-xs font-semibold text-on-surface-variant">
                          Grade
                          <select
                            className="mt-1 w-full rounded-xl border-none bg-secondary px-3 py-2 text-sm font-bold"
                            value={student.grade}
                            onChange={(event) => updateStudent(student.id, "grade", event.target.value)}
                          >
                            {gradeOptions.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <label className="block text-xs font-semibold text-on-surface-variant">
                        Feedback
                        <input
                          className="mt-1 w-full rounded-xl border-none bg-secondary px-3 py-2 text-xs italic"
                          placeholder="Add private feedback..."
                          type="text"
                          value={student.feedback}
                          onChange={(event) => updateStudent(student.id, "feedback", event.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 flex flex-col items-center gap-5 rounded-lg border border-card bg-secondary/50 p-6 shadow-xl shadow-on-surface/5 md:flex-row md:justify-between">
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-primary text-[10px] font-bold">
                    {pendingCount}
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-secondary text-[10px] font-bold text-on-surface-variant">
                    ?
                  </div>
                </div>
                <p className="text-sm font-medium text-on-surface-variant">
                  {pendingCount} students awaiting results entry
                </p>
              </div>
              <div className="flex gap-4">
                <button className="rounded-xl bg-secondary px-6 py-2 text-sm font-bold text-on-surface transition-colors hover:bg-secondary/80">
                  Clear All Fields
                </button>
                <button className="primary-gradient from-primary to-primary-dim rounded-xl px-10 py-3 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                  Submit Final Results
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeacherResults;

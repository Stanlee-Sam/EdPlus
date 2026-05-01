import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import {
  Award,
  BookOpen,
  Calendar,
  ChartNoAxesColumn,
  CheckCircle,
  ChevronsDown,
  Download,
  FlaskConical,
  Languages,
  Lightbulb,
  Medal,
  Sigma,
  TrendingUp,
  User,
} from "lucide-react";
import { useState } from "react";

const metricCards = [
  {
    label: "Overall Grade",
    value: "A-",
    note: "+2% from last term",
    icon: Award,
    iconWrapClass: "bg-primary-container/30 text-primary",
  },
  {
    label: "Class Percentile",
    value: "Top 5%",
    icon: ChartNoAxesColumn,
    iconWrapClass: "bg-tertiary-container/30 text-tertiary",
  },
  {
    label: "GPA",
    value: "3.82",
    icon: Medal,
    iconWrapClass: "bg-secondary",
  },
  {
    label: "Assignments",
    value: "24/25",
    note: "96% completion",
    icon: CheckCircle,
    iconWrapClass: "bg-primary-container/30 text-primary",
  },
];

const subjectPerformance = [
  { subject: "Mathematics", score: 94 },
  { subject: "English", score: 88 },
  { subject: "Physics", score: 91 },
  { subject: "History", score: 82 },
  { subject: "Chemistry", score: 76 },
];

const gradeRows = [
  {
    subject: "Mathematics",
    subtitle: "Advanced Calculus",
    assessment: "Mid-Term Examination",
    score: "94/100",
    grade: "A",
    comment:
      "Excellent grasp of core concepts. Elena's problem-solving speed has improved significantly.",
    icon: Sigma,
    gradeClass: "bg-primary/10 text-primary",
  },
  {
    subject: "Physics",
    subtitle: "Thermodynamics",
    assessment: "Lab Assessment #4",
    score: "89/100",
    grade: "A-",
    comment:
      "Outstanding laboratory documentation. Very meticulous with experimental variables.",
    icon: FlaskConical,
    gradeClass: "bg-primary/10 text-primary",
  },
  {
    subject: "English",
    subtitle: "Modern Literature",
    assessment: "Literary Essay - Analysis",
    score: "82/100",
    grade: "B+",
    comment: "Insightful analysis, though essay structure could be refined for better flow.",
    icon: Languages,
    gradeClass: "bg-secondary/10 text-secondary",
  },
  {
    subject: "History",
    subtitle: "Ancient Civilizations",
    assessment: "Presentation: Mesopotamia",
    score: "91/100",
    grade: "A-",
    comment: "Great public speaking skills. The visual aids used were very high quality.",
    icon: BookOpen,
    gradeClass: "bg-primary/10 text-primary",
  },
];

const ParentResults = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <Sidebar role="parent" />
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="mx-auto max-w-7xl space-y-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">
                  Results &amp; Performance
                </h2>
                <p className="mt-1 text-on-surface-variant">
                  Detailed academic insights and progress tracking.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select className="cursor-pointer appearance-none rounded-2xl border-none bg-muted py-3 pl-10 pr-10 text-sm font-semibold focus:ring-2 focus:ring-primary/20">
                    <option>Elena Jenkins</option>
                    <option>Marcus Jenkins</option>
                  </select>
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <ChevronsDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                </div>
                <div className="relative">
                  <select className="cursor-pointer appearance-none rounded-2xl border-none bg-muted py-3 pl-10 pr-10 text-sm font-semibold focus:ring-2 focus:ring-primary/20">
                    <option>Term 1, 2023-24</option>
                    <option>Term 2, 2023-24</option>
                    <option>Term 3, 2023-24</option>
                  </select>
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <ChevronsDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {metricCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="flex flex-col justify-between rounded-lg bg-card p-6 shadow-[0_20px_40px_rgba(42,53,50,0.06)]"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        {card.label}
                      </span>
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.iconWrapClass}`}>
                        <Icon className="text-lg" />
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-on-surface">{card.value}</span>
                      {card.note ? (
                        <span className="text-xs font-bold text-primary">{card.note}</span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="rounded-lg bg-secondary p-8 lg:col-span-2">
                <div className="mb-10 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Subject Performance</h3>
                </div>
                <div className="space-y-6">
                  {subjectPerformance.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        <span>{subject.subject}</span>
                        <span>{subject.score}%</span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-highest">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${subject.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-secondary p-8">
                <h3 className="mb-10 text-xl font-bold">Grade Trend</h3>
                <div className="flex flex-1 items-end gap-3 px-2">
                  {["TERM 1", "TERM 2", "TERM 3"].map((term, index) => (
                    <div key={term} className="group flex flex-1 flex-col items-center gap-2">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          index === 2 ? "bg-primary" : index === 1 ? "bg-primary/40 hover:bg-primary/60" : "bg-primary/20 hover:bg-primary/40"
                        }`}
                        style={{ height: `${48 + index * 24}px` }}
                      />
                      <span className={`text-[10px] font-bold ${index === 2 ? "text-primary" : "text-on-surface-variant"}`}>
                        {term}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-lg bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <TrendingUp className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Upward Trajectory</p>
                      <p className="text-[10px] text-on-surface-variant">15% improvement in GPA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-on-surface">Subjects &amp; Grades</h3>
                <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                  <Download />
                  Export Report Card
                </button>
              </div>

              <div className="space-y-3">
                <div className="hidden grid-cols-12 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant md:grid">
                  <div className="col-span-3">Subject</div>
                  <div className="col-span-3">Assessment Title</div>
                  <div className="col-span-1 text-center">Score</div>
                  <div className="col-span-1 text-center">Grade</div>
                  <div className="col-span-4 pl-4">Teacher's Comment</div>
                </div>

                {gradeRows.map((row) => {
                  const RowIcon = row.icon;
                  return (
                    <div key={`${row.subject}-${row.assessment}`} className="rounded-lg bg-card px-6 py-5 shadow-[0_4px_20px_rgba(42,53,50,0.03)]">
                      <div className="hidden grid-cols-12 items-center md:grid">
                        <div className="col-span-3 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-on-surface">
                            <RowIcon className="text-lg" />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{row.subject}</p>
                            <p className="text-[10px] font-medium text-on-surface-variant">{row.subtitle}</p>
                          </div>
                        </div>
                        <div className="col-span-3 text-sm font-medium">{row.assessment}</div>
                        <div className="col-span-1 text-center text-sm font-bold">{row.score}</div>
                        <div className="col-span-1 flex justify-center">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-extrabold ${row.gradeClass}`}>
                            {row.grade}
                          </span>
                        </div>
                        <div className="col-span-4 pl-4 text-xs italic leading-relaxed text-on-surface-variant">"{row.comment}"</div>
                      </div>

                      <div className="space-y-3 md:hidden">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                              <RowIcon className="text-lg" />
                            </div>
                            <div>
                              <p className="text-sm font-bold">{row.subject}</p>
                              <p className="text-[10px] text-on-surface-variant">{row.subtitle}</p>
                            </div>
                          </div>
                          <span className={`rounded-lg px-2 py-1 text-xs font-extrabold ${row.gradeClass}`}>{row.grade}</span>
                        </div>
                        <p className="text-xs font-medium text-on-surface">{row.assessment}</p>
                        <p className="text-xs text-on-surface-variant">Score: <span className="font-bold text-on-surface">{row.score}</span></p>
                        <p className="text-xs italic text-on-surface-variant">"{row.comment}"</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl bg-primary p-8 text-on-primary shadow-xl md:flex-row">
              <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-container/10" />
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-secondary text-on-primary-container shadow-inner">
                <Lightbulb className="text-4xl" />
              </div>
              <div className="relative z-10 flex-1">
                <h4 className="mb-2 text-2xl font-extrabold">Academic Roadmap Recommendation</h4>
                <p className="max-w-2xl leading-relaxed text-on-primary/80">
                  Based on Elena's current performance, she is excelling in STEM subjects. We recommend considering the Advanced Placement (AP) Physics track for the next academic year to further nurture her potential.
                </p>
              </div>
              <button className="relative z-10 rounded-2xl bg-primary-container px-6 py-3 text-sm font-bold text-on-primary-container transition-opacity hover:opacity-90">
                Discuss with Counselor
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ParentResults;

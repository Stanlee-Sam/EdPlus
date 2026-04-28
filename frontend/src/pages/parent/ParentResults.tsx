import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { Award, BookOpen, Calendar, ChartNoAxesColumn, CheckCircle, ChevronsDown, Download, FlaskConical, Languages, Lightbulb, Medal, Sigma, TrendingUp, User } from "lucide-react";
import { useState } from "react";

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
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
                  Results &amp; Performance
                </h2>
                <p className="text-on-surface-variant mt-1">
                  Detailed academic insights and progress tracking.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select className="appearance-none bg-muted text-sm font-semibold py-3 pl-10 pr-10 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option>Elena Jenkins</option>
                    <option>Marcus Jenkins</option>
                  </select>
                  <User className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                    face
                  </User>
                  <ChevronsDown className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                    expand_more
                  </ChevronsDown>
                </div>
                <div className="relative">
                  <select className="appearance-none bg-muted text-sm font-semibold py-3 pl-10 pr-10 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option>Term 1, 2023-24</option>
                    <option>Term 2, 2023-24</option>
                    <option>Term 3, 2023-24</option>
                  </select>
                  <Calendar className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                    calendar_today
                  </Calendar>
                  <ChevronsDown className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                    expand_more
                  </ChevronsDown>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.06)] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Overall Grade
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-primary-container/30 flex items-center justify-center text-primary">
                    <Award className="material-symbols-outlined text-lg">
                      workspace_premium
                    </Award>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-on-surface">
                    A-
                  </span>
                  <span className="text-xs font-bold text-primary">
                    +2% from last term
                  </span>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.06)] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    ClassName Percentile
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                    <ChartNoAxesColumn className="material-symbols-outlined text-lg">
                      leaderboard
                    </ChartNoAxesColumn>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-on-surface">
                    Top 5%
                  </span>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.06)] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    GPA
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Medal className="material-symbols-outlined text-lg">
                      military_tech
                    </Medal>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-on-surface">
                    3.82
                  </span>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.06)] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Assignments
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-primary-container/30 flex items-center justify-center text-primary">
                    <CheckCircle className="material-symbols-outlined text-lg">
                      task_alt
                    </CheckCircle>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-on-surface">
                    24/25
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">
                    96% completion
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-secondary rounded-lg p-8">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-bold">Subject Performance</h3>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-[10px] font-bold uppercase">
                        Average Score
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      <span>Mathematics</span>
                      <span>94%</span>
                    </div>
                    <div className="h-3 w-full rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      <span>English</span>
                      <span>88%</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      <span>Physics</span>
                      <span>91%</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      <span>History</span>
                      <span>82%</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      <span>Chemistry</span>
                      <span>76%</span>
                    </div>
                    <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-8 flex flex-col">
                <h3 className="text-xl font-bold mb-10">Grade Trend</h3>
                <div className="flex-1 flex items-end gap-3 px-2">
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-primary/20 rounded-t-lg transition-all duration-500 hover:bg-primary/40"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant">
                      TERM 1
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-primary/40 rounded-t-lg transition-all duration-500 hover:bg-primary/60"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant">
                      TERM 2
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-primary rounded-t-lg transition-all duration-500"></div>
                    <span className="text-[10px] font-bold text-primary">
                      TERM 3
                    </span>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-card rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <TrendingUp className="material-symbols-outlined text-sm">
                        trending_up
                      </TrendingUp>
                    </div>
                    <div>
                      <p className="text-xs font-bold">Upward Trajectory</p>
                      <p className="text-[10px] text-on-surface-variant">
                        15% improvement in GPA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-on-surface">
                  Subjects &amp; Grades
                </h3>
                <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                  <Download className="material-symbols-outlined">download</Download>
                  Export Report Card
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-12 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  <div className="col-span-3">Subject</div>
                  <div className="col-span-3">Assessment Title</div>
                  <div className="col-span-1 text-center">Score</div>
                  <div className="col-span-1 text-center">Grade</div>
                  <div className="col-span-4 pl-4">Teacher's Comment</div>
                </div>
                <div className="grid grid-cols-12 px-6 py-5 bg-card rounded-lg items-center shadow-[0_4px_20px_rgba(42,53,50,0.03)] group hover:translate-x-1 transition-transform">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-surface">
                      <Sigma className="material-symbols-outlined">
                        calculate
                      </Sigma>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Mathematics</p>
                      <p className="text-[10px] text-on-surface-variant font-medium">
                        Advanced Calculus
                      </p>
                    </div>
                  </div>
                  <div className="col-span-3 text-sm font-medium">
                    Mid-Term Examination
                  </div>
                  <div className="col-span-1 text-center font-bold text-sm">
                    94/100
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs">
                      A
                    </span>
                  </div>
                  <div className="col-span-4 pl-4 text-xs text-on-surface-variant italic leading-relaxed">
                    "Excellent grasp of core concepts. Elena's problem-solving
                    speed has improved significantly."
                  </div>
                </div>
                <div className="grid grid-cols-12 px-6 py-5 bg-card rounded-lg items-center shadow-[0_4px_20px_rgba(42,53,50,0.03)] group hover:translate-x-1 transition-transform">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-surface">
                      <FlaskConical className="material-symbols-outlined">science</FlaskConical>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Physics</p>
                      <p className="text-[10px] text-on-surface-variant font-medium">
                        Thermodynamics
                      </p>
                    </div>
                  </div>
                  <div className="col-span-3 text-sm font-medium">
                    Lab Assessment #4
                  </div>
                  <div className="col-span-1 text-center font-bold text-sm">
                    89/100
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs">
                      A-
                    </span>
                  </div>
                  <div className="col-span-4 pl-4 text-xs text-on-surface-variant italic leading-relaxed">
                    "Outstanding laboratory documentation. Very meticulous with
                    experimental variables."
                  </div>
                </div>
                <div className="grid grid-cols-12 px-6 py-5 bg-card rounded-lg items-center shadow-[0_4px_20px_rgba(42,53,50,0.03)] group hover:translate-x-1 transition-transform">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-surface">
                      <Languages className="material-symbols-outlined">
                        translate
                      </Languages>
                    </div>
                    <div>
                      <p className="text-sm font-bold">English</p>
                      <p className="text-[10px] text-on-surface-variant font-medium">
                        Modern Literature
                      </p>
                    </div>
                  </div>
                  <div className="col-span-3 text-sm font-medium">
                    Literary Essay - Analysis
                  </div>
                  <div className="col-span-1 text-center font-bold text-sm">
                    82/100
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <span className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center font-extrabold text-xs">
                      B+
                    </span>
                  </div>
                  <div className="col-span-4 pl-4 text-xs text-on-surface-variant italic leading-relaxed">
                    "Insightful analysis, though essay structure could be
                    refined for better flow."
                  </div>
                </div>
                <div className="grid grid-cols-12 px-6 py-5 bg-card rounded-lg items-center shadow-[0_4px_20px_rgba(42,53,50,0.03)] group hover:translate-x-1 transition-transform">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-surface">
                      <BookOpen className="material-symbols-outlined">
                        menu_book
                      </BookOpen>
                    </div>
                    <div>
                      <p className="text-sm font-bold">History</p>
                      <p className="text-[10px] text-on-surface-variant font-medium">
                        Ancient Civilizations
                      </p>
                    </div>
                  </div>
                  <div className="col-span-3 text-sm font-medium">
                    Presentation: Mesopotamia
                  </div>
                  <div className="col-span-1 text-center font-bold text-sm">
                    91/100
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs">
                      A-
                    </span>
                  </div>
                  <div className="col-span-4 pl-4 text-xs text-on-surface-variant italic leading-relaxed">
                    "Great public speaking skills. The visual aids used were
                    very high quality."
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary p-8 rounded-3xl text-on-primary flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="w-12 h-12 bg-secondary rounded-2xl flex-shrink-0 flex items-center justify-center text-on-primary-container shadow-inner">
                <Lightbulb className="material-symbols-outlined text-4xl">
                  psychology
                </Lightbulb>
              </div>
              <div className="relative z-10 flex-1">
                <h4 className="text-2xl font-extrabold mb-2">
                  Academic Roadmap Recommendation
                </h4>
                <p className="text-on-primary/80 leading-relaxed max-w-2xl">
                  Based on Elena's current performance, she is excelling in STEM
                  subjects. We recommend considering the Advanced Placement (AP)
                  Physics track for the next academic year to further nurture
                  her potential.
                </p>
              </div>
              <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity relative z-10">
                Discuss with Counselor
              </button>
            </div>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default ParentResults;

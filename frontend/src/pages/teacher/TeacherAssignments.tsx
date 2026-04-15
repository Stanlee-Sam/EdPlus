import { useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { ArrowDownWideNarrow, CheckCheck, ClipboardClock, Edit, Eye, ListFilter, Rocket, Star } from "lucide-react";
const TeacherAssignments = () => {
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
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-border/40 bg-card transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar role="teacher" />
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6 w-full">
          <div className="min-h-[calc(100vh-5rem)] w-full">
            <div className="mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
                Assignments
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl">
                Curate, review, and manage student learning progress across your
                active classNamees.
              </p>
            </div>
            <div className="grid grid-cols-12 gap-8 mb-12">
              <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-lg shadow-sm border border-outline-variant/10">
                  <div className="w-12 h-12 bg-primary-container/30 rounded-2xl flex items-center justify-center text-primary mb-4">
                    <ClipboardClock 
                      className="material-symbols-outlined"
                      data-icon="pending_actions"
                    />

                  </div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">
                    Active
                  </p>
                  <p className="text-3xl font-extrabold">12</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm border border-outline-variant/10">
                  <div className="w-12 h-12 bg-tertiary-container/30 rounded-2xl flex items-center justify-center text-tertiary mb-4">
                    <CheckCheck
                      className="material-symbols-outlined"
                      data-icon="done_all"
                    />
                    
                  </div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">
                    Completed
                  </p>
                  <p className="text-3xl font-extrabold">48</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm border border-outline-variant/10">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center text-muted-foreground justify-center mb-4">
                    <Star
                      className="material-symbols-outlined"
                      data-icon="grade"
                    >
                      grade
                    </Star>
                  </div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">
                    Avg Score
                  </p>
                  <p className="text-3xl font-extrabold">88%</p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 bg-card rounded-lg p-8 shadow-sm ring-1 ring-inset ring-outline-variant/10">
                <h3 className="text-xl font-bold mb-6">Quick Assignment</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                      Title
                    </label>
                    <input
                      className="w-full bg-surface-container-high border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g. Victorian Poetry Analysis"
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                        ClassName
                      </label>
                      <select className="w-full bg-surface-container-high border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20">
                        <option>10-A Literature</option>
                        <option>12-C Humanities</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                        Due Date
                      </label>
                      <input
                        className="w-full bg-surface-container-high border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20"
                        type="date"
                      />
                    </div>
                  </div>
                  <button className="w-full py-3 mt-2 primary-gradient text-on-primary rounded-xl font-bold flex items-center justify-center gap-2">
                    <Rocket
                      className="material-symbols-outlined text-lg"
                      data-icon="rocket_launch"
                    />

                    Post Assignment
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Recent Assignments</h3>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-sm font-medium hover:bg-surface-container-highest transition-colors">
                  <ListFilter
                    className="material-symbols-outlined text-lg"
                    data-icon="filter_list"
                  />
                   
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-sm font-medium hover:bg-surface-container-highest transition-colors">
                  <ArrowDownWideNarrow
                    className="material-symbols-outlined text-lg"
                    data-icon="sort"
                  />
                  
                  Sort
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="group bg-card p-6 rounded-lg flex items-center gap-8 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 border border-transparent hover:border-primary/10">
                <div className="shrink-0 w-10 h-10 md:w-20 md:h-20 rounded-3xl bg-primary-container/20 flex flex-col items-center justify-center text-primary">
                  <span className="text-sm md:text-xl font-black">24</span>
                  <span className="text-[10px] uppercase font-bold tracking-tighter">
                    Oct
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-3 py-1 bg-secondary text-on-secondary-container  text-[10px] font-bold rounded-full uppercase tracking-wider">
                      Literature
                    </span>
                    <span className="text-on-surface-variant text-sm font-medium">
                      ClassName 10-A
                    </span>
                  </div>
                  <h4 className="text-md md:text-xl font-bold text-on-surface">
                    Modernist Poetry Reflection
                  </h4>
                  <p className="text-on-surface-variant text-sm mt-1">
                    Due in 2 days •{" "}
                    <span className="text-primary font-semibold">Priority</span>
                  </p>
                </div>
                <div className="hidden md:flex flex-col items-end gap-2 pr-8 border-r border-outline-variant/20">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-widest">
                        Submissions
                      </p>
                      <p className="text-lg font-bold">28 / 32</p>
                    </div>
                    <div className="w-16 h-16 relative">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle
                          className="stroke-secondary"
                          cx="18"
                          cy="18"
                          fill="none"
                          r="16"
                          stroke-width="3"
                        ></circle>
                        <circle
                          className="stroke-primary"
                          cx="18"
                          cy="18"
                          fill="none"
                          r="16"
                          stroke-dasharray="87.5 100"
                          stroke-linecap="round"
                          stroke-width="3"
                        ></circle>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <button className="p-3 bg-secondary text-on-surface-variant rounded-2xl hover:bg-primary hover:text-white transition-all">
                    <Edit
                      className="material-symbols-outlined"
                      data-icon="edit"
                    />
                     
                  </button>
                  <button className="p-3 bg-secondary text-on-surface-variant rounded-2xl hover:bg-tertiary hover:text-white transition-all">
                    <Eye
                      className="material-symbols-outlined"
                      data-icon="visibility"
                    />
                  </button>
                </div>
              </div>
              <div className="group bg-card p-6 rounded-lg flex items-center gap-8 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 border border-transparent hover:border-primary/10">
                <div className="flex-shrink-0 w-20 h-20 rounded-3xl bg-tertiary-container/20 flex flex-col items-center justify-center text-tertiary">
                  <span className="text-xl font-black">28</span>
                  <span className="text-[10px] uppercase font-bold tracking-tighter">
                    Oct
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-3 py-1 bg-secondary text-on-secondary-container text-[10px] font-bold rounded-full uppercase tracking-wider">
                      Social Sciences
                    </span>
                    <span className="text-on-surface-variant text-sm font-medium">
                      ClassName 12-C
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-on-surface">
                    Post-War Economics Thesis
                  </h4>
                  <p className="text-on-surface-variant text-sm mt-1">
                    Due in 6 days • Draft Stage
                  </p>
                </div>
                <div className="hidden md:flex flex-col items-end gap-2 pr-8 border-r border-outline-variant/20">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-widest">
                        Submissions
                      </p>
                      <p className="text-lg font-bold">12 / 30</p>
                    </div>
                    <div className="w-16 h-16 relative">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle
                          className="stroke-secondary"
                          cx="18"
                          cy="18"
                          fill="none"
                          r="16"
                          stroke-width="3"
                        ></circle>
                        <circle
                          className="stroke-tertiary"
                          cx="18"
                          cy="18"
                          fill="none"
                          r="16"
                          stroke-dasharray="40 100"
                          stroke-linecap="round"
                          stroke-width="3"
                        ></circle>
                      </svg>
                    </div>
                  </div>
                </div>
               <div className="flex items-center gap-2">
                  <button className="p-3 bg-secondary text-on-surface-variant rounded-2xl hover:bg-primary hover:text-white transition-all">
                    <Edit
                      className="material-symbols-outlined"
                      data-icon="edit"
                    />
                     
                  </button>
                  <button className="p-3 bg-secondary text-on-surface-variant rounded-2xl hover:bg-tertiary hover:text-white transition-all">
                    <Eye
                      className="material-symbols-outlined"
                      data-icon="visibility"
                    />
                  </button>
                </div>
              </div>
              <div className="group bg-card p-6 rounded-lg flex items-center gap-8 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 border border-transparent hover:border-primary/10 opacity-75">
                <div className="flex-shrink-0 w-20 h-20 rounded-3xl bg-secondary flex flex-col items-center justify-center text-on-surface-variant">
                  <span className="text-xl font-black">15</span>
                  <span className="text-[10px] uppercase font-bold tracking-tighter">
                    Oct
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-3 py-1 bg-secondary text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-wider">
                      Literature
                    </span>
                    <span className="text-on-surface-variant text-sm font-medium">
                      ClassName 10-A
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-on-surface line-through decoration-primary/30">
                    Grammar Basics Review
                  </h4>
                  <p className="text-on-surface-variant text-sm mt-1">
                    Closed 9 days ago •{" "}
                    <span className="text-error font-semibold">Graded</span>
                  </p>
                </div>
                <div className="hidden md:flex flex-col items-end gap-2 pr-8 border-r border-outline-variant/20">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-widest">
                        Submissions
                      </p>
                      <p className="text-lg font-bold">32 / 32</p>
                    </div>
                    <div className="w-16 h-16 relative">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle
                          className="stroke-secondary"
                          cx="18"
                          cy="18"
                          fill="none"
                          r="16"
                          stroke-width="3"
                        ></circle>
                        <circle
                          className="stroke-outline-variant"
                          cx="18"
                          cy="18"
                          fill="none"
                          r="16"
                          stroke-dasharray="100 100"
                          stroke-linecap="round"
                          stroke-width="3"
                        ></circle>
                      </svg>
                    </div>
                  </div>
                </div>
               <div className="flex items-center gap-2">
                  <button className="p-3 bg-secondary text-on-surface-variant rounded-2xl hover:bg-primary hover:text-white transition-all">
                    <Edit
                      className="material-symbols-outlined"
                      data-icon="edit"
                    />
                     
                  </button>
                  <button className="p-3 bg-secondary text-on-surface-variant rounded-2xl hover:bg-tertiary hover:text-white transition-all">
                    <Eye
                      className="material-symbols-outlined"
                      data-icon="visibility"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-12 gap-8 items-start">
              <div className="col-span-12 lg:col-span-5 relative overflow-hidden rounded-[3rem] h-[400px]">
                <img
                  alt="Inspiring academic environment"
                  className="w-full h-full object-cover"
                  data-alt="open library books with reading glasses on a clean white desk in a sun-drenched airy modern workspace"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLjJHPlsr3s4LBj6H3keL1YH3kbeBZ7K5ak70BBU7j5uZRo-8c2KK08B-FzQ_6P9vGzwobeZoerA2gi9IJKXAGt5rTWwL3iXbXyABn0YTGG02ZZI91CzG6_lyrli_6hEFe0iJZ0I3wvdzxU5wrbZDRAeN1z-u60Vuv3Fvcy3U3KNViK5tCwvIKzmraR8kTo3V-VqvOLRpiB_LgdDAbUlTIy2khVLRUhzZHrcdTH9b66crdAr9R6elpsGLiGKxlmHMnYi9DjO2xYqYZ"
                />
                <div className="absolute inset-0 bg-primary-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10 text-white border-sidebar border">
                  <h5 className="text-2xl font-bold mb-2">Teacher Tip</h5>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Providing feedback within 24 hours of submission increases
                    student engagement by 40%. Use the Quick Review tool in
                    Assignments.
                  </p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 bg-primary-container/10 rounded-[3rem] p-12 border border-primary-container/20">
                <h4 className="text-3xl font-extrabold mb-6">
                  Upcoming ClassName Schedule
                </h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white/50 transition-all cursor-pointer">
                    <div className="text-primary font-black text-2xl w-16">
                      09:00
                    </div>
                    <div className="h-10 w-[2px] bg-primary/20"></div>
                    <div>
                      <p className="font-bold">Creative Writing 101</p>
                      <p className="text-sm text-on-surface-variant">
                        Room 302 • 24 Students
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white/50 transition-all cursor-pointer">
                    <div className="text-on-surface-variant/40 font-black text-2xl w-16">
                      11:15
                    </div>
                    <div className="h-10 w-[2px] bg-outline-variant/20"></div>
                    <div>
                      <p className="font-bold">Advanced Shakespeare</p>
                      <p className="text-sm text-on-surface-variant">
                        Seminar Hall B • 18 Students
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white/50 transition-all cursor-pointer">
                    <div className="text-on-surface-variant/40 font-black text-2xl w-16">
                      14:00
                    </div>
                    <div className="h-10 w-[2px] bg-outline-variant/20"></div>
                    <div>
                      <p className="font-bold">Literary Criticism</p>
                      <p className="text-sm text-on-surface-variant">
                        Virtual Classroom • 30 Students
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default TeacherAssignments;

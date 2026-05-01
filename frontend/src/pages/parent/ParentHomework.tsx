import DoughnutHomeworkChart from "@/components/Charts/DoughnutHomework";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { BookOpen, Calendar, CheckCheck, CircleCheck, CircleEllipsis, Clock, FlaskConical, History, Info, ListFilter, ScrollText, Sigma } from "lucide-react";
import { useState } from "react";

const ParentHomework = () => {
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
          <div className="min-h-screen">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">
                  Homework
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-2">
                  <div className="flex gap-4">
                    <span className="px-4 py-1.5 bg-foreground text-background  text-xs font-bold rounded-full">
                      All Tasks (12)
                    </span>
                    <span className="px-4 py-1.5 bg-secondary text-on-surface-variant text-xs font-bold rounded-full cursor-pointer hover:bg-surface-container-high transition-colors">
                      Pending (4)
                    </span>
                    <span className="px-4 py-1.5 bg-secondary text-on-surface-variant text-xs font-bold rounded-full cursor-pointer hover:bg-surface-container-high transition-colors">
                      Completed (8)
                    </span>
                  </div>
                  <button className="text-sm font-bold text-primary flex items-center gap-1">
                    <ListFilter
                      className="material-symbols-outlined text-lg"
                      data-icon="sort"
                    />
                    Sort by Due Date
                  </button>
                </div>
                <div className="bg-card rounded-lg p-6 cloud-shadow flex flex-col md:flex-row gap-3 items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex flex-row items-start w-full gap-6">
                    <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center text-tertiary">
                      <Sigma
                        className="material-symbols-outlined text-3xl"
                        data-icon="functions"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-black tracking-widest text-tertiary">
                          Mathematics
                        </span>
                        <span className="w-1 h-1 rounded-full bg-secondary"></span>
                        <span className="text-xs font-bold text-error">
                          Due Today
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-on-surface leading-tight">
                        Calculus: Differentiation &amp; Integration Basics
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-on-surface-variant">
                          <Calendar
                            className="material-symbols-outlined text-sm"
                            data-icon="calendar_today"
                          />

                          <span className="text-xs font-medium">
                            Oct 24, 2023
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-on-surface-variant">
                          <Clock
                            className="material-symbols-outlined text-sm"
                            data-icon="schedule"
                          />

                          <span className="text-xs font-medium">4:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-error">
                          <Info
                            className="material-symbols-outlined text-sm"
                            data-icon="error"
                          />

                          <span className="text-xs font-bold">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="bg-primary text-on-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all w-full md:w-auto">
                    Mark Complete
                  </button>
                </div>
                <div className="bg-card rounded-lg p-6 cloud-shadow flex flex-col md:flex-row gap-3 items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex flex-row items-start w-full gap-6">
                    <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center text-tertiary">
                      <FlaskConical
                        className="material-symbols-outlined text-3xl"
                        data-icon="science"
                      />
                      
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-black tracking-widest text-primary">
                          Biology
                        </span>
                        <span className="w-1 h-1 rounded-full bg-secondary"></span>
                        <span className="text-xs font-bold text-on-surface-variant">
                          2 days left
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-on-surface leading-tight">
                        Cellular Respiration Lab Report
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-on-surface-variant">
                          <Calendar
                            className="material-symbols-outlined text-sm"
                            data-icon="calendar_today"
                          />
                          <span className="text-xs font-medium">
                            Oct 26, 2023
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-on-surface-variant">
                          <Clock
                            className="material-symbols-outlined text-sm"
                            data-icon="schedule"
                          />
                           
                          <span className="text-xs font-medium">11:59 PM</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-tertiary">
                          <CircleEllipsis
                            className="material-symbols-outlined text-sm"
                            data-icon="pending"
                          />
                          <span className="text-xs font-bold">In Progress</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="bg-primary text-on-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all w-full md:w-auto">
                    Mark Complete
                  </button>
                </div>
                <div className="bg-card rounded-lg p-6 cloud-shadow flex flex-col md:flex-row gap-3 items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex flex-row items-start w-full gap-6">
                    <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center text-tertiary">
                      <BookOpen
                        className="material-symbols-outlined  text-3xl"
                        data-icon="menu_book"
                      />
                     
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-black tracking-widest ">
                          English Literature
                        </span>
                        <span className="w-1 h-1 rounded-full bg-secondary"></span>
                        <span className="text-xs font-bold text-on-surface-variant">
                          Next week
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-on-surface leading-tight">
                        The Great Gatsby: Character Analysis
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-on-surface-variant">
                          <Calendar
                            className="material-symbols-outlined text-sm"
                            data-icon="calendar_today"
                          />
                          
                          <span className="text-xs font-medium">
                            Oct 30, 2023
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-on-surface-variant text-primary">
                          <CircleCheck
                            className="material-symbols-outlined text-sm"
                            data-icon="check_circle"
                          />
                           
                          <span className="text-xs font-bold">Completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="bg-secondary flex flex-row gap-2 justify-center text-on-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all w-full md:w-auto">
                    <CheckCheck
                      className="material-symbols-outlined text-sm"
                      data-icon="done_all"
                    />
                    Done
                  </button>
                </div>
                <div className="bg-card rounded-lg p-6 cloud-shadow flex flex-col md:flex-row gap-3 items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex flex-row items-start w-full gap-6">
                    <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center text-tertiary">
                      <ScrollText 
                        className="material-symbols-outlined text-3xl"
                        data-icon="history_edu"
                      />
                       
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-black tracking-widest text-tertiary">
                          Modern History
                        </span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                        <span className="text-xs font-bold text-on-surface-variant">
                          4 days left
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-on-surface leading-tight">
                        Post-War Economics Presentation
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-on-surface-variant">
                          <Calendar
                            className="material-symbols-outlined text-sm"
                            data-icon="calendar_today"
                          />
                          <span className="text-xs font-medium">
                            Oct 28, 2023
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-error">
                          <Info
                            className="material-symbols-outlined text-sm"
                            data-icon="error"
                          />
                          <span className="text-xs font-bold">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="bg-primary text-on-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all w-full md:w-auto">
                    Mark Complete
                  </button>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                <div className="bg-secondary rounded-lg p-8">
                  <h4 className="text-sm font-black uppercase tracking-widest text-on-surface-variant mb-6">
                    Homework Progress
                  </h4>
                  <div className="relative w-40 h-40 mx-auto mb-6">
                   <DoughnutHomeworkChart />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-on-surface">
                        75%
                      </span>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                      <span className="text-xs font-bold">Tasks This Week</span>
                      <span className="text-sm font-extrabold text-primary">
                        12
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                      <span className="text-xs font-bold">
                        Upcoming Deadlines
                      </span>
                      <span className="text-sm font-extrabold text-error">
                        3
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-primary rounded-lg p-8 text-on-primary relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold mb-2">Need a Tutor?</h4>
                    <p className="text-sm text-on-primary/80 mb-6">
                      Connect Alex with a subject expert to help with
                      challenging assignments.
                    </p>
                    <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg text-sm font-extrabold w-full shadow-lg active:scale-95 transition-all">
                      Find Tutor
                    </button>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-on-primary/10 rounded-full blur-3xl"></div>
                </div>
                <div className="bg-secondary rounded-lg p-8 cloud-shadow">
                  <h4 className="text-sm font-black uppercase tracking-widest text-on-surface-variant mb-6">
                    Recent Feedback
                  </h4>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <img
                        alt="Teacher"
                        className="w-10 h-10 rounded-full object-cover"
                        data-alt="professional portrait of a middle-aged female teacher with glasses and a kind smile"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF_FbUOfJo0n2dG_gVJ8O3wZbmQV1dc-7QSPMevpIIk7fcNADnrtxoNlsEh2vVB5-TmaYy5ihhO7kYIpE4ZXmfIBgVVREqBU4RcpAn0f2tyqsJZyNJGDbxpAWR23XDdVjOUUMuwPmz-APGPB-VEu80XyWVay87X6fZ6vvwYB6w8GzDsjtC-UlQdGJKp-7hguvXY35bjFibt56KO98l5V9zoKqlhnYrBt0L0vxmuLvbgTtXXtJ_oETL3N6s43HoZvyaiHkIxmsFdELu"
                      />
                      <div>
                        <p className="text-xs font-bold">
                          Mrs. Harrison{" "}
                          <span className="text-on-surface-variant font-medium">
                            • Science
                          </span>
                        </p>
                        <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                          "Excellent effort on the photosynthesis diagram,
                          Alex!"
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <img
                        alt="Teacher"
                        className="w-10 h-10 rounded-full object-cover"
                        data-alt="portrait of a male teacher in a blue shirt with a professional and encouraging expression"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwTuJOGBakeTO7i58CdhiEOA8hGOJxobQpnsH7M3Pd82KnoKP5845e4GW_-JeaYU8DwVBG8yvCTDFyE9V0JMYLoFF9Q1aJhuMrnegstC7EPJeh1yXDPKsr0uCnMunJrShE93Qmmt6UoZM1kjMQk4BXSAPvC2g3aAmiOKI7hEhJ6i8hnaYaXyjZEo4otAxK-ud3i5B1wFFgIxPr3JPGgkSYh33-FTuKHcBPn_AixiRmd0OgYK-MuCCm2K1Hee1t-JRfESA918lCJkui"
                      />
                      <div>
                        <p className="text-xs font-bold">
                          Mr. Sterling{" "}
                          <span className="text-on-surface-variant font-medium">
                            • Maths
                          </span>
                        </p>
                        <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                          "Watch your sign conventions in algebra. Let's
                          review."
                        </p>
                      </div>
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

export default ParentHomework;

import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { Calendar, ChevronDown, Lightbulb } from "lucide-react";
import React, { useState } from "react";

const ParentAttendance = () => {
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
          <div className="max-w-[1400px]">
            <header className="flex flex-col gap-5 md:flex-row md:justify-between items-start mb-10">
              <div>
                <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
                  Attendance History
                </h2>
                <p className="text-on-surface-variant font-medium">
                  Monitoring academic presence and punctuality
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex bg-secondary rounded-full p-1 shadow-inner">
                  <button className="px-6 py-2 bg-card text-primary font-bold rounded-full shadow-sm">
                    Elena
                  </button>
                  <button className="px-6 py-2 text-on-surface-variant font-semibold hover:text-on-surface transition-colors">
                    Marcus
                  </button>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-card rounded-xl shadow-sm border border-outline-variant/10 text-on-surface-variant hover:bg-surface-container transition-all">
                  <Calendar className="material-symbols-outlined text-xl">
                    calendar_today
                  </Calendar>
                  <span className="font-semibold text-sm">Last 6 Months</span>
                  <ChevronDown className="material-symbols-outlined text-lg">
                    expand_more
                  </ChevronDown>
                </button>
              </div>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)] flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold">
                  Total Days
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold">142</span>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)] flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-widest text-primary font-bold">
                  Present
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary">
                    136
                  </span>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)] flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-widest text-error font-bold">
                  Absent
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-error">4</span>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)] flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-widest text-amber-600 font-bold">
                  Late
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-amber-600">
                    2
                  </span>
                </div>
              </div>
              <div className="bg-primary text-on-primary p-6 rounded-lg shadow-xl shadow-primary/20 flex flex-col gap-1 relative overflow-hidden">
                
                <span className="text-[11px] uppercase tracking-widest font-bold opacity-80">
                  Overall Attendance
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">96</span>
                  <span className="text-xl font-bold opacity-70">%</span>
                </div>
              </div>
            </section>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <section className="xl:col-span-2 space-y-6">
                <div className="bg-card p-8 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)]">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-sm md:text-xl font-bold">Presence Heatmap</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-primary"></div>
                          <span className="text-[8px] md:text-[10px] font-bold uppercase text-on-surface-variant">
                          Present
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-error"></div>
                        <span className="text-[8px] md:text-[10px] font-bold uppercase text-on-surface-variant">
                          Absent
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-amber-400"></div>
                        <span className="text-[8px] md:text-[10px] font-bold uppercase text-on-surface-variant">
                          Late
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-secondary"></div>
                        <span className="text-[8px] md:text-[10px] font-bold uppercase text-on-surface-variant">
                          No School
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase px-1">
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                      <span>Jan</span>
                      <span>Feb</span>
                    </div>
                    <div className="grid grid-flow-col grid-rows-7 gap-2">
                      <div className="w-4 h-4 rounded-sm bg-primary-container"></div>
                      <div className="w-4 h-4 rounded-sm bg-primary-container"></div>
                      <div className="w-4 h-4 rounded-sm bg-primary-container"></div>
                      <div className="w-4 h-4 rounded-sm bg-primary-container"></div>
                      <div className="w-4 h-4 rounded-sm bg-amber-200"></div>
                      <div className="w-4 h-4 rounded-sm bg-surface-container-highest"></div>
                      <div className="w-4 h-4 rounded-sm bg-surface-container-highest"></div>
                      <div className="w-4 h-4 rounded-sm bg-primary-container"></div>
                      <div className="w-4 h-4 rounded-sm bg-error-container"></div>
                      <div className="w-4 h-4 rounded-sm bg-primary-container"></div>
                      <div className="w-4 h-4 rounded-sm bg-primary-container"></div>
                      <div className="w-4 h-4 rounded-sm bg-primary-container"></div>
                      <div className="w-4 h-4 rounded-sm bg-surface-container-highest"></div>
                      <div className="w-4 h-4 rounded-sm bg-surface-container-highest"></div>
                      {/* <script>
                                const grid = document.currentScript.parentElement;
                                const types = ['bg-primary-container', 'bg-primary-container', 'bg-primary-container', 'bg-primary-container', 'bg-primary-container', 'bg-surface-container-highest', 'bg-surface-container-highest'];
                                for(let i=0; i < 22; i++) {
                                    types.forEach((t, idx) => {
                                        const cell = document.createElement('div');
                                        cell.className = `w-4 h-4 rounded-sm ${t}`;
                                        // Randomize a few absents and lates for realism
                                        if(Math.random() > 0.95 && idx < 5) cell.className = `w-4 h-4 rounded-sm bg-error-container`;
                                        if(Math.random() > 0.97 && idx < 5) cell.className = `w-4 h-4 rounded-sm bg-amber-200`;
                                        grid.appendChild(cell);
                                    });
                                }
                            </script> */}
                    </div>
                  </div>
                </div>
                <div className="bg-card p-8 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)]">
                  <h3 className="text-xl font-bold mb-6">Recent Records</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 px-4 text-[11px] font-black uppercase tracking-widest text-on-surface-variant">
                      <div className="col-span-3">Date</div>
                      <div className="col-span-2">Day</div>
                      <div className="col-span-3">Status</div>
                      <div className="col-span-4">Remarks</div>
                    </div>
                    <div className="grid grid-cols-12 items-center px-4 py-5 bg-secondary rounded-sm border-l-4 border-primary shadow-sm">
                      <div className="col-span-3 font-bold">Feb 14, 2024</div>
                      <div className="col-span-2 text-on-surface-variant font-medium">
                        Wednesday
                      </div>
                      <div className="col-span-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full tracking-wider">
                          Present
                        </span>
                      </div>
                      <div className="col-span-4 text-sm text-on-surface-variant">
                        —
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center px-4 py-5 bg-secondary rounded-sm border-l-4 border-amber-400 shadow-sm">
                      <div className="col-span-3 font-bold">Feb 13, 2024</div>
                      <div className="col-span-2 text-on-surface-variant font-medium">
                        Tuesday
                      </div>
                      <div className="col-span-3">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase rounded-full tracking-wider">
                          Late
                        </span>
                      </div>
                      <div className="col-span-4 text-sm text-on-surface-variant italic">
                        Public transport delay
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center px-4 py-5 bg-secondary rounded-sm border-l-4 border-error shadow-sm">
                      <div className="col-span-3 font-bold">Feb 09, 2024</div>
                      <div className="col-span-2 text-on-surface-variant font-medium">
                        Friday
                      </div>
                      <div className="col-span-3">
                        <span className="px-3 py-1 bg-error/10 text-error text-[10px] font-black uppercase rounded-full tracking-wider">
                          Absent
                        </span>
                      </div>
                      <div className="col-span-4 text-sm text-on-surface-variant italic">
                        Medical: Flu
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center px-4 py-5 bg-secondary rounded-sm border-l-4 border-primary shadow-sm">
                      <div className="col-span-3 font-bold">Feb 08, 2024</div>
                      <div className="col-span-2 text-on-surface-variant font-medium">
                        Thursday
                      </div>
                      <div className="col-span-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full tracking-wider">
                          Present
                        </span>
                      </div>
                      <div className="col-span-4 text-sm text-on-surface-variant">
                        —
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-4 text-sm font-bold text-primary bg-secondary hover:bg-secondary/80 rounded-xl transition-colors">
                    View Full History (Archive)
                  </button>
                </div>
              </section>
              <section className="space-y-6">
                <div className="bg-secondary p-8 rounded-lg border border-outline-variant/10 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                      <Lightbulb className="material-symbols-outlined text-primary">
                        insights
                      </Lightbulb>
                    </div>
                    <h4 className="text-lg font-bold mb-2">
                      Punctuality Insight
                    </h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Elena's attendance is{" "}
                      <span className="text-primary font-bold">Excellent</span>.
                      She is in the top 5% of her class for consistency.
                    </p>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)]">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant mb-4">
                    Upcoming Schedule
                  </h4>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-secondary rounded-sm">
                      <span className="text-[10px] font-black text-on-surface-variant leading-none">
                        FEB
                      </span>
                      <span className="text-xl font-black">22</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">Staff Training Day</p>
                      <p className="text-xs text-on-surface-variant">
                        School closed for students
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary-container p-6 rounded-lg flex flex-col items-center text-center gap-4">
                  <img
                    alt="Student Report Illustration"
                    className="w-32 h-32 object-cover rounded-2xl mix-blend-multiply opacity-50"
                    data-alt="minimalist aesthetic photo of a stack of papers and a fountain pen on a clean wooden desk with soft natural sunlight"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu0oqCMDZ8i90UKnOthtszFMLi7QqB9STyDetZxDSoGXYME8BbV2uCt8EWKWXkQeAmPsTomuyCnYJsQoKA1ii6lJcCQ1AlT4-bUFOPfXG7FgeiHCZjE9z1JxpcCijcHbt8oL2PxDjGIseEPZ6duJXGZomsgVU1NOQOJqBEua6DcLcvbIlNIAAQOARS2q-RaKcbtqZtGZ_U9W4X5jMz9OgcupJ6KZTtjIbNW_r2VcNcv_JKe9fHW5xOLW_qvdkS7hWEIQY_pcbPyT5o"
                  />
                  <div>
                    <h4 className="font-bold text-on-primary-container">
                      Need a formal report?
                    </h4>
                    <p className="text-xs text-on-primary-container/70 mt-1">
                      Generate a signed PDF for visa or administrative purposes.
                    </p>
                  </div>
                  <button className="w-full py-3 bg-primary text-on-primary font-bold rounded-sm text-sm shadow-lg shadow-primary/20">
                    Download Report
                  </button>
                </div>
              </section>
            </div>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default ParentAttendance;

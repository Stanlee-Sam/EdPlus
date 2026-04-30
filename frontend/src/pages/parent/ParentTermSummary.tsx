import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { ArrowUp, Download, GraduationCap, Languages, Microscope, Quote, Share, Sigma } from "lucide-react";
import { useState } from "react";
const ParentTermSummary = () => {
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
          <div className="pb-12 max-w-7xl mx-auto space-y-12">
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">
                  Term 1, 2024 Summary
                </h2>
                <p className="text-on-surface-variant mt-2 text-lg">
                  Detailed academic overview and performance insights.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-secondary p-2 rounded-lg">
                <img
                  className="w-12 h-12 rounded-lg object-cover"
                  data-alt="portrait of a young female student with glasses smiling warmly against a soft library background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNOHvEGftbvflx0m9srMbOFpciaweXA9GLpyWueut-1kN1VLgecsItuXShFqpZA0CzAP_utaRRYbLcE6QRA-nAk7BdPf1-ZjS-ERL--NV6LK_Zln7GkvlBrq8Sxim1oW6cL9rw2w-IzQmNC20szdrux_k28KaI90ARXmZKdwqAIyLh9ffKLq35vN7v3VAEXG8QR4v80JwsCFdGsJUBCSFAHO0ZDmrx0HClvDYXR5xdxdFIUps8YT4PBaEFfbS0eTFlsR-_FKtTHS3I"
                />
                <div className="pr-6">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block">
                    Viewing Student
                  </label>
                  <select className="bg-transparent border-none p-0 text-sm font-bold text-on-surface focus:ring-0 cursor-pointer">
                    <option>Elena Rodriguez</option>
                    <option>Mateo Rodriguez</option>
                  </select>
                </div>
              </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card premium-shadow rounded-xl p-8 relative overflow-hidden group hover:bg-card/40 transition-all">
                <p className="text-[11px] uppercase tracking-widest font-bold text-on-surface-variant mb-4">
                  Mean Grade
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-extrabold text-primary">
                    A-
                  </span>
                  <span className="text-primary text-sm font-bold flex items-center">
                    <ArrowUp className="material-symbols-outlined text-[9px]">
                      arrow_upward
                    </ArrowUp>{" "}
                    4%
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-4">
                  Top 15% of the 2024 Cohort
                </p>
              </div>
              <div className="bg-card premium-shadow rounded-xl p-8 relative overflow-hidden group hover:bg-card/40 transition-all">
                <p className="text-[11px] uppercase tracking-widest font-bold text-on-surface-variant mb-4">
                  ClassName Rank
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-extrabold text-on-surface">
                    4
                  </span>
                  <span className="text-2xl font-bold text-on-surface-variant">
                    / 32
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-4">
                  Maintaining steady upward trajectory
                </p>
              </div>
              <div className="bg-card premium-shadow rounded-xl p-8 relative overflow-hidden group hover:bg-card/40 transition-all">
                <p className="text-[11px] uppercase tracking-widest font-bold text-on-surface-variant mb-4">
                  GPA
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-extrabold text-on-surface">
                    3.82
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-4">
                  Target: 4.00 (Honor Roll)
                </p>
              </div>
            </section>
            <section className="bg-secondary rounded-lg p-10">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h3 className="text-2xl font-bold">Grade Trend</h3>
                  <p className="text-on-surface-variant text-sm">
                    Performance tracking across 12-week term
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-full text-xs font-bold bg-white text-primary">
                    Weekly
                  </button>
                  <button className="px-4 py-2 rounded-full text-xs font-bold text-on-surface-variant hover:bg-white/50 transition-colors">
                    Cumulative
                  </button>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-outline-variant/20">
                <div className="w-full bg-primary-container/40 rounded-t-xl hover:bg-primary-container transition-all"></div>
                <div className="w-full bg-primary-container/40 rounded-t-xl hover:bg-primary-container transition-all"></div>
                <div className="w-full bg-primary-container/40 rounded-t-xl hover:bg-primary-container transition-all"></div>
                <div className="w-full bg-primary-container/40 rounded-t-xl hover:bg-primary-container transition-all"></div>
                <div className="w-full bg-primary-container/40 rounded-t-xl hover:bg-primary-container transition-all"></div>
                <div className="w-full bg-primary-container/40 rounded-t-xl hover:bg-primary-container transition-all"></div>
                <div className="w-full bg-primary-container/40 rounded-t-xl hover:bg-primary-container transition-all"></div>
                <div className="w-full bg-primary-container/40 rounded-t-xl hover:bg-primary-container transition-all"></div>
                <div className="w-full bg-primary-container/40 rounded-t-xl hover:bg-primary-container transition-all"></div>
                <div className="w-full bg-primary-container/40 rounded-t-xl hover:bg-primary-container transition-all"></div>
                <div className="w-full bg-primary-container/40 rounded-t-xl hover:bg-primary-container transition-all"></div>
                <div className="w-full bg-primary rounded-t-xl shadow-lg shadow-primary/20"></div>
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-4">
                <span>Week 1</span>
                <span>Week 6</span>
                <span>Week 12</span>
              </div>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-bold px-2">Subject Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-6 bg-card rounded-lg premium-shadow border border-white/50 group hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-primary p-2">
                        <Sigma className="material-symbols-outlined">
                          calculate
                        </Sigma>
                      </div>
                      <div>
                        <p className="font-bold text-[10px] md:text-lg">
                          Mathematics</p>
                        <p className="text-[8px] md:text-xs text-on-surface-variant">
                          Advanced Calculus &amp; Geometry
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12">
                      <div className="text-right">
                        <p className="text-[8px] md:text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Term Avg
                        </p>
                        <p className="font-bold text-[10px]">
                          92%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] md:text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Grade
                        </p>
                        <p className="font-bold text-primary text-[10px]">
                          A</p>
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-secondary text-[8px] md:text-[10px] font-bold uppercase tracking-tighter">
                        Excellent
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-card rounded-lg premium-shadow border border-white/50 group hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-primary p-2">
                        <Languages className="material-symbols-outlined">
                          menu_book
                        </Languages>
                      </div>
                      <div>
                        <p className="font-bold text-[10px] md:text-lg">
                          English Lit.</p>
                        <p className="text-[8px] md:text-xs text-on-surface-variant">
                          Modernist Poetry &amp; Prose
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12">
                      <div className="text-right">
                        <p className="text-[8px] md:text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Term Avg
                        </p>
                        <p className="font-bold text-[10px]">88%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] md:text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Grade
                        </p>
                        <p className="font-bold text-primary text-[10px]">
                          B+</p>
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-secondary text-[8px] md:text-[10px] font-bold uppercase tracking-tighter">
                        Very Good
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-card rounded-lg premium-shadow border border-white/50 group hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-primary p-2">
                        <Microscope className="material-symbols-outlined">
                          biotech
                        </Microscope>
                      </div>
                      <div>
                        <p className="font-bold text-[10px] md:text-lg">
                          Biology</p>
                        <p className="text-[8px] md:text-xs text-on-surface-variant">
                          Molecular Genetics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12">
                      <div className="text-right">
                        <p className="text-[8px] md:text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Term Avg
                        </p>
                        <p className="font-bold text-[10px]">
                          95%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] md:text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Grade
                        </p>
                        <p className="font-bold text-primary text-[10px]">
                          A+</p>
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-secondary text-[8px] md:text-[10px] font-bold uppercase tracking-tighter">
                        Excellent
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold px-2">Advisor Remark</h3>
                <div className="bg-primary text-white rounded-xl p-8 relative overflow-hidden h-full flex flex-col justify-between">
                  <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <Quote className="material-symbols-outlined text-4xl mb-6">
                      format_quote
                    </Quote>
                    <p className="text-lg leading-relaxed font-medium italic opacity-95">
                      Elena has shown exceptional growth in her analytical
                      reasoning this term. Her contribution to className
                      discussions in English Literature is particularly
                      noteworthy. We recommend focusing on the upcoming Physics
                      project to maintain her high GPA standing.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-8 mt-8 border-t border-white/10 relative">
                    <img
                      className="w-12 h-12 rounded-full border-2 border-primary-container object-cover"
                      data-alt="portrait of an elegant professional academic woman with a kind smile wearing a blazer"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDieWaaNTH-IvZZF4zOP_9yvL2y8RktKi47A567Ycqjp88IWduWhvQ6qjo29_FPB3q0akxRM5FSuxpWC_gdIjvo_VMYR4VYGVjoBdEndZxt6R8WXU_MJM4hI3H5_BI0XJOaZZT0XsQnXu6tvqfNfaVI9eedQZLmvNyAdYEjgxDqzURyRSp8gW0Pk0Pknnlz6RjVqSfmTD1Ztt7he7dWzISl_ACBLCpziWCFfjju2GRoeoi6myH96WufvR5LkGxIJEsYT1vj9ZFQPYb9"
                    />
                    <div>
                      <p className="text-sm font-bold">Dr. Sarah Jenkins</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-70">
                        Academic Advisor
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="flex justify-between items-center py-12 border-t border-surface-container-high">
              <p className="text-sm text-on-surface-variant">
                Report generated on April 12, 2024
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 rounded-xl bg-secondary text-on-surface font-bold text-sm hover:bg-surface-container-highest transition-all flex items-center gap-2">
                  <Share className="material-symbols-outlined text-lg">
                    share
                  </Share>
                  Share Report
                </button>
                <button className="px-8 py-3 rounded-xl primary-gradient text-on-primary font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2">
                  <Download className="material-symbols-outlined text-lg">
                    download
                  </Download>
                  Download PDF
                </button>
              </div>
            </section>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default ParentTermSummary;

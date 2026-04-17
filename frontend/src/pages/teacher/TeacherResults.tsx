import { useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { Save, SendHorizontal, Sparkle } from "lucide-react";
const TeacherResults = () => {
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
        <Sidebar role="teacher" />
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6 ">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-3 md:flex-row justify-between md:items-end mb-12">
              <div>
                <div className="flex items-center gap-2 text-primary font-bold mb-2">
                  <Sparkle className="material-symbols-outlined text-sm" />

                  <span className="text-xs uppercase tracking-widest">
                    Assessment Period: Spring 2024
                  </span>
                </div>
                <h2 className="text-4xl font-extrabold text-on-surface leading-tight tracking-tight">
                  Grade 10-A Modern History
                </h2>
                <p className="text-on-surface-variant mt-2 text-lg">
                  Final Term Examination Results Entry
                </p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-secondary text-on-surface font-bold rounded-xl hover:bg-secondary/80 transition-all flex items-center gap-2">
                  <Save className="material-symbols-outlined"/>
                  Save Draft
                </button>
                <button className="px-8 py-3 primary-gradient from-primary to-primary-dim text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                  <SendHorizontal className="material-symbols-outlined"/>
                  Submit Results
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-outline-variant/10">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-4">
                  Total Students
                </p>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-black text-on-surface">
                    24
                  </span>
                  <span className="text-primary bg-primary-container/20 px-3 py-1 rounded-full text-xs font-bold">
                    100% Enrollment
                  </span>
                </div>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-outline-variant/10">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-4">
                  Entries Completed
                </p>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-black text-on-surface">
                    18
                    <span className="text-xl text-on-surface-variant/40 font-medium">
                      /24
                    </span>
                  </span>
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[75%]"></div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-outline-variant/10">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-4">
                  ClassName Average (Projected)
                </p>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-black text-on-surface">
                    B+
                  </span>
                  <span className="text-muted-foreground text-sm font-medium">
                    ↑ 4% vs Midterm
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="px-8 grid grid-cols-12 gap-4 text-[10px] uppercase tracking-widest text-on-surface-variant font-black">
                <div className="col-span-4">Student Identity</div>
                <div className="col-span-2">Student ID</div>
                <div className="col-span-2">Score (100)</div>
                <div className="col-span-1">Grade</div>
                <div className="col-span-3">Feedback / Comments</div>
              </div>
              <div className="space-y-3">
                <div className="group bg-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex grid grid-cols-12 items-center gap-4 border border-outline-variant/5">
                  <div className="col-span-4 flex items-center gap-4">
                    <img
                      alt="Student"
                      className="w-10 h-10 rounded-full bg-surface-container-high"
                      data-alt="portrait of a teenage boy with glasses in a school uniform, neutral background, soft lighting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2JVmHEM8sC5SyoHiR_ljFTP24OPprx04aj8zb6AyeCu813TRqzH6SIE_3hFDqDXqgGa20tFzI1Q71zv-8VDdrXp2hpU0gX8gO4rZPQz-tG3JpBmx75YhKRiP48laHkJXX8iAEaHhtApn2niHfPd_rahnHPpoQXSfMBAJj4XRA2JS55FIK5Lld71Cg7HAoc9h1yzJS0iOwbDxAGND3ioJ460TJn9wjyZs1-Q1UZcPAGMxcgzqyPZo3l9TKjuKbawc7UoQhRnLM97M8"
                    />
                    <div>
                      <p className=" text-[12px] md:text-sm font-bold text-on-surface">
                        Aiden Montgomery
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Class Rank: 4th
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <code className="bg-secondary text-xs px-2 py-1 rounded-lg text-on-surface-variant">
                      EDU-2024-041
                    </code>
                  </div>
                  <div className="col-span-2">
                    <input
                      className="w-17 md:w-24 bg-secondary border-none rounded-xl py-2 px-4 text-center font-bold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                      type="number"
                      value="88"
                    />
                  </div>
                  <div className="col-span-1">
                    <select className="bg-secondary border-none rounded-xl py-2 px-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 appearance-none">
                      <option>A+</option>
                      <option>A</option>
                      <option>B+</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input
                      className="w-full bg-secondary border-none rounded-xl py-2 px-4 text-xs italic focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                      placeholder="Add private feedback..."
                      type="text"
                      value="Excellent grasp of Cold War era nuances."
                    />
                  </div>
                </div>
                <div className="group bg-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex grid grid-cols-12 items-center gap-4 border border-outline-variant/5">
                  <div className="col-span-4 flex items-center gap-4">
                    <img
                      alt="Student"
                      className="w-10 h-10 rounded-full bg-surface-container-high"
                      data-alt="portrait of a teenage girl with curly hair and a creative style, bright and airy school setting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBANv8297w-z_J3WuOMcuOPfNaCz-h0rVA2_P-aXvjJpQYHL8l_TMIVfB_hArpx93WjUS7QI1QntXAkyAQY9oqVvIVjZa8FTnjnskxKaWZDWaYNG35SOgsOJxLC6BG1N251oYyLp4CC0WorGap8uj1oS2IZBXb89tTiUifYHZ3ooMgxmkS4T_z8hCoN2Euay72dGuHmjKBSdaRQqMVK56bYlGb7exeWrmg-M2rVTTMrp_yuRFJxhHM3FuKmQyjPZoupZurKLqofbrFQ"
                    />
                    <div>
                      <p className="font-bold text-on-surface">
                        Beatrix Willoughby
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Class Rank: 12th
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <code className="bg-surface-container text-xs px-2 py-1 rounded-lg text-on-surface-variant">
                      EDU-2024-012
                    </code>
                  </div>
                  <div className="col-span-2">
                    <input
                      className="w-24 bg-surface-container-high border-none rounded-xl py-2 px-4 text-center font-bold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                      type="number"
                      value="74"
                    />
                  </div>
                  <div className="col-span-1">
                    <select className="bg-surface-container-high border-none rounded-xl py-2 px-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 appearance-none">
                      <option>A+</option>
                      <option>A</option>
                      <option>B+</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input
                      className="w-full bg-surface-container-low border-none rounded-xl py-2 px-4 text-xs italic focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                      placeholder="Add private feedback..."
                      type="text"
                      value="Solid essay, but needs more primary sources."
                    />
                  </div>
                </div>
                <div className="group bg-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex grid grid-cols-12 items-center gap-4 border border-outline-variant/5">
                  <div className="col-span-4 flex items-center gap-4">
                    <img
                      alt="Student"
                      className="w-10 h-10 rounded-full bg-surface-container-high"
                      data-alt="portrait of a diverse teenage student looking thoughtful, soft bokeh library background"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDquXD00uJr6KwcGfwcB7RdPZvnA9hnrYrB9VaxZo9xCeKtUP8WsbHWsatxCor9IMYFkLAlPgJl7oTak5Cbu2M5_6vo-RfxQeYKiOxHmgNGsUhmarf_jql4GyMt9FNEMpiDjuOUIqLrfT08NvDuN4J0bnIn_UM8GkJqExqnThdueR9jmlZCJJcb16S0YHpvHKTqPK8jpEQngWCaED55y6v05m0iv36VB3dEayiPlp0ljpo8chHeVDHOhYj3pWm2SstoBqunTeNP0dIN"
                    />
                    <div>
                      <p className="font-bold text-on-surface">Cyrus Dhillon</p>
                      <p className="text-xs text-on-surface-variant">
                        Class Rank: Pending
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <code className="bg-surface-container text-xs px-2 py-1 rounded-lg text-on-surface-variant">
                      EDU-2024-088
                    </code>
                  </div>
                  <div className="col-span-2">
                    <input
                      className="w-24 bg-primary/5 border border-primary/20 rounded-xl py-2 px-4 text-center font-bold focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all"
                      placeholder="--"
                      type="number"
                    />
                  </div>
                  <div className="col-span-1">
                    <select className="bg-surface-container-high border-none rounded-xl py-2 px-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 appearance-none">
                      <option>--</option>
                      <option>A+</option>
                      <option>A</option>
                      <option>B+</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input
                      className="w-full bg-surface-container-low border-none rounded-xl py-2 px-4 text-xs italic focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                      placeholder="Add private feedback..."
                      type="text"
                    />
                  </div>
                </div>
                <div className="group bg-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex grid grid-cols-12 items-center gap-4 border border-outline-variant/5">
                  <div className="col-span-4 flex items-center gap-4">
                    <img
                      alt="Student"
                      className="w-10 h-10 rounded-full bg-surface-container-high"
                      data-alt="close-up of a smiling student in a bright classNameroom, shallow depth of field, warm light"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcBl2Kej3w3HyKI0otgSh6Lh8x_O4iNAc5Brmsq7jCgguUfwik_6Ac7T6tkPlAGVfJwdkA1yeyzqVUuBjQj7VD80T3-bUtGUhmrhQ_txJD7I6byCYfZOFW3tMCrk2BFr7V27iNvspm_u5r4Aak8_I-b466V2A7t9o24FIJkcZEgueXArdP5ZSg2INdoE1OS1oimO_yHVY1bnOj0U3s77H9JfjWu4oSVyCbboROzZbN5FDvQ4YBF02AYId_OXl8vmaJlvd1k4lNADY5"
                    />
                    <div>
                      <p className="font-bold text-on-surface">Elena Kovic</p>
                      <p className="text-xs text-on-surface-variant">
                        Class Rank: 1st
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <code className="bg-surface-container text-xs px-2 py-1 rounded-lg text-on-surface-variant">
                      EDU-2024-002
                    </code>
                  </div>
                  <div className="col-span-2">
                    <input
                      className="w-24 bg-surface-container-high border-none rounded-xl py-2 px-4 text-center font-bold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                      type="number"
                      value="97"
                    />
                  </div>
                  <div className="col-span-1">
                    <select className="bg-surface-container-high border-none rounded-xl py-2 px-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 appearance-none">
                      <option>A+</option>
                      <option>A</option>
                      <option>B+</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input
                      className="w-full bg-surface-container-low border-none rounded-xl py-2 px-4 text-xs italic focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                      placeholder="Add private feedback..."
                      type="text"
                      value="Exceptional analysis of the industrial revolution."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 flex items-center justify-between bg-secondary/50 backdrop-blur-md p-6 rounded-lg border border-card shadow-xl shadow-on-surface/5">
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary flex items-center justify-center text-[10px] font-bold">
                    6
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-surface bg-secondary flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                    ?
                  </div>
                </div>
                <p className="text-sm font-medium text-on-surface-variant">
                  6 students awaiting results entry
                </p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-2 rounded-xl text-on-surface font-bold text-sm bg-secondary hover:bg-secondary/80 transition-colors">
                  Clear All Fields
                </button>
                <button className="px-10 py-3 primary-gradient from-primary to-primary-dim text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
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

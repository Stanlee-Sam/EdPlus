import { useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { Book, BookOpen, ChevronRight, CircleStar, Ellipsis, Sigma } from "lucide-react";

const ParentDashboard = () => {
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
          <div className="max-w-[1600px]">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-sm font-bold text-primary uppercase tracking-[0.2em]">
                  Academic Overview
                </span>
                <h2 className="text-5xl font-extrabold text-on-surface tracking-tight mt-2">
                  Good morning, Sarah.
                </h2>
                <p className="text-on-surface-variant mt-2 text-lg">
                  Here is what's happening with your children today.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="col-span-8 flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-card rounded-lg p-8 shadow-[0_20px_40px_rgba(42,53,50,0.06)] group hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 blur-sm"></div>
                          <img
                            alt="Elena Avatar"
                            className="relative w-16 h-16 rounded-full object-cover border-4 border-white shadow-sm"
                            data-alt="young girl with braided hair smiling in a classNameroom setting, soft bokeh background of books and school supplies"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARixPwajU0YE1ytv78voxOCnTEFL4I1hnkw57fmBNXn1Ny8ETiNKc1jYlY4vejBsufCuxOOd2lGvNSGipPRlzXpzcif06fZ94XIdPTUbZugROgy3NtOUahLlGQUuBub4TDMVyZxsb3aDA1of2wdOe64LfM13taNJcmBtgoow50b07w1F50BTIMUwQ9Jsyb1Sdw4HVz7_27MRTactvaDXZsX2eEIOxspXDXR6p4nOBtKrQXCZYB8944uslC9WA1c8x7MTsLHeL9Ps8w"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-extrabold text-on-surface">
                            Elena
                          </h3>
                          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                            Grade 8 • Honors
                          </span>
                        </div>
                      </div>
                      <div className="bg-primary-container/30 text-on-primary-container px-3 py-1 rounded-full text-sm font-bold">
                        B+
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-secondary rounded-lg p-4">
                        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-tighter">
                          Overall Grade
                        </span>
                        <div className="text-3xl font-black text-on-surface mt-1">
                          88<span className="text-lg opacity-50">%</span>
                        </div>
                      </div>
                      <div className="bg-secondary rounded-lg p-4">
                        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-tighter">
                          Attendance
                        </span>
                        <div className="text-3xl font-black text-primary mt-1">
                          96<span className="text-lg opacity-50">%</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-on-surface">
                          Next Homework
                        </span>
                        <span className="text-[10px] font-black bg-error/10 text-error px-2 py-0.5 rounded-full uppercase tracking-tighter">
                          Due Tomorrow
                        </span>
                      </div>
                      <div className="bg-muted p-4 rounded-lg flex items-center gap-4 border-l-4 border-primary">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Sigma className="material-symbols-outlined" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-on-surface">
                            Advanced Algebra Quiz Prep
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            Mathematics • Unit 4
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-8 shadow-[0_20px_40px_rgba(42,53,50,0.06)] group hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-tertiary/20 rounded-full scale-110 blur-sm"></div>
                          <img
                            alt="Marcus Avatar"
                            className="relative w-16 h-16 rounded-full object-cover border-4 border-white shadow-sm"
                            data-alt="happy young boy wearing a school uniform polo, bright natural light in an outdoor school courtyard"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYqTSxaF9COrS4fosFe6ebb1WQhQbwfly7jKvRAH0EAo9Fm3uot2iu8B5XU_2ziJ9JygJrxyCkfQrXZmtyRWGzdSt-y_J9mZb0bJZel8uWf_JNY3TAb63_Z9jHYHHiCQvZDbdxSIkoamqtJn7HoIYbxzHmCX7ZEn2uTSuy8yTS_AQG3UHNcJktoCz70fjdCaSdukdQ3mC8qZO8-k6v8yHjFgMK5HQid4sk4as9cVNZeLWgNfaz7dC-VqEdyMB-VjcKi1fh5912ib0-"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-extrabold text-on-surface">
                            Marcus
                          </h3>
                          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                            Grade 5 • Varsity
                          </span>
                        </div>
                      </div>
                      <div className="bg-tertiary-container/30 text-on-tertiary-container px-3 py-1 rounded-full text-sm font-bold">
                        A-
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-secondary rounded-lg p-4">
                        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-tighter">
                          Overall Grade
                        </span>
                        <div className="text-3xl font-black text-on-surface mt-1">
                          92<span className="text-lg opacity-50">%</span>
                        </div>
                      </div>
                      <div className="bg-secondary rounded-lg p-4">
                        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-tighter">
                          Attendance
                        </span>
                        <div className="text-3xl font-black text-primary mt-1">
                          98<span className="text-lg opacity-50">%</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-on-surface">
                          Next Homework
                        </span>
                        <span className="text-[10px] font-black bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded-full uppercase tracking-tighter">
                          In 3 Days
                        </span>
                      </div>
                      <div className="bg-muted p-4 rounded-lg flex items-center gap-4 border-l-4 border-tertiary">
                        <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                          <BookOpen className="material-symbols-outlined" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-on-surface">
                            The Great Gatsby Analysis
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            English Literature • Chapter 3
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary p-8 rounded-lg flex items-center gap-12">
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-on-surface mb-2">
                      Upcoming Tuition Payment
                    </h4>
                    <p className="text-on-surface-variant leading-relaxed">
                      The term 2 payment for Marcus Jenkins is due by Friday,
                      November 24th. Early payment discounts apply.
                    </p>
                    <div className="flex gap-4 mt-6">
                      <button className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-bold text-sm shadow-md active:scale-95 transition-transform">
                        Pay Balance
                      </button>
                      <button className="px-6 py-2.5 bg-card text-on-surface rounded-full font-bold text-sm shadow-sm active:scale-95 transition-transform">
                        View Invoice
                      </button>
                    </div>
                  </div>
                  <div className="w-48 h-32 rounded-xl overflow-hidden shadow-inner rotate-3">
                    <img
                      alt="Payment Illustration"
                      className="w-full h-full object-cover"
                      data-alt="abstract architectural close-up of clean lines and soft shadows, modern minimalist aesthetic with teal tones"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO-ci4v-JnDxhTFBzAIpjhB4osi69yGRiIbULdYnHVdZQbvGTjiLZ2cnSb5ruThBoxRsUZv0aTCYK3TFy0Mig6oS3XloDNBsDYgQyr4VJdXKryioiKubHzCXoLlCBfgB81S9SXTwTcrohOOamWxtqYGXDmpMIu_OjVhQKlcy5pXgxq3U_85XV1zgT0DQhNaqV4PtTBAGMjE65HwqDq5m6QrlrIfgQzImij1PIGryWOtDj34aGS9YwYHf57ebXYG3yC84Pt4EO1qCte"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-4 flex flex-col gap-8">
                <section className="bg-secondary rounded-lg p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-extrabold text-on-surface">
                      Announcements
                    </h3>
                    <Ellipsis className="material-symbols-outlined text-on-surface-variant" />
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4 group">
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                      <div>
                        <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                          Annual Winter Gala Volunteers
                        </h4>
                        <p className="text-xs text-on-surface-variant mt-1">
                          2 hours ago • School Office
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 group">
                      <div className="mt-1 w-2 h-2 rounded-full bg-outline-variant shrink-0"></div>
                      <div>
                        <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                          Science Fair Project Guidelines
                        </h4>
                        <p className="text-xs text-on-surface-variant mt-1">
                          Yesterday • Science Dept.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 group">
                      <div className="mt-1 w-2 h-2 rounded-full bg-outline-variant shrink-0"></div>
                      <div>
                        <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                          Early Dismissal: Faculty Meeting
                        </h4>
                        <p className="text-xs text-on-surface-variant mt-1">
                          2 days ago • Admin
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-8 py-3 rounded-xl border border-outline-variant/30 text-sm font-bold text-on-surface-variant bg-card hover:bg-card/80 hover:text-primary transition-all">
                    View All Announcements
                  </button>
                </section>
                <section className="bg-secondary rounded-lg p-8 backdrop-blur-md">
                  <h3 className="text-xl font-extrabold text-on-surface mb-8">
                    Upcoming Events
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-card p-4 rounded-lg flex items-center gap-4">
                      <div className="bg-primary/10 w-12 h-14 rounded-sm flex flex-col items-center justify-center text-primary leading-tight">
                        <span className="text-xs font-black">NOV</span>
                        <span className="text-lg font-black">18</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-on-surface text-sm">
                          Parent-Teacher Conf
                        </h5>
                        <p className="text-xs text-on-surface-variant">
                          04:00 PM • Room 204
                        </p>
                      </div>
                      <ChevronRight className="material-symbols-outlined text-outline-variant text-sm" />
                    </div>
                    <div className="bg-card p-4 rounded-lg flex items-center gap-4">
                      <div className="bg-tertiary/10 w-12 h-14 rounded-sm flex flex-col items-center justify-center text-tertiary leading-tight">
                        <span className="text-xs font-black">NOV</span>
                        <span className="text-lg font-black">22</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-on-surface text-sm">
                          Music Festival Rehearsal
                        </h5>
                        <p className="text-xs text-on-surface-variant">
                          03:30 PM • Main Hall
                        </p>
                      </div>
                      <ChevronRight className="material-symbols-outlined text-outline-variant text-sm" />
                    </div>
                    <div className="bg-card p-4 rounded-lg flex items-center gap-4">
                      <div className="bg-foreground/10 w-12 h-14 rounded-sm flex flex-col items-center justify-center text-on-surface-variant leading-tight">
                        <span className="text-xs font-black">DEC</span>
                        <span className="text-lg font-black">01</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-on-surface text-sm">
                          Winter Term Break
                        </h5>
                        <p className="text-xs text-on-surface-variant">
                          All Day • School Wide
                        </p>
                      </div>
                      <ChevronRight className="material-symbols-outlined text-outline-variant text-sm" />
                    </div>
                  </div>
                </section>
                <div className="bg-primary from-primary to-primary-dim rounded-lg p-8 text-on-primary shadow-lg shadow-primary/20">
                  <CircleStar className="material-symbols-outlined mb-4"/>
                  <h4 className="text-xl font-bold leading-tight mb-2">
                    New: Academic Tutoring Now Available
                  </h4>
                  <p className="text-sm opacity-90 mb-6 leading-relaxed">
                    EdPlus Premium parents now get 20% off all specialized
                    weekend workshops.
                  </p>
                  <a
                    className="inline-block text-xs font-black uppercase tracking-widest border-b-2 border-foreground pb-1"
                    href="#"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default ParentDashboard;

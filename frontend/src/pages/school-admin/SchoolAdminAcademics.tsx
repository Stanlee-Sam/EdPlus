import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import {
  BookOpen,
  Calendar,
  DoorOpen,
  Layers,
  MoveRight,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

const SchoolAdminAcademics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const stats = [
    {
      icon: Layers,
      title: "Academic Levels",
      value: 12,
      linkText: "Manage Levels",
    },
    {
      icon: DoorOpen,
      title: "Active Classes",
      value: 48,
      linkText: "View All Classes",
    },
    {
      icon: Users,
      title: "Faculty Members",
      value: 86,
      linkText: "Faculty Directory",
    },
    {
      icon: User,
      title: "Enrolled Students",
      value: 1284,
      linkText: "Student List",
    },
    {
      icon: BookOpen,
      title: "Curriculum Subjects",
      value: 24,
      linkText: "Curriculum Map",
    },
    {
      icon: Calendar,
      title: "Current Progress",
      value: "Term 1 - Week 8",
      linkText: "Term Analytics",
    },
  ];

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
        <Sidebar role="school-admin" />
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <section className="mb-12">
            <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tight mb-2">
              Academics Hub
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
              Welcome to the Clarified Canvas. Manage your institution's core
              academic structure with precise control and editorial clarity.
            </p>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat) => {
              return (
                <div
                  key={stat.title}
                  className="bg-card p-8 rounded-xl shadow-[0_20px_40px_rgba(42,53,50,0.06)] flex flex-col justify-between group hover:translate-y-[-4px] transition-all duration-300"
                >
                  <div>
                    <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center mb-6">
                      <stat.icon className="text-[#2DD4BF] w-8 h-8" />
                    </div>
                    <p className="font-label text-xs uppercase font-bold tracking-widest text-on-surface-variant mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-6xl font-black text-on-surface tracking-tighter">
                      {stat.value}
                    </h3>
                  </div>
                  <a
                    className="mt-8 flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-4 transition-all"
                    href="#"
                  >
                    {stat.linkText}
                    <MoveRight
                      className="material-symbols-outlined text-sm"
                      data-icon="arrow_forward"
                    />
                  </a>
                </div>
              );
            })}
          </div>
          <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface-container-low rounded-xl p-10 flex flex-col justify-center">
              <h4 className="font-headline text-2xl font-bold mb-4">
                Academic Calendar
              </h4>
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                Next major event: Mid-term assessment period starts in 12 days.
                Prepare all faculty grading sheets by Friday.
              </p>
              <div className="flex gap-4">
                <button className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-all">
                  Schedule Event
                </button>
                <button className="bg-sidebar text-on-surface px-6 py-3 rounded-full font-bold text-sm hover:opacity-80 transition-all">
                  View Full Year
                </button>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <img
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                data-alt="Group of diverse students collaborating in a bright, modern school library with clean white furniture and soft teal accents"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwTt_lxKU3-lTdZdZon_IL9eeszRM3Hi72pVbDAszkrpvi5LDnyuoK8F5VFkB9587m4xHlHx7_1iHr9tn_jP8xsO_5A7QNKoljurAvErnCGpBBKJw9Mi_F0AWtM4RRqC-G1KWcnYE5PKR6c6gJrCY-q964P8gC1fTJ_fbMCgyfDd7GM9yiJUxPm5OPyo66C6H44AlBsWNYU4NCcAPy6g5Ft4UtoU_HfW2csj_wFJnhYU_ooF3_b-7dZysB-FhlYKzVvLjEJR8U5pSR"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                  Institution Spotlight
                </span>
              </div>
            </div>
          </section>{" "}
        </section>
      </main>
    </div>
  );
};

export default SchoolAdminAcademics;

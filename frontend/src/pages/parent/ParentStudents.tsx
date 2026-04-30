import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import {
  Calendar,
  Edit,
  Fingerprint,
  FlaskConical,
  History,
  LockOpenIcon,
  Mail,
  Phone,
  Printer,
  Sigma,
  Star,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

const ParentStudents = () => {
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
          <div className="space-y-12 max-w-7xl mx-auto">
            <section className="flex flex-col gap-8">
              <div className="flex flex-col items-center gap-8 w-full">
                <div className="flex flex-col gap-5 md:flex-row md:justify-between items-center w-full">
                  <div>
                    <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
                      My Students
                    </h2>
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
                  </div>
                </div>
              </div>
              <div className = 'flex flex-col gap-8 md:flex-row md:justify-between items-center'>
                <div className="flex flex-row items-center justify-center gap-4 md:gap-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-lg overflow-hidden shadow-xl shadow-primary/10 ring-4 ring-white">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="Close-up portrait of Elena Rodriguez, a bright smiling teenage student with curly hair against a soft teal academic background"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuBjdmXGcGQGGGoMg0gvZYpbtyno_Jpe5OQyBQ2trtS98JdM8utoXzMgO6rWZAXbf9raeB7NkcurTKRvbkC6HU9F_opuTFREwz5AkRk_JZg4YZG_Lnw2Ocz994TnO8GUOQyX9FqMADLHbZgfWEkYXrqu4UreQn4GZ5VgEnvfixBD5bI3GaKVUQdZdX5_F1GDS5TYuDOq8zlcbN_CAwSgBK9akLiYiaNbEhHP3ZxTpS8AslHtoPQETPTO3iuLwJOUFW4tj_HDSxDOlX"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
                    Active
                  </div>
                </div>
                <div>
                  <p className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-1">
                    Student Record
                  </p>
                  <h3 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
                    Elena Rodriguez
                  </h3>
                  <div className="flex items-center gap-4 text-on-surface-variant">
                    <span className="flex items-center gap-1.5 font-medium text-sm">
                      <Fingerprint className="material-symbols-outlined text-sm">
                        fingerprint
                      </Fingerprint>
                      #STU-2024-001
                    </span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="flex items-center gap-1.5 font-medium text-sm">
                      <Star className="material-symbols-outlined text-sm">
                        grade
                      </Star>
                      Grade 11-B
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-evenly items-center gap-3">
                <button className="px-6 py-3 bg-secondary text-on-secondary-container rounded-xl font-bold text-sm hover:bg-surface-container-high transition-all flex items-center gap-2">
                  <Printer className="material-symbols-outlined text-lg">
                    print
                  </Printer>
                  Report Card
                </button>
                <button className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                  <Edit className="material-symbols-outlined text-lg">
                    edit
                  </Edit>
                  Edit Profile
                </button>
              </div>
              </div>
            </section>
            <nav className="flex gap-10 border-b border-outline-variant/10">
              <a
                className="pb-4 text-primary font-bold border-b-2 border-primary relative"
                href="#"
              >
                Profile
                <span className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-primary"></span>
              </a>
              <a
                className="pb-4 text-on-surface-variant font-medium hover:text-on-surface transition-colors"
                href="#"
              >
                Term Summary
              </a>
              <a
                className="pb-4 text-on-surface-variant font-medium hover:text-on-surface transition-colors"
                href="#"
              >
                Results
              </a>
              <a
                className="pb-4 text-on-surface-variant font-medium hover:text-on-surface transition-colors"
                href="#"
              >
                Attendance
              </a>
            </nav>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8 space-y-8">
                <div className="bg-card rounded-lg p-8 shadow-[0_20px_40px_rgba(42,53,50,0.04)]">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-bold text-on-surface flex items-center gap-2">
                      <User className="material-symbols-outlined text-primary">
                        person
                      </User>
                      Personal Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                        Date of Birth
                      </label>
                      <p className="text-on-surface font-semibold">
                        May 14, 2007 (16 years old)
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                        Gender
                      </label>
                      <p className="text-on-surface font-semibold">Female</p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                        Contact Number
                      </label>
                      <p className="text-on-surface font-semibold">
                        +1 (555) 982-3401
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                        Email Address
                      </label>
                      <p className="text-on-surface font-semibold">
                        elena.rod@student.edplus.edu
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                        Residential Address
                      </label>
                      <p className="text-on-surface font-semibold">
                        482 Oakwood Avenue, Apartment 4B, Springfield, IL 62704
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-card rounded-lg p-8 shadow-[0_20px_40px_rgba(42,53,50,0.04)]">
                    <h4 className="text-lg font-bold text-on-surface flex items-center gap-2 mb-6">
                      <Users className="material-symbols-outlined text-primary">
                        family_history
                      </Users>
                      Guardian Details
                    </h4>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <User className="material-symbols-outlined text-on-surface-variant">
                            person_apron
                          </User>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">
                            Maria Rodriguez
                          </p>
                          <p className="text-xs text-on-surface-variant font-medium">
                            Mother • Primary Guardian
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3 pl-14">
                        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                          <Phone className="material-symbols-outlined text-[14px]">
                            call
                          </Phone>
                          +1 (555) 231-4455
                        </div>
                        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                          <Mail className="material-symbols-outlined text-[14px]">
                            mail
                          </Mail>
                          m.rodriguez@email.com
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-8 shadow-[0_20px_40px_rgba(42,53,50,0.04)]">
                    <h4 className="text-lg font-bold text-on-surface flex items-center gap-2 mb-6">
                      <Calendar className="material-symbols-outlined text-primary">
                        assignment_ind
                      </Calendar>
                      Enrollment
                    </h4>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                          Date Joined
                        </label>
                        <p className="text-on-surface font-semibold">
                          August 22, 2021
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                          Current ClassName
                        </label>
                        <p className="text-on-surface font-semibold">
                          11th Grade - Section B (Science)
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                          Roll Number
                        </label>
                        <p className="text-on-surface font-semibold">#24</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 space-y-8">
                <div className="bg-primary text-on-primary rounded-xl p-8 shadow-xl shadow-primary/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                  <h4 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-6">
                    Current Term Summary
                  </h4>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <span className="text-5xl font-black">3.82</span>
                      <p className="text-[10px] font-bold uppercase mt-1 opacity-80">
                        GPA / Average
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold">96%</span>
                      <p className="text-[10px] font-bold uppercase mt-1 opacity-80">
                        Attendance
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span>ClassName Percentile</span>
                      <span>Top 5%</span>
                    </div>
                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                      <div className="bg-white h-full w-[95%]"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-bold text-on-surface uppercase tracking-widest">
                      Latest Results
                    </h4>
                    <LockOpenIcon className="material-symbols-outlined text-on-surface-variant text-lg cursor-pointer">
                      open_in_new
                    </LockOpenIcon>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-tertiary-container">
                          <Sigma className="material-symbols-outlined text-sm">
                            functions
                          </Sigma>
                        </div>
                        <span className="text-xs font-bold text-on-surface">
                          Mathematics
                        </span>
                      </div>
                      <span className="text-xs font-black text-primary">
                        A+
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-secondary-container">
                          <FlaskConical className="material-symbols-outlined text-sm">
                            science
                          </FlaskConical>
                        </div>
                        <span className="text-xs font-bold text-on-surface">
                          Physics
                        </span>
                      </div>
                      <span className="text-xs font-black text-primary">A</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-on-primary-container">
                          <History className="material-symbols-outlined text-sm">
                            history_edu
                          </History>
                        </div>
                        <span className="text-xs font-bold text-on-surface">
                          History
                        </span>
                      </div>
                      <span className="text-xs font-black text-secondary">
                        B+
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-lg p-6 shadow-[0_20px_40px_rgba(42,53,50,0.04)]">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-bold text-on-surface uppercase tracking-widest">
                      Attendance Records
                    </h4>
                    <span className="text-[10px] font-bold text-on-surface-variant bg-secondary px-2 py-1 rounded">
                      Nov 2024
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    <div className="text-[8px] font-bold text-on-surface-variant text-center">
                      M
                    </div>
                    <div className="text-[8px] font-bold text-on-surface-variant text-center">
                      T
                    </div>
                    <div className="text-[8px] font-bold text-on-surface-variant text-center">
                      W
                    </div>
                    <div className="text-[8px] font-bold text-on-surface-variant text-center">
                      T
                    </div>
                    <div className="text-[8px] font-bold text-on-surface-variant text-center">
                      F
                    </div>
                    <div className="text-[8px] font-bold text-on-surface-variant text-center">
                      S
                    </div>
                    <div className="text-[8px] font-bold text-on-surface-variant text-center">
                      S
                    </div>
                    <div className="aspect-square bg-primary/20 rounded-md border-2 border-primary/40"></div>
                    <div className="aspect-square bg-primary/20 rounded-md border-2 border-primary/40"></div>
                    <div className="aspect-square bg-primary/20 rounded-md border-2 border-primary/40"></div>
                    <div className="aspect-square bg-error/10 rounded-md border-2 border-error/20"></div>
                    <div className="aspect-square bg-primary/20 rounded-md border-2 border-primary/40"></div>
                    <div className="aspect-square bg-secondary rounded-md"></div>
                    <div className="aspect-square bg-secondary rounded-md"></div>
                    <div className="aspect-square bg-primary/20 rounded-md border-2 border-primary/40"></div>
                    <div className="aspect-square bg-primary/20 rounded-md border-2 border-primary/40"></div>
                    <div className="aspect-square bg-primary/20 rounded-md border-2 border-primary/40"></div>
                    <div className="aspect-square bg-primary/20 rounded-md border-2 border-primary/40"></div>
                    <div className="aspect-square bg-primary/20 rounded-md border-2 border-primary/40"></div>
                    <div className="aspect-square bg-secondary rounded-md"></div>
                    <div className="aspect-square bg-secondary rounded-md"></div>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Present
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      Absent
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

export default ParentStudents;
